const axios = require("axios");

async function sendVerificationEmail(correo, codigo) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Innovación Comercial X", email: "innovacioncomercialx@gmail.com" },
        to: [{ email: correo }],
        subject: "Código de verificación",
        htmlContent: `<h2>Tu código es: <strong>${codigo}</strong></h2>`
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("📧 Correo enviado:", response.data);
    return true;

  } catch (error) {
    console.error("❌ Error enviando correo (API Brevo):", error.response?.data || error.message);
    throw new Error("Error enviando correo");
  }
}

module.exports = { sendVerificationEmail };
