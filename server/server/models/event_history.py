"""SQLAlchemy model for table event_histories"""
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base


class EventHistory(Base):
    """SQLAlchemy model for table event_histories"""

    __tablename__ = 'event_histories'
    
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    status_id = Column(Integer, ForeignKey('event_statuses.id'), nullable=False)
    date = Column(DateTime)
    comment = Column(Text)
    
    events = relationship("Event", foreign_keys=(event_id,))
    event_statuses = relationship("EventStatus", foreign_keys=(status_id,))
