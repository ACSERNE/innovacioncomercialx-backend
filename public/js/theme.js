const Theme = {
  enabled: localStorage.getItem("darkMode") === "true",

  apply() {
    document.body.classList.toggle("dark", this.enabled);
    this.updateButton();
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("darkMode", this.enabled);
    this.apply();
  },

  updateButton() {
    const btn = document.getElementById("toggleTheme");
    if (!btn) return;

    btn.innerText = this.enabled ? "Modo Claro" : "Modo Oscuro";
  }
};

// Aplicar tema ANTES de que el usuario vea la pantalla (sin parpadeo)
document.addEventListener("DOMContentLoaded", () => {
  Theme.apply();
  const btn = document.getElementById("toggleTheme");
  if (btn) btn.onclick = () => Theme.toggle();
});

