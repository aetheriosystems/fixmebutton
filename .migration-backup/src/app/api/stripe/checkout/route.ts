import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

// Server-side allowlist — only these price IDs are valid
const ALLOWED_PRICES: Record<string, string> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || "",
  yearly: process.env.STRIPE_PRICE_YEARLY || "",
};

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const session = await auth();

  let body: { priceId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { priceId } = body;

  // Only allow known price keys — never pass through raw client input
  if (!priceId || !(priceId in ALLOWED_PRICES)) {
    return NextResponse.json(
      { error: "Invalid price selection" },
      { status: 400 }
    );
  }

  const stripePriceId = ALLOWED_PRICES[priceId];
  if (!stripePriceId) {
    return NextResponse.json(
      { error: "Price not configured on server" },
      { status: 500 }
    );
  }

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...(session?.user?.email ? { customer_email: session.user.email } : {}),
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/pricing?checkout=cancelled`,
      metadata: {
        userId: session?.user?.id || session?.user?.email || "guest",
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
