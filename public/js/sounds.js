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

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("soundEnabled", this.enabled);
    document.getElementById("toggleSound").innerText =
      "Sonido: " + (this.enabled ? "ON" : "OFF");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggleSound");
  if (btn) {
    btn.innerText = "Sonido: " + (Sounds.enabled ? "ON" : "OFF");
    btn.onclick = () => Sounds.toggle();
  }
});
