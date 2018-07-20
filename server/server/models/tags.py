"""SQLAlchemy model for table tags"""
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from . import Base


class Tag(Base):
    """SQLAlchemy model for table tags"""

    __tablename__ = 'tags'
    
    id = Column(Integer, primary_key=True)
    tag = Column(String, nullable=False, unique=True)
