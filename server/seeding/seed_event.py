from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    '''
        Example:
            {"name": "some name", "long": 00.000000, "lat": 00.000000,
             "description": "some description", "start_date": "yyyy-mm-dd", "end_date": "yyyy-mm-dd",
             "author_name": "some author name", "main_image": "some image", "author_id": 0, "category_id": 0}
    '''
    
    data = ({"name": "Oleh Vynnyk Rivne Show", "long": 26.251617, "lat": 50.619900,
             "description": "Some show blah", "start_date": "2017-12-21", "end_date": "2017-12-21",
             "author_name": "what", "main_image": "vynnykposter", "author_id": 4, "category_id": 2},
            {"name": "Dark Elf Adventure", "long": 27.251617, "lat": 51.619900,
             "description": "Drizzt long adventure", "start_date": "2019-11-01", "end_date": "2019-11-05",
             "author_name": "Drizzt", "main_image": "drizztcoolposter", "author_id": 3, "category_id": 3},
            {"name": "Independent day", "long": 38.907192, "lat": -77.036871,
             "description": "Beer, burgers, rock n roll", "start_date": "2018-07-04", "end_date": "2018-07-05",
             "author_name": "Oleksandr", "main_image": "someposter", "author_id": 1, "category_id": 1},
            )
    
    statement = text(
            """INSERT INTO events(name, long, lat, description, start_date, end_date,
             author_name, main_image, author_id, category_id)
            VALUES (:name, :long, :lat, :description, :start_date, :end_date,
             :author_name, :main_image, :author_id, :category_id)"""
    )
    
    for line in data:
        con.execute(statement, **line)
