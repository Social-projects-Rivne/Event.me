from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class EventStatus:
    __tablename__ = 'event_statuses'
    id = Column(Integer, primary_key=True)
    status = Column(String)

    histories = relationship("EventHistory")

    def __init__(self, status):
        self.status = status
