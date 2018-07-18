from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class UserStatuse(Base):
    __tablename__ = "user_statuses"
    id = Column(Integer)
    status = Column(String)

    users = relationship('User')
