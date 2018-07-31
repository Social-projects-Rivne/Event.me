"""SQLAlchemy model for table users"""

import json
import decimal, datetime

from passlib.hash import pbkdf2_sha256
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, bindparam
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Query
from sqlalchemy.ext.declarative import DeclarativeMeta

from . import Base
from .user_status import UserStatus

class AlchemyEncoder(json.JSONEncoder):
    """ Helper method for serialization conflicts  """
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)

def datetime_conv(o):
    """ Convert DateTime to String for JSON """
    if isinstance(o, datetime.datetime):
        return o.__str__()

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
        user_status = request.dbsession.query(UserStatus)\
            .filter_by(id=self.status_id).one()
        if user_status.status == "Active":
            return True
        elif user_status.status == "Banned":
            if self.banned_to_date < datetime.now():
                self.status_id = request.dbsession.query(UserStatus)\
                                .filter_by(status="Active").one().id
                return True
        return False

    def __init__(self, email, nickname, password, create_date, location, first_name, last_name, status_id, role_id, avatar, banned_to_date):
        self.email = email
        self.nickname = nickname
        self.password = password
        self.create_date = create_date
        self.location = location
        self.first_name = first_name
        self.last_name = last_name
        self.status_id = status_id
        self.role_id = role_id
        self.avatar = avatar
        self.banned_to_date = banned_to_date

def users_to_json(obj):
    """ Serialize User object to JSON """

    to_serialize = ['id', 'email', 'nickname', 'password', 'create_date', 'location', 'first_name', 'last_name', 'status_id', 'role_id', 'avatar', 'banned_to_date']
    d = {}
    for attr_name in to_serialize:
        d[attr_name] = getattr(obj, attr_name)
    return d

def from_json(cls, data):
    """ Deserialize User object from JSON """

    return cls(**data)
