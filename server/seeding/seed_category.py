from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"category": "holiday"}, {"category": "concert"}, {"category": "movie"})
    
    statement = text("""INSERT INTO categories(category) VALUES (:category)""")
    
    for line in data:
        con.execute(statement, **line)
