from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer
from config.database import Session
from utilities.jwt_manager import validate_token
from models.models import User

class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        db = Session()
        auth = await super().__call__(request)
        data = validate_token(auth.credentials)
        username = data.get('username')
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.username == data['username']).first()
        if user:
            db.close()
            return user
        else:
            raise HTTPException(status_code=401, detail="Invalid User")