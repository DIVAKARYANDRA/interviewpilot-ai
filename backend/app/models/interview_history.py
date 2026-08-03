from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy import func

from app.database.db import Base


class InterviewHistory(Base):

    __tablename__ = "interview_history"


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


    company = Column(

        String,

        nullable=True

    )


    role = Column(

        String,

        nullable=True

    )


    interview_type = Column(

        String,

        nullable=True

    )


    overall_score = Column(

        Integer

    )


    technical_score = Column(

        Integer

    )


    communication_score = Column(

        Integer

    )


    confidence_score = Column(

        Integer

    )


    summary = Column(

        String

    )


    created_at = Column(

        DateTime,

        server_default=func.now()

    )