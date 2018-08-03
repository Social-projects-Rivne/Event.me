"""SQLAlchemy model for table users"""

import json
import datetime

from passlib.hash import pbkdf2_sha256
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, bindparam
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Query
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.orm import class_mapper, ColumnProperty
import pyramid.httpexceptions as exc

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
        user_status = self.user_statuses
        if user_status.status == "Active":
            return True
        elif user_status.status == "Banned":
            if self.banned_to_date < datetime.now():
                self.status_id = request.dbsession.query(UserStatus)\
                                .filter_by(status="Active").one().id
                return True
        return False

    def get_role(self):
        """Return string with user role"""
        return self.roles.role

    def __init__(self, email, nickname, password, create_date, location,
                 first_name, last_name, status_id, role_id, avatar,
                 banned_to_date):
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


def from_json(cls, data):
    """ Deserializes User object """
    return cls(**data)


def model_to_json(sqlalchemy_object):
    """ Serializes sqlalchemy_object to json
    and converts datetime to string
    """
    fields_arr = [prop.key for prop in
                  class_mapper(sqlalchemy_object.__class__).iterate_properties
                  if isinstance(prop, ColumnProperty)]
    _dict = {}
    for key in fields_arr:
        temp = getattr(sqlalchemy_object, key)
        if isinstance(temp, datetime.datetime):
            _dict[key] = str(getattr(sqlalchemy_object, key))
        else:
            _dict[key] = getattr(sqlalchemy_object, key)
    return _dict


def users_to_json(obj):
    """ Specific serializer for User object (json) """
    to_serialize = ['id', 'email', 'nickname', 'password', 'create_date',
                    'location', 'first_name', 'last_name', 'status_id',
                    'role_id', 'avatar', 'banned_to_date']
    d = {}
    for attr_name in to_serialize:
        d[attr_name] = str(getattr(obj, attr_name))
    return d


class DTEncoder(json.JSONEncoder):
    """ Decoder class for datetime (json) """
    def default(self, o):
        if isinstance(o, datetime.datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)


def get_all_users(request):
    """ Method to get all users from database """
    qry = request.dbsession.query(User).all()
    usr_in_json = list(map(lambda x: model_to_json(x), qry))
    return usr_in_json


def create_usr(json_str, request):
    """ Method to add user to database """
    user = User(**json_str)
    request.dbsession.add(user)
    return {'status': 'Success!'}


def read_usr(request):
    """ Method to read user from database """
    if request.dbsession.query(User)\
            .filter(User.id == request.matchdict['profile_id']).count():
        qry = request.dbsession.query(User)\
            .filter(User.id == request.matchdict['profile_id']).first()
        dict_ = users_to_json(qry)
    else:
        raise exc.exception_response(404)
    return json.loads(json.dumps(dict_, cls=DTEncoder))


def update_usr(json_str, request):
    """ Method to update user in database """
    json_encoded = json.dumps(json_str)
    if request.dbsession.query(User)\
            .filter(User.id == request.matchdict['profile_id']).count():
        request.dbsession.query(User)\
            .filter(User.id == request.matchdict['profile_id']).\
            update(json.loads(json_encoded))
    else:
        raise exc.exception_response(404)
    return {'status': 'Success!'}


def delete_usr(request):
    """ Method to delete user from database """
    if request.dbsession.query(User)\
            .filter(User.id == request.matchdict['profile_id']).count():
        request.dbsession.query(User).\
            filter(User.id == request.matchdict['profile_id']).delete()
    else:
        raise exc.exception_response(404)
    return {'return': 'Success!'}
