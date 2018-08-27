"""SQLAlchemy model for table event_tags"""
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship

from . import Base
from .tag import Tag


class EventTag(Base):
    """SQLAlchemy model for table event_tags"""

    __tablename__ = 'event_tags'

    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    tag_id = Column(Integer, ForeignKey('tags.id'), nullable=False)

    event = relationship("Event", foreign_keys=(event_id,))
    tag = relationship("Tag", foreign_keys=(tag_id,))

    @classmethod
    def add_new(cls, request, tag_id, event_id):
        """Add new relationship with event and tag"""
        request.dbsession.add(cls(event_id=event_id, tag_id=tag_id))
        return True

    @classmethod
    def get_event_tags(cls, request, event_id):
        """Get dict({ tag: id, tag: id }) with tags for event by id"""
        event_tags = request.dbsession.query(cls)\
            .filter_by(event_id=event_id).all()
        tags = {}
        for obj in event_tags:
            tags.update({obj.tag.tag: obj.tag.id})
        return tags

    @classmethod
    def delete_tag(cls, request, tag_id, event_id):
        """Delete realtionship with event and tag by ids"""
        request.dbsession.query(cls)\
            .filter_by(event_id=event_id, tag_id=tag_id).delete()
