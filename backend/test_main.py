from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_get_users():
    response = client.get("/users")
    print(response.json())
    assert response.status_code == 200
    assert response.json() == [
        { "id":1,"firstName":"John","lastName":"Doe","email":"john@doe.com" },
        { "id":2,"firstName":"Jane","lastName":"Doe","email":"jan@doe.com" },
        { "id":3,"firstName":"Alice","email":"alice@doe.com" },
        { "id":4,"firstName":"Bob","email":"bob@doe.com" },
        { "id":5,"firstName":"Charlie","email":"charlie@doe.com" }
    ]

def test_update_user():
    response = client.get("/users")
    assert response.json()[0] == { "id":1, "firstName":"John", "lastName":"Doe", "email":"john@doe.com" }

    response = client.put("/users/1", json={ "id":1, "firstName":"Johnny", "lastName":"Do", "email":"johnny@do.com" })
    assert response.json() == { "id":1, "firstName":"Johnny", "lastName":"Do", "email":"johnny@do.com" }

    response = client.get("/users")
    assert response.json()[0] == { "id":1, "firstName":"Johnny", "lastName":"Do", "email":"johnny@do.com" }

def test_update_user_with_new_keys():
    response = client.get("/users")
    assert response.json()[0] == { "id":1, "firstName":"Johnny", "lastName":"Do", "email":"johnny@do.com" }

    response = client.put("/users/1", json={ "id":1, "firstName":"Johnny", "lastName":"Do", "email":"johnny@do.com", "phone": "1234567890", "age": "50", "gender": "male" })
    assert response.json() == { "id":1, "firstName":"Johnny", "lastName":"Do", "email":"johnny@do.com", "phone": "1234567890", "age": "50", "gender": "male" }

    response = client.get("/users")
    assert response.json()[0] == { "id":1, "firstName":"Johnny", "lastName":"Do", "email":"johnny@do.com", "phone": "1234567890", "age": "50", "gender": "male" }
