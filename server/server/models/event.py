"""SQLAlchemy model for table events"""
from sqlalchemy import Column, DateTime, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from . import Base


class Event(Base):
    """SQLAlchemy model for table events"""

    __tablename__ = 'events'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    long = Column(Float, nullable=False)
    lat = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    author_name = Column(String, nullable=False)
    main_image = Column(String, nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False,
                       index=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False,
                         index=True)

    author = relationship("User", foreign_keys=(author_id,))
    category = relationship("Category", foreign_keys=(category_id,))
    subscribes = relationship("Subscribe")
    feedbacks = relationship("Feedback")
    galleries = relationship("Gallery")
    event_histories = relationship("EventHistory")
    event_tags = relationship("EventTag")
