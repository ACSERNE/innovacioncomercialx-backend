class InnovacionX {
  constructor({ token, baseUrl = "https://tu-dominio.com/api/public" }) {
    if (!token) throw new Error("Falta x-public-token");
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-public-token": this.token,
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error || `Error HTTP ${res.status}`);
    }

    return res.json();
  }

  // ============================
  // 📦 Productos públicos
  // ============================
  async getProductos() {
    return this.request("/productos");
  }
}

module.exports = InnovacionX;
