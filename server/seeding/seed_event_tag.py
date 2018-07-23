from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"event_id": 1, "tag_id": 1}, {"event_id": 1, "tag_id": 2}, {"event_id": 1, "tag_id": 7},
            {"event_id": 2, "tag_id": 3}, {"event_id": 2, "tag_id": 5}, {"event_id": 3, "tag_id": 4},
            {"event_id": 2, "tag_id": 5})
    
    statement = text("""INSERT INTO event_tags(event_id, tag_id) VALUES (:event_id, :tag_id)""")
    
    for line in data:
        con.execute(statement, **line)
