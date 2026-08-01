from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey
from sqlalchemy import Text

from app.database.db import Base


class Evaluation(Base):

    __tablename__ = "evaluations"

    id = Column(Integer, primary_key=True)

    answer_id = Column(
        Integer,
        ForeignKey("answers.id")
    )

    technical_score = Column(Integer)

    communication_score = Column(Integer)

    confidence_score = Column(Integer)

    feedback = Column(Text)