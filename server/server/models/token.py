"""SQLAlchemy model for table tokens"""
from datetime import datetime, timedelta
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

    @classmethod
    def add_token(cls, req, token, user_id):
        token_obj = cls(token=token, user_id=user_id,
                        expiration_date=datetime.now()+timedelta(days=7))
        req.dbsession.add(token_obj)

    @classmethod
    def deactivate(cls, req, token):
        req.dbsession.query(cls).filter_by(token=token).delete()
        return True
