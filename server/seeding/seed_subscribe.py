from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"user_id": 4, "event_id": 1, "is_favorite": False},
            {"user_id": 2, "event_id": 2, "is_favorite": True},
            {"user_id": 5, "event_id": 2, "is_favorite": True})
    
    statement = text("""INSERT INTO subscribes(user_id, event_id, is_favorite)
    VALUES (:user_id, :event_id, :is_favorite)""")
    
    for line in data:
        con.execute(statement, **line)
