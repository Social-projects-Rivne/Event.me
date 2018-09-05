"""SQLAlchemy model for table tags"""
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship

from . import Base


class Tag(Base):
    """SQLAlchemy model for table tags"""

    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True)
    tag = Column(String, nullable=False, unique=True)

    event_tag = relationship("EventTag")

    @classmethod
    def get_all(cls, request):
        """Get all tags (temporary)"""
        return request.dbsession.query(cls).all()

    @classmethod
    def get_by_name(cls, request, tag_str):
        """Get tag object by tag name"""
        return request.dbsession.query(cls)\
            .filter_by(tag=tag_str).one_or_none()

    @classmethod
    def add_new(cls, request, tag_str):
        """Create new tag and return it's id"""
        request.dbsession.add(cls(tag=tag_str))
        return cls.get_by_name(request, tag_str=tag_str).id
