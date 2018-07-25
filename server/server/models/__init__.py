"""
SQLAlchemy models for database
"""
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import *

metadata = MetaData()

DBSession = scoped_session(sessionmaker())

class Base(object):
    def __json__(self, request):
        json_exclude = getattr(self, '__json_exclude__', set())
        return {key: value for key, value in self.__dict__.items()
                # Do not serialize 'private' attributes
                # (SQLAlchemy-internal attributes are among those, too)
                if not key.startswith('_')
                and key not in json_exclude}

Base = declarative_base(cls=Base)
