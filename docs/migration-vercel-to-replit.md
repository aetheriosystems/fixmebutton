# FixMeButton: Vercel/Next.js → Replit Migration Guide

**Date:** June 2026  
**Migration type:** Full platform port (Next.js App Router + Vercel → Vite + React + Express in Replit pnpm workspace)  
**Final status:** Approved and merged

---

## Overview

The original app was a Next.js 14 App Router application using:
- Next.js server components and API routes
- NextAuth.js for authentication (Google + GitHub OAuth configured but not fully wired)
- Vercel Postgres (`@vercel/postgres`)
- `next-mdx-remote`, `gray-matter` for MDX guide rendering
- Deployed on Vercel

The Replit version is:
- `artifacts/fixmebutton` — Vite + React SPA with wouter routing
- `artifacts/api-server` — Express 5 REST API
- `lib/db` — Shared Drizzle ORM + PostgreSQL schema
- Replit-managed PostgreSQL database

---

## Workspace Structure

```
workspace/
├── artifacts/
│   ├── fixmebutton/          # Vite + React frontend (previewPath: /)
│   │   ├── src/
│   │   │   ├── App.tsx                    # wouter router, all routes
│   │   │   ├── main.tsx                   # AuthProvider wraps App
│   │   │   ├── index.css                  # Tailwind v4 + HSL theme variables
│   │   │   ├── lib/
│   │   │   │   ├── auth-context.tsx       # JWT AuthProvider + useAuth() hook
│   │   │   │   ├── guides-data.ts         # All guide content + helpers
│   │   │   │   └── constants.ts           # SITE_NAME etc.
│   │   │   ├── pages/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── GuidesPage.tsx
│   │   │   │   ├── CategoryPage.tsx
│   │   │   │   ├── GuidePage.tsx          # Inline markdown renderer
│   │   │   │   ├── InteractiveGuidePage.tsx  # PremiumGate + InteractiveGuide
│   │   │   │   ├── AboutPage.tsx
│   │   │   │   ├── PricingPage.tsx
│   │   │   │   ├── SignInPage.tsx         # Uses useAuth().signIn()
│   │   │   │   ├── SignUpPage.tsx         # Uses useAuth().signUp()
│   │   │   │   └── DashboardPage.tsx
│   │   │   └── components/
│   │   │       ├── layout/Header.tsx, Footer.tsx
│   │   │       ├── search/SearchBar.tsx   # fuse.js fuzzy search
│   │   │       ├── guides/
│   │   │       │   ├── StepCard.tsx
│   │   │       │   └── PremiumGate.tsx    # Blocks interactive mode for free users
│   │   │       └── interactive/
│   │   │           ├── InteractiveGuide.tsx  # Step nav + progress persistence
│   │   │           ├── ProgressBar.tsx
│   │   │           ├── BranchingHelp.tsx
│   │   │           └── VoiceGuide.tsx     # Browser SpeechRecognition API
│   │   └── vite.config.ts                # Proxy /api → API server, PORT env
│   └── api-server/
│       ├── src/
│       │   ├── app.ts                     # Express app, raw body for Stripe webhook
│       │   ├── index.ts                   # Entry point, PORT required
│       │   ├── routes/
│       │   │   ├── index.ts               # Registers all routers
│       │   │   ├── auth.ts                # JWT signup/signin/me
│       │   │   ├── progress.ts            # GET/PUT /api/guides/:slug/progress
│       │   │   ├── stripe.ts              # Checkout + webhook
│       │   │   └── health.ts
│       │   └── lib/logger.ts              # pino logger
│       └── package.json
└── lib/
    └── db/
        ├── src/
        │   ├── index.ts                   # Drizzle client + re-exports schema
        │   └── schema/index.ts            # usersTable + progressTable
        └── drizzle.config.ts
```

---

## Route Mapping: Next.js → wouter

| Original Next.js route | New wouter path |
|---|---|
| `/` (app/page.tsx) | `/` → `HomePage` |
| `/guides` | `/guides` → `GuidesPage` |
| `/guides/[category]` | `/guides/:category` → `CategoryPage` |
| `/guides/[category]/[slug]` | `/guides/:category/:slug` → `GuidePage` |
| `/guides/[category]/[slug]/interactive` | `/guides/:category/:slug/interactive` → `InteractiveGuidePage` |
| `/about` | `/about` → `AboutPage` |
| `/pricing` | `/pricing` → `PricingPage` |
| `/auth/signin` | `/auth/signin` → `SignInPage` |
| `/auth/signup` | `/auth/signup` → `SignUpPage` |
| `/dashboard` | `/dashboard` → `DashboardPage` |

---

## API Route Mapping: Next.js → Express

| Original Next.js API route | New Express route |
|---|---|
| `app/api/auth/[...nextauth]/route.ts` | `POST /api/auth/signup`, `POST /api/auth/signin`, `GET /api/auth/me` |
| `app/api/stripe/checkout/route.ts` | `POST /api/stripe/checkout` |
| *(new)* | `POST /api/stripe/webhook` |
| `app/api/guides/[slug]/progress/route.ts` | `GET /api/guides/:slug/progress`, `PUT /api/guides/:slug/progress` |

---

## Authentication System

### Original
- NextAuth.js with Google + GitHub OAuth providers
- Server-side session via `getServerSession()`
- OAuth callback handlers in `/api/auth/[...nextauth]`

### New Implementation
- **JWT-based** (jsonwebtoken, HS256, 7-day expiry)
- **`JWT_SECRET`** stored as a Replit Secret (never in source control)
- Signup and signin both return `{ success, token, user }` — token stored in `localStorage` under key `fmb_token`
- `GET /api/auth/me` — validates token and returns current user from DB
- Frontend `AuthProvider` (`src/lib/auth-context.tsx`) validates stored token on mount, exposes `useAuth()` hook with `{ user, token, loading, signIn, signUp, signOut }`
- OAuth (Google/GitHub) buttons are **explicitly disabled** with "coming soon" label — they are not dead controls

### Key files
- `artifacts/api-server/src/routes/auth.ts`
- `artifacts/fixmebutton/src/lib/auth-context.tsx`

---

## Database Schema

New tables created via `pnpm --filter @workspace/db run push`:

```ts
// lib/db/src/schema/index.ts

usersTable = pgTable("users", {
  id: text("id").primaryKey(),           // "user_<timestamp>" — consider UUID
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  isPremium: boolean("is_premium").default(false),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

progressTable = pgTable("progress", {
  userId: text("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  currentStep: integer("current_step").default(1),
  isCompleted: boolean("is_completed").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

**To push schema changes to dev:** `pnpm --filter @workspace/db run push`  
**To push to production DB:** use the `database` skill with `environment: "production"`

---

## Premium / Stripe Flow

1. User clicks "Go Premium" → `POST /api/stripe/checkout` → returns Stripe Checkout URL
2. User completes payment → Stripe fires `checkout.session.completed` webhook to `POST /api/stripe/webhook`
3. Webhook matches `customer_email` → sets `isPremium = true` and stores `stripeCustomerId`
4. Subscription cancellation (`customer.subscription.deleted`) or payment failure (`invoice.payment_failed`) → sets `isPremium = false`

**Required secrets for Stripe:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_YEARLY`

**Known gap (code review comment):** `POST /api/stripe/checkout` currently falls back to passing raw `priceId` from client if env aliases are missing. Should be restricted to server-side allowlist only.

---

## Progress Persistence

- `InteractiveGuide` loads progress on mount via `GET /api/guides/:slug/progress` (requires `Authorization: Bearer <token>`)
- Each step advance calls `PUT /api/guides/:slug/progress` with `{ currentStep, isCompleted }`
- Backend verifies JWT, extracts `userId` from token claims, upserts `progressTable` row
- Progress survives server restarts (DB-backed, not in-memory)
- If user is not signed in, progress is local-only (no API calls made)

---

## Premium Gate

- `InteractiveGuidePage` checks `user?.isPremium` from `useAuth()`
- Non-premium users see `<PremiumGate>` component (upgrade prompt + "Already premium? Sign in" link)
- Premium users see the full `<InteractiveGuide>` with step navigation, voice, and "I'm Stuck" help

**Note:** Gating is currently client-side only. For strict enforcement, add server-side middleware to the progress API.

---

## Removed Dependencies (from fixmebutton package.json)

| Removed | Reason |
|---|---|
| `next`, `next-auth` | Platform replaced with Vite + Express |
| `next-mdx-remote`, `gray-matter`, `mdx` | MDX replaced with inline string content in `guides-data.ts` |
| `@vercel/postgres` | Replaced with Replit-managed Postgres + Drizzle |
| `drizzle-orm`, `stripe`, `bcryptjs` | Moved to `api-server` package |

**Remaining frontend dependencies:** `react`, `react-dom`, `wouter`, `fuse.js`, `sonner`, `tailwindcss`

---

## Added Dependencies

### `artifacts/api-server`
- `bcryptjs` — password hashing (12 rounds)
- `jsonwebtoken` — JWT signing/verification
- `stripe` — Stripe SDK
- `drizzle-orm`, `@workspace/db` — database access

### `lib/db`
- `drizzle-orm`, `drizzle-kit`, `pg` — ORM + migrations

---

## Environment Variables / Secrets Required

| Key | Type | Where set | Purpose |
|---|---|---|---|
| `JWT_SECRET` | **Secret** | Replit Secrets | JWT signing key (required at startup) |
| `DATABASE_URL` | Secret | Replit Secrets (auto) | Postgres connection string |
| `STRIPE_SECRET_KEY` | Secret | Replit Secrets | Stripe API (optional, 503 if absent) |
| `STRIPE_WEBHOOK_SECRET` | Secret | Replit Secrets | Stripe webhook signature verification |
| `STRIPE_PRICE_MONTHLY` | Secret | Replit Secrets | Stripe price ID for monthly plan |
| `STRIPE_PRICE_YEARLY` | Secret | Replit Secrets | Stripe price ID for yearly plan |
| `PORT` | Env (runtime) | Auto-assigned | API server port |
| `APP_URL` | Env (shared) | Optional | Base URL for Stripe redirect URLs |

**To generate a new JWT_SECRET:** `openssl rand -base64 64`

---

## Vite Proxy Configuration

`artifacts/fixmebutton/vite.config.ts` proxies `/api` requests to the API server during development:

```ts
server: {
  proxy: {
    "/api": {
      target: `http://localhost:${process.env.API_SERVER_PORT || 5000}`,
      changeOrigin: true,
    },
  },
}
```

In production, the reverse proxy handles routing between the two services.

---

## Known Gaps / Follow-up Work

1. **OAuth not implemented** — Google/GitHub buttons are disabled. Wire up via Clerk or Replit Auth skill.
2. **User IDs use `Date.now()`** — Should be replaced with `crypto.randomUUID()` to avoid rare collisions.
3. **Client-side premium gate** — Move entitlement check to API middleware for strict enforcement.
4. **In-memory during dev only** — No seed data; test users created via the signup flow.
5. **No email verification** — Signup immediately logs the user in; add verification step if needed.
6. **Stripe price passthrough** — `POST /api/stripe/checkout` should reject unknown `priceId` values (code review flagged this).

---

## Commands Reference

```bash
# Run frontend dev server
pnpm --filter @workspace/fixmebutton run dev

# Run API server
pnpm --filter @workspace/api-server run dev

# Typecheck all packages
pnpm run typecheck

# Build all packages
pnpm run build

# Push DB schema changes (dev)
pnpm --filter @workspace/db run push

# Build api-server only
pnpm --filter @workspace/api-server run build
```
