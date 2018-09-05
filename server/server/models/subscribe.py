"""SQLAlchemy model for table subscribes"""
from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from . import Base


class Subscribe(Base):
    """SQLAlchemy model for table subscribes"""

    __tablename__ = 'subscribes'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    is_favorite = Column(Boolean)

    users = relationship("User", foreign_keys=(user_id,))
    events = relationship("Event", foreign_keys=(event_id,))

    @classmethod
    def get_subscription(cls, request, **kwargs):
        subscription = request.dbsession.query(cls).filter_by(**kwargs).\
                       one_or_none()
        return subscription

    @classmethod
    def add_subscription(cls, request, **kwargs):
        """Add subscription"""
        request.dbsession.add(cls(**kwargs))

    @classmethod
    def del_subscription(cls, request, **kwargs):
        subscription = request.dbsession.query(cls).filter_by(**kwargs).\
                       one_or_none()
        request.dbsession.delete(subscription)
