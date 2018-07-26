from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"event_id": 1, "status_id": 2, "date": "2017-12-21", "comment": "omg vynnyk best"},
            {"event_id": 3, "status_id": 2, "date": "2018-07-05", "comment": "wow was fun"},
            {"event_id": 2, "status_id": 3, "date": "2019-11-01", "comment": "coming soon"})
    
    statement = text("""INSERT INTO event_histories(event_id, status_id, date, comment)
    VALUES (:event_id, :status_id, :date, :comment)""")
    
    for line in data:
        con.execute(statement, **line)
