from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import Text

from app.database.db import Base


class Question(Base):

    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)

    interview_session_id = Column(
        Integer,
        ForeignKey("interview_sessions.id")
    )

    question = Column(Text)

    topic = Column(String)

    difficulty = Column(String)