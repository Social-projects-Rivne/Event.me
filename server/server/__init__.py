from pyramid.config import Configurator
# from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from pyramid.paster import get_appsettings
#
from .models import Base
from .models import DBSession

# def db(request):
#     maker = request.registry.dbmaker
#     session = maker()
#
#     def cleanup(request):
#         if request.exception is not None:
#             session.rollback()
#         else:
#             session.commit()
#         session.close()
#     request.add_finished_callback(cleanup)
#
#     return session

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application."""

    settings = get_appsettings('./server/development.ini')
    engine = create_engine('postgresql://admin:1@eventme_postgres/eventme')
    Base.metadata.bind = engine
    DBSession.configure(bind=engine)
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('.models')
    config.include('.routes')
    config
    config.scan()
    return config.make_wsgi_app()
    # settings = get_appsettings('./server/development.ini')
    # engine = create_engine('postgresql://admin:1@eventme_postgres/eventme')
    # DBSession.configure(bind=engine)
    # Base.metadata.bind = engine
    # config = Configurator(settings=settings)
    # config.add_request_method(db, reify=True)
    # config.include("cornice")
    # config.scan('.models')
    # config.include('pyramid_jinja2')
    # config.add_static_view('static', 'static', cache_max_age=3600)
    # config.add_route('home', '/')
    # config.include('.routes')
    # config.scan()
    # return config.make_wsgi_app()
