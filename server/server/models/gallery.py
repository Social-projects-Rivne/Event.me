from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from .event import Event


class Gallery():
    __tablename__ = 'gallery'
    id = Column(Integer, primary_key=True)
    img_url = Column(String, nullable=False, unique=True)
    id_event = Column(ForeignKey('event.id'), nullable=False, index=True)

    event = relationship(Event)
