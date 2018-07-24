"""SQLAlchemy model for table event_statuses"""
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .meta import Base


class EventStatus(Base):
    """SQLAlchemy model for table event_statuses"""

    __tablename__ = 'event_statuses'
    
    id = Column(Integer, primary_key=True)
    status = Column(String)

    histories = relationship("EventHistory")
    
    def __init__(self, status):
        self.status = status
