import requests

class InnovacionX:
    def __init__(self, token, base_url="https://tu-dominio.com/api/public"):
        if not token:
            raise Exception("Falta x-public-token")
        self.token = token
        self.base_url = base_url

    def request(self, endpoint, method="GET", data=None):
        url = f"{self.base_url}{endpoint}"
        headers = {
            "x-public-token": self.token,
            "Content-Type": "application/json"
        }

        response = requests.request(method, url, json=data, headers=headers)

        if not response.ok:
            try:
                error = response.json()
                raise Exception(error.get("error", f"HTTP {response.status_code}"))
            except:
                raise Exception(f"HTTP {response.status_code}")

        return response.json()

    # ============================
    # 📦 Productos públicos
    # ============================
    def get_productos(self):
        return self.request("/productos")
