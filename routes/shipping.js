const router = require("express").Router();
const axios = require("axios");
const db = require("../models");
const socket = require("../socket");
const email = require("../services/emailService");
const whatsapp = require("../services/whatsappService");

const BASE_URL = "https://testservices.wschilexpress.com/rating/api/v1.0";
const TRACK_URL = "https://testservices.wschilexpress.com/transport-orders/api/v1.0";

const headers = {
  "Content-Type": "application/json",
  "Ocp-Apim-Subscription-Key": process.env.CHILEXPRESS_API_KEY
};

// ===============================
// 1. COTIZAR
// ===============================
router.post("/quote", async (req, res) => {
  try {
    const response = await axios.post(
      BASE_URL + "/rates/courier",
      req.body,
      { headers }
    );

    res.json({ ok: true, data: response.data.data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ===============================
// 2. CREAR ORDEN DE DESPACHO
// ===============================
router.post("/create", async (req, res) => {
  try {
    const { venta_id, remitente, destinatario, paquete } = req.body;

    const response = await axios.post(
      TRACK_URL + "/transport-orders",
      {
        header: {
          customerCardNumber: remitente.rut,
          countyOfOrigin: remitente.comuna
        },
        detail: [
          {
            countyOfDestination: destinatario.comuna,
            deliveryAddress: destinatario.direccion,
            package: paquete
          }
        ]
      },
      { headers }
    );

    const tracking = response.data.data[0].transportOrderNumber;

    const venta = await db.Venta.findByPk(venta_id, {
      include: [{ model: db.User }]
    });

    await venta.update({ tracking });

    // ===============================
    // NOTIFICACIONES
    // ===============================
    await db.Notification.create({
      user_id: venta.user_id,
      titulo: "Tu pedido fue despachado",
      mensaje: "Tracking: " + tracking
    });

    socket.notify(venta.user_id, {
      titulo: "Pedido despachado",
      mensaje: "Tracking: " + tracking
    });

    email.send(
      venta.User.email,
      "Pedido despachado",
      "<p>Tracking: " + tracking + "</p>"
    );

    whatsapp.send(
      venta.User.telefono,
      "Tu pedido fue despachado. Tracking: " + tracking
    );

    res.json({ ok: true, tracking });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ===============================
// 3. TRACKING
// ===============================
router.get("/track/:codigo", async (req, res) => {
  try {
    const response = await axios.get(
      TRACK_URL + "/transport-orders/" + req.params.codigo,
      { headers }
    );

    res.json({ ok: true, data: response.data.data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
