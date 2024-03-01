from datetime import timedelta
from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from utilities.validation import validate_identity
from schemes.schemes import User, UserLogin
from utilities.jwt_manager import create_token
from fastapi.responses import JSONResponse
from services.login import LoginService
from config.database import Session
from typing import List
from utilities.validation import (is_valid_password, is_valid_username, get_current_user)

login_router = APIRouter()

@login_router.post("/signup/", response_model=dict, status_code=200)
async def signup(user: User):
    LoginService(Session()).create_user(user)
    return JSONResponse(content={"message": "New user created successfully"}, status_code=201)

@login_router.post("/login/", response_model=dict, status_code=200)
async def login(user: UserLogin):
    if validate_identity(username=user.username, password=user.password):
        expire = timedelta(minutes=60)
        token = create_token(data=user.model_dump(), expires_delta=expire)
        result = JSONResponse(content={"token": token, "token_type": "bearer"}, status_code=200)
    else:
        result = JSONResponse(content={"message":"Invalid credentials"}, status_code=401)
    return result