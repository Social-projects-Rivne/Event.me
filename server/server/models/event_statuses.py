"""SQLAlchemy model for table event_statuses"""
from sqlalchemy import Column, Integer, String
from . import Base


class EventStatus(Base):
    """SQLAlchemy model for table event_statuses"""

    __tablename__ = 'event_statuses'
    
    id = Column(Integer, primary_key=True)
    status = Column(String)

    def __init__(self, status):
        self.status = status
