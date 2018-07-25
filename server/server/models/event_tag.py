"""SQLAlchemy model for table event_tags"""
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base


class EventTag(Base):
    """SQLAlchemy model for table event_tags"""
    
    __tablename__ = 'event_tags'
    
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    tag_id = Column(Integer, ForeignKey('tags.id'), nullable=False)

    event = relationship("Event", foreign_keys=(event_id,))
    tag = relationship("Tag", foreign_keys=(tag_id,))
