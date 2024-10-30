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
