from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey 
from sqlalchemy.ext.declarative import declarative_base 
from sqlalchemy.orm import relationship 

class Event_tags():
    __tablename__ = 'event_tags'
    id = Column(Integer, primary_key=True)
    id_event = Column(Integer, nullable=False, unique=True)
    id_tag = Column(ForeignKey('tag.id'), nullable=False, IndexError=True)

    event = relationship(Event)
    tag = relationship(Tag)