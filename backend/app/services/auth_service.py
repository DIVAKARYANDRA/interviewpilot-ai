from sqlalchemy.orm import Session

from app.models.user import User

from app.repositories.user_repository import (
    get_user_by_email,
    create_user,
)

from app.utils.security import (
    hash_password,
)


def register_user(db: Session, user_data):

    existing_user = get_user_by_email(
        db,
        user_data.email
    )

    if existing_user:
        raise ValueError("Email already registered.")

    user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        experience=user_data.experience,
        current_company=user_data.current_company,
        target_company=user_data.target_company,
        target_role=user_data.target_role
    )

    return create_user(db, user)


from app.utils.security import (
    verify_password,
    create_access_token,
)


def login_user(db: Session, email: str, password: str):

    user = get_user_by_email(
        db,
        email
    )

    if not user:
        raise ValueError("Invalid email or password.")

    if not verify_password(
        password,
        user.password
    ):
        raise ValueError("Invalid email or password.")

    token = create_access_token(
        {
            "user_id": user.id,
            "email": user.email
        }
    )

    return token