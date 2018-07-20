"""SQLAlchemy model for table categories"""
from sqlalchemy import Column, String, Integer
from . import Base


class Category(Base):
    """SQLAlchemy model for table categories"""

    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True)
    category = Column(String, unique=True, nullable=False)
