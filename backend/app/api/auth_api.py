from fastapi import APIRouter
from fastapi import Depends
from app.models.user import User

from sqlalchemy.orm import Session
from app.utils.auth_dependency import get_current_user
from app.services.auth_service import get_current_user_service
from app.database.db import get_db
from app.schemas.user_schema import UserLogin
from app.schemas.user_schema import UserRegister
from fastapi import HTTPException

from app.schemas.profile_schema import (
    UpdateProfileRequest,
    UpdatePasswordRequest
)

from app.services.auth_service import (
    update_profile,
    change_password,
    register_user,
    login_user
)

from app.utils.auth_dependency import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    try:

        created_user = register_user(
            db,
            user
        )

        return {
            "message": "Registration Successful",
            "user_id": created_user.id
        }

    # except ValueError as e:

    #     raise HTTPException(
    #         status_code=400,
    #         detail=str(e)
    #     )
    except Exception as e:

        print("REGISTER ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    try:

        token = login_user(
            db,
            user.email,
            user.password
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except ValueError as e:

        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


# @router.get("/users")
# def get_users(
#     db: Session = Depends(get_db)
# ):

#     users = db.query(User).all()

#     return [

#         {
#             "id": user.id,
#             "name": user.name,
#             "email": user.email,
#         }

#         for user in users

#     ]


@router.get("/me")
def get_me(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    user = get_current_user_service(

        db,

        current_user["user_id"]

    )


    return {

        "id": user.id,

        "name": user.name,

        "email": user.email

    }

@router.put("/profile")
def profile_update(

    request:UpdateProfileRequest,

    db:Session=Depends(get_db),

    current_user=Depends(get_current_user)

):

    user = update_profile(

        db,

        current_user["user_id"],

        request.name

    )


    return {

        "message":"Profile updated",

        "name":user.name

    }


@router.put("/password")
def change_password_api(

    request: UpdatePasswordRequest,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    change_password(

        db,

        current_user["user_id"],

        request.current_password,

        request.new_password

    )


    return {

        "message":"Password updated"

    }