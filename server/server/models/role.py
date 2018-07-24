"""SQLAlchemy model for table roles"""
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .meta import Base


class Role(Base):
    """SQLAlchemy model for table roles"""
    
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    role = Column(String, unique=True, nullable=False)

    users = relationship("User")

    def __init__(self, role):
        self.role = role
