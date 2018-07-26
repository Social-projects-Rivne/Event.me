"""SQLAlchemy model for table tokens"""
from passlib.hash import pbkdf2_sha256
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class Token(Base):
    __tablename__ = "tokens"

    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String, unique=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    expiration_date = Column(DateTime)

    user = relationship("User", foreign_keys=(user_id,))
