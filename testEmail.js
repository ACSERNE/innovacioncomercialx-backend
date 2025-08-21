require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true para 465, false para 587 u otro puerto
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Innovacion ComercialX" <${process.env.EMAIL_USER}>`,
      to: 'innovacioncomercialx@gmail.com', // Cambia esto por tu correo personal para probar
      subject: 'Prueba de email desde Node.js',
      text: 'Este es un mensaje de prueba para verificar la configuración de Nodemailer.',
    });

    console.log('✅ Email enviado:', info.messageId);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
  }
}

testEmail();
