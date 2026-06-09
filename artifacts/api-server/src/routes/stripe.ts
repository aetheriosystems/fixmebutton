import { Router, type IRouter } from "express";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
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

// Stripe webhook: grant/revoke premium based on subscription events
router.post("/stripe/webhook", async (req, res) => {
  const stripe = getStripe();
  const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];

  if (!stripe || !webhookSecret) {
    res.status(503).json({ error: "Stripe webhook not configured" });
    return;
  }

  const sig = req.headers["stripe-signature"];
  if (!sig) {
    res.status(400).json({ error: "Missing stripe-signature header" });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
  } catch (err) {
    logger.error({ err }, "Stripe webhook signature verification failed");
    res.status(400).json({ error: "Invalid webhook signature" });
    return;
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_email || (session.customer_details?.email ?? null);
        const customerId = typeof session.customer === "string" ? session.customer : null;
        if (email) {
          const normalizedEmail = email.toLowerCase().trim();
          await db.update(usersTable)
            .set({ isPremium: true, ...(customerId ? { stripeCustomerId: customerId } : {}) })
            .where(eq(usersTable.email, normalizedEmail));
          logger.info({ email: normalizedEmail }, "Premium activated via checkout");
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = typeof sub.customer === "string" ? sub.customer : null;
        if (customerId) {
          await db.update(usersTable)
            .set({ isPremium: false })
            .where(eq(usersTable.stripeCustomerId, customerId));
          logger.info({ customerId }, "Premium revoked via subscription deletion");
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : null;
        if (customerId) {
          await db.update(usersTable)
            .set({ isPremium: false })
            .where(eq(usersTable.stripeCustomerId, customerId));
          logger.info({ customerId }, "Premium revoked via payment failure");
        }
        break;
      }
    }
    res.json({ received: true });
  } catch (err) {
    logger.error({ err }, "Stripe webhook handler error");
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

export default router;
