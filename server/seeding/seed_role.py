from sqlalchemy.sql import text
from sqlalchemy import create_engine

engine = create_engine('postgresql://admin:1@localhost:5555/eventme')

with engine.connect() as con:
    data = ({"role": "admin"}, {"role": "user"}, {"role": "moderator"})
    
    statement = text("""INSERT INTO roles(role) VALUES (:role)""")
    
    for line in data:
        con.execute(statement, **line)
