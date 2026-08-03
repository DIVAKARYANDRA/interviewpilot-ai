from sqlalchemy.orm import Session

from app.models.interview_session import InterviewSession

from sqlalchemy.orm import Session

from app.models.interview import Interview

def create_session(db: Session, session: InterviewSession):

    db.add(session)

    db.commit()

    db.refresh(session)

    return session


def get_session(db: Session, session_id: str):

    return db.query(
        InterviewSession
    ).filter(
        InterviewSession.session_id == session_id
    ).first()


def create_interview(
    db: Session,
    interview: Interview
):
    db.add(interview)
    db.commit()
    db.refresh(interview)
    return interview


def get_interview(
    db: Session,
    interview_id: int
):
    return (
        db.query(Interview)
        .filter(Interview.id == interview_id)
        .first()
    )


def update_interview(
    db: Session,
    interview: Interview
):
    db.commit()
    db.refresh(interview)
    return interview