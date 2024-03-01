from fastapi import HTTPException
from models.models import User as UserModel
from schemes.schemes import User
from sqlalchemy.orm.session import Session

class UserService():
    def __init__(self, db: Session) -> None:
        self.db: Session = db

    def get_user(self, id:int):
        return self.db.query(UserModel).filter(UserModel.id == id).first()