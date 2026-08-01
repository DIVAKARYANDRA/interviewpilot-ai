from sqlalchemy.orm import Session

from app.models.answer import Answer


def save_answer(db: Session, answer: Answer):

    db.add(answer)

    db.commit()

    db.refresh(answer)

    return answer