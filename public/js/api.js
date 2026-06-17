const API = {
  async getDashboard() {
    const res = await fetch('/api/dashboard');
    return res.json();
  },

  async getTV() {
    const res = await fetch('/api/tv');
    return res.json();
  },

  async getAlertas() {
    const res = await fetch('/api/alertas/no-leidas');
    return res.json();
  },

  async marcarAlertaLeida(id) {
    const res = await fetch('/api/alertas/' + id + '/leida', {
      method: 'PUT'
    });
    return res.json();
  }
};
