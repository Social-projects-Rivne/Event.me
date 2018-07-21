from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"event_id": 1, "tag_id": 8}, {"event_id": 1, "tag_id": 9}, {"event_id": 1, "tag_id": 14},
            {"event_id": 2, "tag_id": 10}, {"event_id": 2, "tag_id": 12}, {"event_id": 3, "tag_id": 11},
            {"event_id": 2, "tag_id": 12})
    
    statement = text("""INSERT INTO event_tags(event_id, tag_id) VALUES (:event_id, :tag_id)""")
    
    for line in data:
        con.execute(statement, **line)
