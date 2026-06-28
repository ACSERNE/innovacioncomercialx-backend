const router = require("express").Router();
const controller = require("../controllers/cartController");

router.get("/", controller.getCart);
router.post("/add", controller.addItem);
router.post("/remove", controller.removeItem);

module.exports = router;

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// CHECKOUT COMPLETO
// ===============================
router.post("/checkout", async (req, res) => {
  try {
    const user_id = req.user?.id || null;
    const session_id = req.headers["x-session-id"];

    const cart = await db.Cart.findOne({
      where: user_id ? { user_id } : { session_id },
      include: [{ model: db.CartItem, include: [db.Product] }]
    });

    if (!cart) return res.json({ ok: false, error: "Carrito vacío" });

    const line_items = cart.CartItems.map(item => ({
      price_data: {
        currency: "clp",
        product_data: {
          name: item.Product.nombre
        },
        unit_amount: Math.round(item.Product.precio * 100)
      },
      quantity: item.cantidad
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: process.env.FRONTEND_URL + "/success",
      cancel_url: process.env.FRONTEND_URL + "/cancel",
      line_items
    });

    res.json({ ok: true, url: session.url });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
