"""SQLAlchemy model for table user_statuses"""
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from . import Base


class UserStatuse(Base):
    """SQLAlchemy model for table user_statuses"""

    __tablename__ = "user_statuses"
    
    id = Column(Integer)
    status = Column(String)

    users = relationship('User')
