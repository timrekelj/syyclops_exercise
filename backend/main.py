from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users import get_users as get_users_from_module

def convert_users(users: list) -> list:
    users = []
    for module_user in module_users:
        user = {}
        user["id"] = module_user["id"]
        user["firstName"] = module_user["name"].split(" ")[0]
        if len(module_user["name"].split(" ")) == 2:
            user["lastName"] = module_user["name"].split(" ")[1]
        user["email"] = module_user["email"]
        users.append(user)
    return users

origins = [
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

module_users = get_users_from_module()
users = convert_users(module_users)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users():
    return { "users": users }

@app.put("/users/{user_id}")
def update_user(user_id: int, updated_user: dict):
    for user in users:
        if user["id"] == user_id:
            user.update(updated_user)
            return user
    return {"error": "User not found"}
