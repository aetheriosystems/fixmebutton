import { Router, type IRouter } from "express";
import Stripe from "stripe";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function getStripe(): Stripe | null {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) return null;
  return new Stripe(key);
}

const PRICES: Record<string, string> = {
  monthly: process.env["STRIPE_PRICE_MONTHLY"] || "",
  yearly: process.env["STRIPE_PRICE_YEARLY"] || "",
};

router.post("/stripe/checkout", async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    res.status(503).json({ error: "Stripe is not configured. Set STRIPE_SECRET_KEY to enable payments." });
    return;
  }

  const { priceId, userEmail } = req.body || {};
  const stripePriceId = PRICES[String(priceId)] || String(priceId || "");

  if (!stripePriceId) {
    res.status(400).json({ error: "Invalid price ID" });
    return;
  }

  try {
    const baseUrl = process.env["APP_URL"] || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...(userEmail ? { customer_email: String(userEmail) } : {}),
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?checkout=success`,
      cancel_url: `${baseUrl}/pricing?checkout=cancelled`,
    });
    res.json({ url: session.url });
  } catch (err: unknown) {
    logger.error({ err }, "Stripe checkout error");
    res.status(500).json({ error: "Checkout session creation failed" });
  }
});

export default router;
