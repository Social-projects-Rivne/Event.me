"""SQLAlchemy model for table event_statuses"""
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from . import Base


class EventStatus(Base):
    """SQLAlchemy model for table event_statuses"""

    __tablename__ = 'event_statuses'

    id = Column(Integer, primary_key=True)
    status = Column(String)

    histories = relationship("EventHistory")

    @classmethod
    def get_status(cls, request, status):
        """Get role from db"""
        event_status = request.dbsession.query(cls)\
            .filter_by(status=status).one()
        return event_status
