from eventme.server.server.models import Base
from sqlalchemy import Column, Integer, String

class EventStatus(Base):
    __tablename__ = 'event_statuses'
    id = Column(Integer, primary_key=True)
    status = Column(String)

    def __init__(self, status):
        self.status = status
