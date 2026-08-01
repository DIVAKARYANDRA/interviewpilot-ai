from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.db import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    experience = Column(Integer)

    current_company = Column(String)

    target_company = Column(String)

    target_role = Column(String)