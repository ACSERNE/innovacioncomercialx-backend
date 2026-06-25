const nodemailer = require('nodemailer');

class EmailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async enviarCorreo(to, subject, html) {
    return await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    });
  }

  async enviarAlertaCritica(alerta) {
    const html = `
      <h2>⚠ Alerta Crítica</h2>
      <p><strong>Tipo:</strong> ${alerta.tipo}</p>
      <p><strong>Mensaje:</strong> ${alerta.mensaje}</p>
      <p><strong>Fecha:</strong> ${alerta.createdAt}</p>
    `;

    return await this.enviarCorreo(
      process.env.EMAIL_ADMIN,
      `⚠ Alerta crítica: ${alerta.tipo}`,
      html
    );
  }

  async enviarReporteDiario(resumen) {
    const html = `
      <h2>📊 Reporte Diario</h2>
      <p><strong>Ventas hoy:</strong> $${resumen.ventasHoy}</p>
      <p><strong>Ingresos:</strong> $${resumen.ingresosHoy}</p>
      <p><strong>Egresos:</strong> $${resumen.egresosHoy}</p>
      <p><strong>Saldo:</strong> $${resumen.saldoHoy}</p>
      <p><strong>Stock bajo:</strong> ${resumen.stockBajo}</p>
      <p><strong>Productos vencidos:</strong> ${resumen.vencidos}</p>
      <p><strong>Alertas activas:</strong> ${resumen.alertasActivas}</p>
    `;

    return await this.enviarCorreo(
      process.env.EMAIL_ADMIN,
      "📊 Reporte Diario — Innovación Comercial X",
      html
    );
  }
}

module.exports = new EmailService();
