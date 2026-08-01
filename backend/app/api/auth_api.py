from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.user_schema import UserLogin
from app.services.auth_service import login_user
from app.schemas.user_schema import UserRegister
from fastapi import HTTPException
from app.services.auth_service import register_user

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

    except ValueError as e:

        raise HTTPException(
            status_code=400,
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