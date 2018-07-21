from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"img_url": "somevynnykurl", "event_id": 1},
            {"img_url": "somedrizzturl", "event_id": 2},
            {"img_url": "someindependenturl", "event_id": 3})
    
    statement = text("""INSERT INTO galleries(img_url, event_id) VALUES (:img_url, :event_id)""")
    
    for line in data:
        con.execute(statement, **line)
