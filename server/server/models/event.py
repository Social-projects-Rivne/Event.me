"""SQLAlchemy model for table events"""
from datetime import datetime, timedelta

from sqlalchemy import Column, DateTime, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from . import Base
from ..models.event_tag import EventTag
from ..models.tag import Tag
from ..models.event_history import EventHistory
from ..models.event_status import EventStatus


class Event(Base):
    """SQLAlchemy model for table events"""

    __tablename__ = 'events'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
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

    def update_event(self, request, event_dict, event_id, tags):
        """ """
        request.dbsession.query(self.__class__)\
            .filter_by(id=self.id).update(event_dict)

        currnet_event_tags = EventTag.get_event_tags(request, event_id)
        for tag in currnet_event_tags:
            if tag not in tags:
                EventTag.delete_tag(request,
                                    currnet_event_tags[tag], event_id)
        for tag in tags:
            tag_obj = Tag.get_by_name(request, tag.lower())
            if tag_obj is not None:
                tag_id = tag_obj.id
                if tag not in currnet_event_tags:
                    EventTag.add_new(request, tag_id, event_id)
            else:
                tag_id = Tag.add_new(request, tag.lower())
                EventTag.add_new(request, tag_id, event_id)
        return EventHistory.create_new(
                request,
                event_id=event_id,
                status_id=EventStatus.get_status(request, 'New').id,
                date=datetime.now(),
                comment=("Your event updated. "
                         "Please wait for review by moderator.")
            )

    @classmethod
    def close_event(cls, request, event_id):
        return EventHistory.create_new(
            request,
            event_id=event_id,
            status_id=EventStatus.get_status(request, 'Close').id,
            date=datetime.now(),
            comment="This event closed by author."
            )

    @classmethod
    def get_event_obj(cls, request, **kwargs):
        """Return one instance of Event from db"""
        return request.dbsession.query(cls).filter_by(**kwargs).one_or_none()

    @classmethod
    def get_event_by_id(cls, request, id):
        """Return one instance of Event from db by id"""
        return request.dbsession.query(cls).get(id)

    @classmethod
    def get_events_by_ids(cls, request, id_arr):
        return request.dbsession.query(cls).filter(Event.id.in_(id_arr)).all()

    @classmethod
    def get_events_by_user_id(cls, request, user_id):
        return request.dbsession.query(cls).filter_by(author_id=user_id).all()

    @classmethod
    def get_events_short_info(cls, request, period):
        """Return location, title and id of event on some time period"""
        datetime_now = datetime.now()
        return request.dbsession\
            .query(cls).with_entities(cls.id, cls.long, cls.lat, cls.name)\
            .filter(cls.start_date > datetime_now,
                    cls.start_date < datetime_now +
                    timedelta(days=period)).all()

    @classmethod
    def get_event_short_info_with_category_id(cls, request, period, category_name_id):
        datetime_now = datetime.now()
        return request.dbsession \
            .query(cls).with_entities(cls.id, cls.long, cls.lat, cls.name, cls.category_id) \
            .filter(cls.start_date > datetime_now,
                    cls.start_date < datetime_now +
                    timedelta(days=period),
                    cls.category_id == category_name_id).all()
