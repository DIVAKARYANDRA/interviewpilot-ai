from sqlalchemy.orm import Session

from app.models.user import User

from app.repositories.user_repository import (
    get_user_by_email,
    create_user,
    get_user_by_id
)

from app.utils.security import (
    hash_password,
)

def update_profile(
    db: Session,
    user_id: int,
    name: str
):

    user = get_user_by_id(
        db,
        user_id
    )


    if not user:
        raise ValueError(
            "User not found"
        )


    user.name = name

    db.commit()

    db.refresh(user)

    return user



def update_password(
    db: Session,
    user_id: int,
    password: str
):

    user = get_user_by_id(
        db,
        user_id
    )


    if not user:
        raise ValueError(
            "User not found"
        )


    user.password = hash_password(
        password
    )

    db.commit()

    return True

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
        # experience=user_data.experience,
        # current_company=user_data.current_company,
        # target_company=user_data.target_company,
        # target_role=user_data.target_role
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

    print("USER FOUND:", user.email)

    print("LOGIN EMAIL:", email)

    print("USER FROM DB:", user)

    print(
        "PASSWORD CHECK:",
        verify_password(
            password,
            user.password
        )
    )

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


def get_current_user_service(
    db: Session,
    user_id:int
):

    user = get_user_by_id(
        db,
        user_id
    )


    if not user:

        raise ValueError(
            "User not found"
        )


    return user