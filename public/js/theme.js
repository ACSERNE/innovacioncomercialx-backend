const Theme = {
  enabled: localStorage.getItem("darkMode") === "true",

  apply() {
    document.body.classList.toggle("dark", this.enabled);
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("darkMode", this.enabled);
    this.apply();
  }
};

window.addEventListener("DOMContentLoaded", () => Theme.apply());
