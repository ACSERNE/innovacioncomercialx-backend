const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const enviarCorreoConRecibo = async (to, filePath) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: 'Confirmación de compra',
    text: 'Gracias por tu compra. Adjuntamos tu recibo.',
    attachments: [
      {
        filename: 'recibo.pdf',
        path: filePath
      }
    ]
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { enviarCorreoConRecibo };
