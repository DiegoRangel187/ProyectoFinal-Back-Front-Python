from fastapi import HTTPException
from models.models import User as UserModel
from schemes.schemes import User
from sqlalchemy.orm.session import Session

class LoginService():
    def __init__(self, db: Session) -> None:
        self.db: Session = db
        
    def create_user(self, user: User):
        try:
            new_user = UserModel(**user.model_dump())
            self.db.add(new_user)
            self.db.commit()
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    def get_users(self):
        return self.db.query(UserModel).all()