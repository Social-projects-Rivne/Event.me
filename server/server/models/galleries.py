from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.orm import relationship


class Gallery:
    __tablename__ = 'galleries'
    id = Column(Integer, primary_key=True)
    img_url = Column(String, nullable=False, unique=True)
    id_event = Column(Integer, ForeignKey('events.id'), nullable=False, index=True)

    event = relationship("Event", foreign_keys="id_event")
