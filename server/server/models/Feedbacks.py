from sqlalchemy import Column, Integer, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Feedbacks(Base):
    __tablename__ = 'Feedbacks'
    id_feedback = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey="users.id")
    id_event = Column(Integer)
    feedback = Column(Text)
    date = Column(DateTime())
    is_delete = Column(Boolean)

    users = relationship("Users", back_populates="feedbacks")