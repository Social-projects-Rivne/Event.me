from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from . import Base


class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    category = Column(String, unique=True, nullable=False)
    
    user = relationship("Event")
