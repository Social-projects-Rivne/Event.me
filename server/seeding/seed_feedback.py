from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"user_id": 2, "event_id": 3, "feedback": "where was i", "date": "2018-07-06", "is_deleted": False},
            {"user_id": 4, "event_id": 1, "feedback": "VYNNYK NUMBER 1!", "date": "2017-12-21", "is_deleted": True},
            {"user_id": 1, "event_id": 2, "feedback": "Drizzt or better Dzirt", "date": "2018-07-01", "is_deleted": False})
    
    statement = text("""INSERT INTO feedbacks(user_id, event_id, feedback, date, is_deleted)
    VALUES (:user_id, :event_id, :feedback, :date, :is_deleted)""")
    
    for line in data:
        con.execute(statement, **line)
