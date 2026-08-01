from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from app.database.db import Base


class Interview(Base):

    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    company = Column(String)

    role = Column(String)

    difficulty = Column(String)

    overall_score = Column(Integer)

    status = Column(String)