"""SQLAlchemy model for table galleries"""
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship

from . import Base


class Gallery(Base):
    """SQLAlchemy model for table galleries"""

    __tablename__ = 'galleries'
    
    id = Column(Integer, primary_key=True)
    img_url = Column(String, nullable=False, unique=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False, index=True)

    event = relationship("Event", foreign_keys=(event_id,))
