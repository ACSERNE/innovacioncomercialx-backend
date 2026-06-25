from innovacionx import InnovacionX

api = InnovacionX(token="TU_TOKEN_PUBLICO")

productos = api.get_productos()
print("Productos públicos:", productos)
