const Sounds = {
  enabled: localStorage.getItem("soundEnabled") === "true",

  alert: new Audio('/sounds/alert.mp3'),
  success: new Audio('/sounds/success.mp3'),
  warning: new Audio('/sounds/warning.mp3'),

  play(sound) {
    if (!this.enabled) return;
    sound.currentTime = 0;
    sound.play();
  },

  playAlert() { this.play(this.alert); },
  playSuccess() { this.play(this.success); },
  playWarning() { this.play(this.warning); },

  updateButton() {
    const btn = document.getElementById("toggleSound");
    if (!btn) return;

    if (this.enabled) {
      btn.innerText = "Sonido: ON";
      btn.style.background = "#0a0";
      btn.style.color = "#fff";
      btn.style.border = "2px solid #0f0";
    } else {
      btn.innerText = "Sonido: OFF";
      btn.style.background = "#600";
      btn.style.color = "#fff";
      btn.style.border = "2px solid #f00";
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("soundEnabled", this.enabled);
    this.updateButton();
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("toggleTheme"); if(themeBtn){ themeBtn.onclick = () => Theme.toggle(); }
  Sounds.updateButton();
  const btn = document.getElementById("toggleSound");
  if (btn) btn.onclick = () => Sounds.toggle();
});
