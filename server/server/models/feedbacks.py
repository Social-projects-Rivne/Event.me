"""SQLAlchemy model for table feedbacks"""
from sqlalchemy import Column, Integer, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class Feedback(Base):
    """SQLAlchemy model for table feedbacks"""

    __tablename__ = 'feedbacks'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey="users.id", nullable=False)
    event_id = Column(Integer, ForeignKey="events.id", nullable=False)
    feedback = Column(Text)
    date = Column(DateTime)
    is_deleted = Column(Boolean)

    users = relationship("User", foreign_keys="user_id")
    events = relationship("Event", foreign_keys="event_id")
