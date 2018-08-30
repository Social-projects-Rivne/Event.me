"""SQLAlchemy model for table users"""

import datetime

from passlib.hash import pbkdf2_sha256
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from pyramid import httpexceptions

from . import Base
from .role import Role
from .user_status import UserStatus


class User(Base):
    """SQLAlchemy model for table users"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    nickname = Column(String, unique=True)
    password = Column(String)
    create_date = Column(DateTime)
    location = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    status_id = Column(Integer, ForeignKey("user_statuses.id"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    avatar = Column(String)
    banned_to_date = Column(DateTime)
    url_token = Column(String)

    tokens = relationship("Token")
    roles = relationship("Role", foreign_keys=(role_id,))
    user_statuses = relationship("UserStatus", foreign_keys=(status_id,))
    events = relationship("Event")
    feedback = relationship("Feedback")
    users_subscribe = relationship("Subscribe")

    @classmethod
    def get_one(cls, request, **kwargs):
        """Get one user from db by params
        Return user object if user exist and return None if not
        Arguments:
        request -- request object that provides from view
        **kwargs -- parameters for searching user
        (e.g. field=value, field=value)
        """
        user = request.dbsession.query(cls).filter_by(**kwargs).one_or_none()
        return user

    @classmethod
    def get_user_by_email(cls, request, email):
        """ """
        return request.dbsession.query(User)\
            .filter(func.lower(User.email) == func.lower(email)).one_or_none()

    @classmethod
    def get_user_by_nickname(cls, request, nickname):
        """ """
        return request.dbsession.query(User)\
            .filter(func.lower(User.nickname) == func.lower(nickname))\
            .one_or_none()


    def check_password(self, password):
        """Check if user password valid"""
        return pbkdf2_sha256.verify(password, self.password)

    def is_active(self, request):
        """Check is user active
        Change user status to active if user was banned but time of his
        ban ended. Return True if user active and return False if not.
        Arguments:
        request -- request object that provides from view
        """
        user_status = self.user_statuses
        if user_status.status == "Active":
            return True
        elif user_status.status == "Banned":
            if (self.banned_to_date is not None and
                    self.banned_to_date < datetime.now()):
                self.status_id = request.dbsession.query(UserStatus)\
                                .filter_by(status="Active").one().id
                return True
        return False

    @classmethod
    def get_all(cls, request):
        """Get all users"""
        return request.dbsession.query(cls).all()

    @classmethod
    def add_user(cls, request, **kwargs):
        """Add user into db"""
        request.dbsession.add(cls(**kwargs))

    def get_role(self):
        """Return string with user role"""
        return self.roles.role

    @staticmethod
    def update_user(request, json_data):
        """ Method to update user in database """
        if request.dbsession.query(User).get(request.matchdict['profile_id']):
            request.dbsession.query(User)\
                .filter(User.id == request.matchdict['profile_id']).\
                update(json_data)
            return True
        else:
            return False
