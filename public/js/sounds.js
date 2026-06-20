const Sounds = {
  enabled: localStorage.getItem("soundEnabled") === "true",

  // Pre-carga profesional
  alert: new Audio('/sounds/alert.mp3'),
  success: new Audio('/sounds/success.mp3'),
  warning: new Audio('/sounds/warning.mp3'),

  // Cooldown anti-spam
  lastPlay: 0,
  cooldown: 300, // ms

  play(sound) {
    if (!this.enabled) return;

    const now = Date.now();
    if (now - this.lastPlay < this.cooldown) return; // evita spam
    this.lastPlay = now;

    sound.currentTime = 0;
    sound.play().catch(() => {
      // Si el navegador bloquea el audio, lo intentamos después del click
      document.body.addEventListener("click", () => sound.play(), { once: true });
    });
  },

  playAlert() { this.play(this.alert); },
  playSuccess() { this.play(this.success); },
  playWarning() { this.play(this.warning); },

  updateButton() {
    const btn = document.getElementById("toggleSound");
    if (!btn) return;
    btn.innerText = this.enabled ? "Sonido: ON" : "Sonido: OFF";
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("soundEnabled", this.enabled);
    this.updateButton();
  }
};

window.addEventListener("DOMContentLoaded", () => {
  Sounds.updateButton();

  const btn = document.getElementById("toggleSound");
  if (btn) btn.onclick = () => Sounds.toggle();

  const themeBtn = document.getElementById("toggleTheme");
  if (themeBtn) themeBtn.onclick = () => Theme.toggle();
});

