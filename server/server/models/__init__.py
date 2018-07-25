"""
SQLAlchemy models for database
"""
import zope.sqlalchemy
import transaction
from pyramid.threadlocal import get_current_registry
from sqlalchemy import engine_from_config
from sqlalchemy.orm import configure_mappers, sessionmaker
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()
configure_mappers()


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
