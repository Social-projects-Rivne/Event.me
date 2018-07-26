from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"status": "Active"}, {"status": "Banned"}, {"status": "Delete"}, {"status": "Non_active"})
    
    statement = text("""INSERT INTO user_statuses(status) VALUES (:status)""")
    
    for line in data:
        con.execute(statement, **line)
