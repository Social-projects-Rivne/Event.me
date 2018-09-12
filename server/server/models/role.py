"""SQLAlchemy model for table roles"""
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

from . import Base


class Role(Base):
    """SQLAlchemy model for table roles"""

    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    role = Column(String, unique=True, nullable=False)

    users = relationship("User")

    @classmethod
    def get_role(cls, request, role):
        """Get role from db"""
        user_role = request.dbsession.query(cls).filter_by(role=role).one()
        return user_role

    @classmethod
    def get_all(cls,request):
        return request.dbsession.query(cls).all()
