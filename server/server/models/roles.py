"""SQLAlchemy model for table roles"""
from sqlalchemy import Column, String, Integer
from . import Base


class Role(Base):
    """SQLAlchemy model for table roles"""
    
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    role = Column(String, unique=True, nullable=False)