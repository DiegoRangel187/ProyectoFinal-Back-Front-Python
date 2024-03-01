from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from schemes.schemes import User, Task, TaskDeleteRequest
from fastapi.responses import JSONResponse
from services.task import TaskService
from config.database import Session
from typing import List
from utilities.validation import (is_valid_password, is_valid_username, get_current_user)

task_router = APIRouter()

@task_router.post("/create_task/", response_model=dict, status_code=200)
async def create_task(task: Task, current_user: User = Depends(get_current_user)) -> dict:
    TaskService(Session()).create_task(task, current_user)
    return JSONResponse(content={'message': 'New task created successfully'}, status_code=201)

@task_router.get("/tasks/", response_model=List[Task], status_code=200)
def get_tasks(current_user: User = Depends(get_current_user)) -> List[Task]:
    result = TaskService(Session()).get_tasks(current_user)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@task_router.get("/tasks/{id}/", response_model=Task, status_code=200)
def get_task(id: int) -> Task:
    result = TaskService(Session()).get_task(id)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@task_router.put("/update_task/", response_model=dict, status_code=200)
def update_task(id: int, task: Task, user: User = Depends(get_current_user)):
    if not TaskService(Session()).get_task(id):
        return JSONResponse(content={'message': 'task not found'}, status_code=404)
    TaskService(Session()).update_task(id, task)
    return JSONResponse(content={'message':'task updated successfully'}, status_code=200)

@task_router.delete("/delete_task/", response_model=dict, status_code=200)
def delete_task(delete_request: TaskDeleteRequest, user: User = Depends(get_current_user)) -> dict:
    if not TaskService(Session()).get_task(delete_request.id):
        return JSONResponse(content={'message':'task not found'}, status_code=404)
    TaskService(Session()).delete_task(delete_request.id)
    return JSONResponse(content={'message': 'task deleted successfully'}, status_code=200)