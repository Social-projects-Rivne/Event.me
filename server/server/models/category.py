"""SQLAlchemy model for table categories"""
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .meta import Base


class Category(Base):
    """SQLAlchemy model for table categories"""

    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True)
    category = Column(String, unique=True, nullable=False)

    user = relationship("Event")

    def __init__(self, category):
        self.category = category
