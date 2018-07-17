from eventme.server.server.models import Base
from sqlalchemy import Column, Integer, Text, DateTime

class EventHistory(Base):
    __tablename__ = 'event_histories'
    id = Column(Integer, primary_key=True)
    id_event = Column(Integer)
    id_status = Column(Integer)
    date = Column(DateTime)
    comment = Column(Text)

    def __init__(self, id_event, id_status, date, comment):
        self.name = id_event
        self.id_status = id_status
        self.date = date
        self.comment = comment