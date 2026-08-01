from sqlalchemy.orm import Session

from app.models.user import User

from app.utils.security import hash_password


def register_user(db: Session, user_data):

    user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),

        experience=user_data.experience,
        current_company=user_data.current_company,
        target_company=user_data.target_company,
        target_role=user_data.target_role
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user