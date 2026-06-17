const Sounds = {
  alert: new Audio('/sounds/alert.mp3'),
  success: new Audio('/sounds/success.mp3'),
  warning: new Audio('/sounds/warning.mp3'),

  playAlert() {
    this.alert.currentTime = 0;
    this.alert.play();
  },

  playSuccess() {
    this.success.currentTime = 0;
    this.success.play();
  },

  playWarning() {
    this.warning.currentTime = 0;
    this.warning.play();
  }
};
