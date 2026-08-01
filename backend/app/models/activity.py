from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    JSON,
    ForeignKey
)

from app.database.db import Base


class Activity(Base):

    __tablename__ = "activities"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    activity_type = Column(
        String,
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )

    score = Column(Integer)

    data = Column(JSON)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )