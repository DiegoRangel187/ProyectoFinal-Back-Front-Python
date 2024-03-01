from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from routers.login import login_router
from routers.task import task_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.title = "Todo manager web app"
app.version = "1.0"

Base.metadata.create_all(bind=engine)

app.include_router(task_router, prefix="/task", tags=['Task'])
app.include_router(login_router, prefix="/login", tags=["Login"])

@app.get("/", tags=['home'])
def message():
    return HTMLResponse(content="<h1> Bienvenido a mi API </h1>")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)