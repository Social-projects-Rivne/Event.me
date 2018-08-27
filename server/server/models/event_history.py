"""SQLAlchemy model for table event_histories"""
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship

from . import Base


class EventHistory(Base):
    """SQLAlchemy model for table event_histories"""

    __tablename__ = 'event_histories'

    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    status_id = Column(Integer, ForeignKey('event_statuses.id'),
                       nullable=False)
    date = Column(DateTime)
    comment = Column(Text)

    events = relationship("Event", foreign_keys=(event_id,))
    event_statuses = relationship("EventStatus", foreign_keys=(status_id,))

    @classmethod
    def create_new(cls, request, **kwargs):
        """Create new event history record in db"""
        request.dbsession.add(cls(**kwargs))
        return True

    @classmethod
    def get_current_event_status(cls, request, event_id):
        """Get last event history object for some event by id"""
        max_date_query = request.dbsession.query(func.max(cls.date))\
            .filter_by(event_id=event_id)
        return request.dbsession.query(cls)\
            .filter(cls.event_id == event_id, cls.date == max_date_query)\
            .first()
