from sqlalchemy.orm import Session

from app.models.interview_history import InterviewHistory


def save_interview(

    db: Session,

    interview: InterviewHistory

):

    db.add(interview)

    db.commit()

    db.refresh(interview)

    return interview



def get_user_interviews(

    db: Session,

    user_id: int

):

    return (

        db.query(

            InterviewHistory

        )

        .filter(

            InterviewHistory.user_id == user_id

        )

        .order_by(

            InterviewHistory.created_at.desc()

        )

        .all()

    )