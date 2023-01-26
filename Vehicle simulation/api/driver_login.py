import requests

jwt = None

def login():
        response = requests.post(url="http://localhost:4321/api/user/login", json={
            'email': 'driver@gmail.com',
            'password': '123'
        })
        if (response.status_code == 200):
            global jwt
            jwt = response.json()["accessToken"]
    
def get_headers():
    headers = {'Content-type': 'application/json'}
    if jwt is not None:
        headers['authorization'] = f'Bearer {jwt}'
    return headers

