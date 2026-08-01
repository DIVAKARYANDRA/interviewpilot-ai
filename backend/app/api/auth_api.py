from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.schemas.user_schema import UserRegister

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

    created_user = register_user(db, user)

    return {
        "message": "Registration Successful",
        "user_id": created_user.id
    }