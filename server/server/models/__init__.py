"""
SQLAlchemy models for database
"""
# import sys
# sys.path.append("/home/github/Event.me/server")

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, configure_mappers
from sqlalchemy import *
from pyramid.threadlocal import get_current_registry
from sqlalchemy import engine_from_config
from zope.sqlalchemy import ZopeTransactionExtension
from marshmallow import Schema

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension(keep_session=True)))

class RenderSchema(Schema):
    """
    Schema to prevent marshmallow from using its default type mappings.
    We use this schema for rendering output: For those cases we don't want
    marshmallow's default type mappings. We want Pyramid's JSON-rendering
    functionality instead, where we already have some json-adapers.
    """
    TYPE_MAPPING = {}

class Base(object):
    def __json__(self, request):
        json_exclude = getattr(self, '__json_exclude__', set())
        return {key: value for key, value in self.__dict__.items()
                if not key.startswith('_')
                and key not in json_exclude}

Base = declarative_base(cls=Base)

def get_engine(settings, prefix='sqlalchemy.'):
    """ Get an Engine instance
    Arguments:
    setting -- configuration dictionary
    prefix -- prefix to match and then strip from keys in 'configuration'
    """
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    """ Get a configured by 'engine' session class """
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """ Get a sqlalchemy Session instance backed by a transaction.
    This function will hook the session to the transaction manager which
    will take care of committing any changes, and apply to use zope queries
    syntax in transactions.
    session_factory -- configured sqlalchemy session class
    transaction_manager -- transaction manager, transaction object of active
    request
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def get_dbsession():
    """ Open transaction (session) and return transaction object """
    engine = get_engine(get_current_registry().settings)
    session_factory = get_session_factory(engine)
    dbsession = get_tm_session(session_factory, transaction.manager)
    return dbsession


def includeme(config):
    """ Add a transactions object to every request
    Include pyramid_tm and pyramid_retry modules to configs and register a
    session class in configs. Add a new method named 'dbsession' to request
    object that implement a transactions to the request.
    Initialize the model for a Pyramid app.
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    config.include('pyramid_tm')
    config.include('pyramid_retry')

    session_factory = get_session_factory(get_engine(settings))
    config.registry['dbsession_factory'] = session_factory

    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True
)
