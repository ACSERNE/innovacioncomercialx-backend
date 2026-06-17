function dibujarBarras(ctx, labels, valores, color = "#00eaff") {
  const max = Math.max(...valores);
  const ancho = ctx.canvas.width;
  const alto = ctx.canvas.height;
  const espacio = ancho / valores.length;

  ctx.clearRect(0, 0, ancho, alto);
  ctx.fillStyle = color;

  valores.forEach((v, i) => {
    const h = (v / max) * (alto - 20);
    ctx.fillRect(i * espacio + 10, alto - h, espacio - 20, h);
  });

  ctx.fillStyle = "#fff";
  ctx.font = "12px Arial";
  labels.forEach((l, i) => {
    ctx.fillText(l, i * espacio + 10, alto - 5);
  });
}

function dibujarLinea(ctx, valores, color = "#00eaff") {
  const max = Math.max(...valores);
  const ancho = ctx.canvas.width;
  const alto = ctx.canvas.height;
  const espacio = ancho / (valores.length - 1);

  ctx.clearRect(0, 0, ancho, alto);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  valores.forEach((v, i) => {
    const y = alto - (v / max) * (alto - 20);
    const x = i * espacio;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
