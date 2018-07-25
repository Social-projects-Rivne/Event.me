from pyramid.config import Configurator
from sqlalchemy.orm import sessionmaker

def db(request):
    maker = request.registry.dbmaker
    session = maker()

    def cleanup(request):
        if request.exception is not None:
            session.rollback()
        else:
            session.commit()
        session.close()
    request.add_finished_callback(cleanup)

    return session

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    #engine = engine_from_config(settings, prefix='slqalchemy.')

    config = Configurator(settings=settings)
    #config.registry.dbmaker = sessionmaker(bind=engine)
    config.add_request_method(db, reify=True)
    config.scan('.models')
    #config.add_handler('')
    config.include('pyramid_jinja2')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('profile', '/profile/{id}')
    config.add_route('profiles_col', '/profiles')
    config.scan()
    return config.make_wsgi_app()
