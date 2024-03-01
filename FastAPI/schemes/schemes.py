from datetime import date
from typing import List, Optional
from pydantic import BaseModel, Field

class Task(BaseModel):
    id: Optional[int] = None
    title: str = Field(default="Task#1")
    description: Optional[str] = Field(default="My task")
    deadline: date = Field(date.today())
    priority: int = Field(default=1)
    user_id: Optional[int] = None

class User(BaseModel):
    id: Optional[int] = None
    username: str = Field (default="My username")
    email: str = Field (default="My email")
    password: str = Field (default="My password")

class UserLogin(BaseModel):
    username: str
    password: str

class TaskDeleteRequest(BaseModel):
    id: int = Field(description="ID of the task to delete")