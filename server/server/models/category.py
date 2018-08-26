"""SQLAlchemy model for table categories"""
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

from . import Base, model_to_dict


class Category(Base):
    """SQLAlchemy model for table categories"""

    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    category = Column(String, unique=True, nullable=False)

    user = relationship("Event")

    @classmethod
    def get_all(cls, request):
        return request.dbsession.query(cls).all()

    @classmethod
    def get_by_name(cls, request, category_str):
        """Return Category object by category name"""
        return request.dbsession.query(cls)\
            .filter_by(category=category_str).one_or_none()
