from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from app.database.db import Base


class InterviewTurn(Base):

    __tablename__ = "interview_turns"

    id = Column(Integer, primary_key=True)

    interview_session_id = Column(
        Integer,
        ForeignKey("interview_sessions.id")
    )

    turn_number = Column(Integer)

    question = Column(Text)

    answer = Column(Text)

    technical_score = Column(Integer)

    communication_score = Column(Integer)

    confidence_score = Column(Integer)

    strengths = Column(Text)

    weaknesses = Column(Text)

    feedback = Column(Text)

    next_topic = Column(String)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )