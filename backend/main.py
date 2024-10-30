from typing import Union

from fastapi import FastAPI
from users import get_users as get_users_from_module

app = FastAPI()
users = get_users_from_module()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users():
    # TODO ASSIGNMENT: Return a list of users
    return users
