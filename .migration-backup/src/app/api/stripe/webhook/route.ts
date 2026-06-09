import { NextResponse } from "next/server";
import { getDb, schema } from "@/db";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ received: true, db: "unavailable" });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const email = session.customer_email;
        if (!userId || userId === "guest") break;

        // Try to find user by ID first, fall back to email
        let user: typeof schema.users.$inferSelect | undefined;
        try {
          [user] = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, userId))
            .limit(1);
        } catch {
          // Invalid UUID — try email lookup
        }

        if (!user && email) {
          [user] = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, email.toLowerCase().trim()))
            .limit(1);
        }

        if (!user) break;

        const subId = session.subscription as string;
        const priceId = session.line_items?.data?.[0]?.price?.id || null;

        if (subId) {
          // Check if subscription already exists
          const [existing] = await db
            .select({ id: schema.subscriptions.id })
            .from(schema.subscriptions)
            .where(eq(schema.subscriptions.stripeSubscriptionId, subId))
            .limit(1);

          if (existing) {
            await db
              .update(schema.subscriptions)
              .set({
                userId: user.id,
                stripeCustomerId: session.customer as string,
                stripePriceId: priceId,
                status: "active",
                updatedAt: new Date(),
              })
              .where(eq(schema.subscriptions.id, existing.id));
          } else {
            await db.insert(schema.subscriptions).values({
              userId: user.id,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: subId,
              stripePriceId: priceId,
              status: "active",
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .update(schema.subscriptions)
          .set({
            status: sub.status,
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            updatedAt: new Date(),
          })
          .where(eq(schema.subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .update(schema.subscriptions)
          .set({ status: "canceled", updatedAt: new Date() })
          .where(eq(schema.subscriptions.stripeSubscriptionId, sub.id));
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
