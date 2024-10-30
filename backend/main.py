from typing import Union

from fastapi import FastAPI
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

app = FastAPI()
module_users = get_users_from_module()
users = convert_users(module_users)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users():
    return users
