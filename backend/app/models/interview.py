from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from app.database.db import Base


class Interview(Base):

    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    company = Column(String)

    role = Column(String)

    interview_type = Column(String)

    difficulty = Column(String)

    status = Column(String)

    overall_score = Column(Integer)

    technical_score = Column(Integer)

    communication_score = Column(Integer)

    confidence_score = Column(Integer)

    summary = Column(String)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    completed_at = Column(
        DateTime,
        nullable=True
    )