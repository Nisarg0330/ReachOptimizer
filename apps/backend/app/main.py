from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # In production, specify domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hello():
    return {"message": "Hello from FastAPI!"}