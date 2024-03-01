from datetime import datetime, timedelta
from jwt import encode, decode
pwd = '123456789'

def create_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return encode(payload=to_encode, key=pwd, algorithm='HS256')

def validate_token(token):
    return decode(token, pwd, algorithms=['HS256'])