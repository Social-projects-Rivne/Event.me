from sqlalchemy import Column, Unicode, Integer
from sqlalchemy.orm import relationship


class Category:
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    category = Column(Unicode(255), unique=True, nullable=False)
    
    user = relationship("Event")
