from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from . import Base


class UserStatuse(Base):
    __tablename__ = "user_statuses"
    id = Column(Integer)
    status = Column(String)

    users = relationship('User')
