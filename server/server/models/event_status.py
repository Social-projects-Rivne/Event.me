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
        """Get status object from db by status string"""
        event_status = request.dbsession.query(cls)\
            .filter_by(status=status).one()
        return event_status

    @classmethod
    def get_status_by_id(cls, request, id):
        """Get status string by status id"""
        return request.dbsession.query(cls).get(id).status
