async function main() {
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Puedes cambiar por 'Outlook', 'Yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un correo al usuario con un mensaje personalizado.
 * @param {string} correoDestino - Dirección de correo del usuario.
 * @param {string} mensajeTexto - Contenido del correo a enviar.
 */
const sendAlertaBloqueo = async (correoDestino, mensajeTexto = 'Detectamos intentos fallidos en tu cuenta. Si no fuiste tú, considera cambiar tu contraseña.') => {
  try {
    await transporter.sendMail({
      from: `"Alerta de Seguridad" <${process.env.EMAIL_USER}>`,
      to: correoDestino,
      subject: '📢 Notificación de cuenta',
      text: mensajeTexto,
    });
    console.log(`📬 Correo enviado a ${correoDestino}`);
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
  }
};

module.exports = { sendAlertaBloqueo };}
main()
