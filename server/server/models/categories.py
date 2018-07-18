from sqlalchemy import Column, Unicode, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    category = Column(Unicode(255), unique=True, nullable=False)
    
    user = relationship("Event")
