from fastapi import HTTPException
from models.models import Task as TaskModel
from schemes.schemes import User, Task
from sqlalchemy.orm.session import Session

class TaskService():
    def __init__(self, db: Session) -> None:
        self.db: Session = db

    def create_task(self, task: Task, user: User):
        try:
            task.user_id = user.id
            new_task = TaskModel(**task.model_dump())
            self.db.add(new_task)
            self.db.commit()
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

    def get_tasks(self, user: User):
        return self.db.query(TaskModel).filter(TaskModel.user_id == user.id).all()

    def get_task(self, id:int):
        return self.db.query(TaskModel).filter(TaskModel.id == id).first()

    def update_task(self, id:int, data: Task):
        project = self.get_task(id)
        project.title = data.title
        project.description = data.description
        project.priority = data.priority
        self.db.commit()

    def delete_task(self, id:int):
        project = self.get_task(id)
        self.db.delete(project)
        self.db.commit()