from sqlalchemy.orm import Session

from app.models.interview_turn import InterviewTurn


def create_turn(db: Session, turn: InterviewTurn):

    db.add(turn)

    db.commit()

    db.refresh(turn)

    return turn


def get_turns(db: Session, session_id: int):

    return db.query(
        InterviewTurn
    ).filter(
        InterviewTurn.interview_session_id == session_id
    ).all()