from sqlalchemy import Column, Integer, String, ForeignKey, Table, create_engine, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.decl_api import DeclarativeMeta
import os

Base: DeclarativeMeta = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column (Integer, primary_key=True, unique=True, autoincrement=True)
    username = Column (String, unique=True, nullable=False)
    email = Column (String, unique=True, nullable=False)
    password = Column (String, nullable=False)

    tasks = relationship('Task', back_populates='user')

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, unique=True)
    description = Column(String)
    deadline = Column(Date)
    priority = Column(Integer, default=0)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship('User', back_populates='tasks')

sqlite_file_name = "../database.sqlite"
base_dir = os.path.dirname(os.path.realpath(__file__))
database_url = f"sqlite:///{os.path.join(base_dir, sqlite_file_name)}"
engine = create_engine(database_url, echo=True)
Base.metadata.create_all(engine)