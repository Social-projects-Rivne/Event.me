from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class EventTag(Base):
    __tablename__ = 'event_tags'
    
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    tag_id = Column(Integer, ForeignKey('tags.id'), nullable=False, IndexError=True)

    event = relationship("Event", foreign_keys="event_id")
    tag = relationship("Tag", foreign_keys="tag_id")
