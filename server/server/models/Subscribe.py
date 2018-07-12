from sqlalchemy import Column, Integer, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Subscribe(Base):
    __tablename__ = 'Subscribe'
    id_feedback = Column(Integer, primary_key=True, autoincrement=True)
    id_user = Column(Integer, ForeignKey="users.id")
    id_event = Column(Integer)
    is_favorite = Column(Boolean)

    users = relationship("Users", back_populates="subscribe")