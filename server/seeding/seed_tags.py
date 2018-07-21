from sqlalchemy.sql import text
from sqlalchemy import create_engine


engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"tag": "concert"}, {"tag": "vynnyk"}, {"tag": "fans"}, {"tag": "love"}, {"tag": "gore"},
            {"tag": "metal"}, {"tag": "violence"})
    
    statement = text("""INSERT INTO tags(tag) VALUES (:tag)""")
    
    for line in data:
        con.execute(statement, **line)
