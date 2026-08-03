from sqlalchemy.orm import Session

from app.repositories.interview_repository import (
    get_user_interviews
)


def load_history(

    db: Session,

    user_id: int

):

    return get_user_interviews(

        db,

        user_id

    )