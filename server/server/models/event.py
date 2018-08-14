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
    end_date = Column(DateTime)
    author_name = Column(String, nullable=False)
    main_image = Column(String)
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

    @classmethod
    def add_event(cls, request, obj=False, **kwargs):
        """Add event to the db by class instance if it exist or by args"""
        if obj:
            request.dbsession.add(obj)
        else:
            request.dbsession.add(cls(**kwargs))

    @classmethod
    def get_event_obj(cls, request, **kwargs):
        """Return one instance of Event from db"""
        return request.dbsession.query(cls).filter_by(**kwargs).one_or_none()
