function authHeaders() {
  return {
    "Authorization": "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
  };
}

const API = {
  async getDashboard() {
    const res = await fetch('/api/dashboard', {
      headers: authHeaders()
    });
    return res.json();
  },

  async getTV() {
    const res = await fetch('/api/tv', {
      headers: authHeaders()
    });
    return res.json();
  },

  async getAlertas() {
    const res = await fetch('/api/alertas/no-leidas', {
      headers: authHeaders()
    });
    return res.json();
  },

  async marcarAlertaLeida(id) {
    const res = await fetch('/api/alertas/' + id + '/leida', {
      method: 'PUT',
      headers: authHeaders()
    });
    return res.json();
  }
};
