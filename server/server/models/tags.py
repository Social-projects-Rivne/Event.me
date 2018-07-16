from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import relationship 

class Tags():
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True)
    tag = Column(String, nullable=False, unique=True)


