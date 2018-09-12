"""SQLAlchemy model for table user_statuses"""
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from . import Base


class UserStatus(Base):
    """SQLAlchemy model for table user_statuses"""

    __tablename__ = "user_statuses"

    id = Column(Integer, primary_key=True)
    status = Column(String)

    users = relationship('User')

    @classmethod
    def get_user_by_status(cls, request, status):
        """Get status from db"""
        user_status = request.dbsession.query(cls)\
            .filter_by(status=status).one()
        return user_status

    @classmethod
    def get_id_by_status(cls, request, status_str):
        """Get status id filter by status from db"""
        return request.dbsession.query(cls)\
            .filter_by(status=status_str).one().id

    @classmethod
    def get_all(cls, request):
        """Get all statuses from db"""
        return request.dbsession.query(cls).all()
