const Anim = {
  fadeIn(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("fade");
    setTimeout(() => el.classList.add("show"), 50);
  },

  animateKPI(id, newValue) {
    const el = document.getElementById(id);
    if (!el) return;

    const oldValue = parseFloat(el.innerText) || 0;
    const diff = newValue - oldValue;
    const steps = 20;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      el.innerText = Math.round(oldValue + diff * (step / steps));
      if (step >= steps) clearInterval(interval);
    }, 20);

    el.classList.add("updated");
    setTimeout(() => el.classList.remove("updated"), 300);
  }
};
