const nodemailer = require('nodemailer');
require('dotenv').config();

// Configura el transporter con tus datos SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  secure: false, // true para puerto 465, false para otros
  auth: {
    user: process.env.EMAIL_USER, // tu email
    pass: process.env.EMAIL_PASS, // tu password o app password
  },
});

// Función para enviar alertas por correo
async function sendAlertaBloqueo(toEmail, message = '') {
  try {
    const mailOptions = {
      from: `"Innovacion ComercialX" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Alerta de Seguridad - Innovacion ComercialX',
      text: message,
      // Puedes usar HTML si quieres:
      // html: `<p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email enviado a ${toEmail}`);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
  }
}

module.exports = { sendAlertaBloqueo };
