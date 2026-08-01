from sqlalchemy.orm import Session

from app.models.interview_session import InterviewSession


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