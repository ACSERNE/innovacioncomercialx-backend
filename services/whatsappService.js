const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

module.exports = {
  async send(to, message) {
    return client.messages.create({
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP,
      to: "whatsapp:" + to,
      body: message
    });
  }
};
