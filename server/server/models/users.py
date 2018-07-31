"""SQLAlchemy model for table users"""
# import sys
# sys.path.append('..')
import json
import decimal, datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, bindparam
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Query
from sqlalchemy.ext.declarative import DeclarativeMeta

from . import DBSession, Base
from . import RenderSchema

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

class UserSchema(RenderSchema):
    """Schema for Users"""

    class Meta:
        fields = ("id", "email", "nickname", "create_date", "location", "first_name", "last_name", "status_id", "role_id", "avatar")

class User(Base):
    """SQLAlchemy model for table users"""

    __tablename__ = "users"
    #__json_exclude__ = set(["create_date", "status_id", "role_id", ])

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

    roles = relationship("Role", foreign_keys=(role_id,))
    user_statuses = relationship("UserStatus", foreign_keys=(status_id,))
    events = relationship("Event")
    feedback = relationship("Feedback")
    users_subscribe = relationship("Subscribe")

    def __init__(self, email, nickname, password, create_date, location, first_name, last_name, status_id, role_id, avatar):
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

def users_to_json(obj):
    """ Serialize User object to JSON """

    to_serialize = ['id', 'email', 'nickname', 'password', 'create_date', 'location', 'first_name', 'last_name', 'status_id', 'role_id', 'avatar']
    d = {}
    for attr_name in to_serialize:
        d[attr_name] = getattr(obj, attr_name)
    return d

def from_json(cls, data):
    """ Deserialize User object from JSON """

    return cls(**data)
