const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const db = require("../models");
const socket = require("../socket");
const email = require("../services/emailService");
const whatsapp = require("../services/whatsappService");
const express = require("express");

// ===============================
// 1. CREAR CHECKOUT
// ===============================
router.post("/create-checkout", async (req, res) => {
  try {
    const { product_id, cantidad, user_id } = req.body;

    const product = await db.Product.findByPk(product_id, {
      include: [db.ProductImage]
    });

    if (!product) return res.json({ ok: false, error: "Producto no encontrado" });
    if (product.stock < cantidad)
      return res.json({ ok: false, error: "Stock insuficiente" });

    const order = await db.Venta.create({
      user_id,
      product_id,
      cantidad,
      total: product.precio * cantidad,
      estado: "pendiente"
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: process.env.FRONTEND_URL + "/success?order=" + order.id,
      cancel_url: process.env.FRONTEND_URL + "/cancel",
      line_items: [
        {
          price_data: {
            currency: "clp",
            product_data: {
              name: product.nombre,
              images: [product.ProductImages[0]?.url || ""]
            },
            unit_amount: Math.round(product.precio * 100)
          },
          quantity: cantidad
        }
      ],
      metadata: {
        order_id: order.id,
        user_id,
        product_id,
        cantidad
      }
    });

    res.json({ ok: true, url: session.url });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ===============================
// 2. WEBHOOK STRIPE
// ===============================
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const data = event.data.object;

      const order_id = data.metadata.order_id;
      const user_id = data.metadata.user_id;
      const product_id = data.metadata.product_id;
      const cantidad = parseInt(data.metadata.cantidad);

      const venta = await db.Venta.findByPk(order_id, {
        include: [{ model: db.Product }, { model: db.User }]
      });

      await venta.update({ estado: "pagado" });

      const product = await db.Product.findByPk(product_id);
      await product.update({ stock: product.stock - cantidad });

      await db.InventoryLog.create({
        product_id,
        cambio: -cantidad,
        motivo: "Venta Stripe"
      });

      // ===============================
      // NOTIFICACIONES
      // ===============================
      await db.Notification.create({
        user_id,
        titulo: "Pago confirmado",
        mensaje: "Tu compra fue procesada con éxito."
      });

      socket.notify(user_id, {
        titulo: "Pago confirmado",
        mensaje: "Tu compra fue procesada con éxito."
      });

      email.send(
        venta.User.email,
        "Pago confirmado",
        "<h1>Gracias por tu compra</h1>"
      );

      whatsapp.send(
        venta.User.telefono,
        "Tu pago fue confirmado ✔"
      );
    }

    res.json({ received: true });
  }
);

module.exports = router;
