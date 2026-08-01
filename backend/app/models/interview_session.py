from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app.database.db import Base


class InterviewSession(Base):

    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(String, unique=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    company = Column(String)

    role = Column(String)

    difficulty = Column(String)

    status = Column(String, default="ACTIVE")

    user = relationship("User")