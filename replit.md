# FixMeButton

One-stop tech troubleshooting platform — step-by-step guides for non-technical users. Free ad-supported articles + premium interactive guides with voice.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Optional env: `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET`, `AUTH_GITHUB_ID`/`AUTH_GITHUB_SECRET`

## Stack

- **Frontend:** Vite + React (migrated from Next.js), wouter for routing
- **API:** Express 5 (port 5000)
- **DB:** PostgreSQL + Drizzle ORM
- **Auth:** JWT (`jsonwebtoken`), OAuth (Google, GitHub), email verification
- **Payments:** Stripe with webhooks for subscription management
- **Content:** MDX guides
- **Validation:** Zod (`zod/v4`), `drizzle-zod`
- **API codegen:** Orval (from OpenAPI spec)
- **Build:** esbuild (CJS bundle)
- **Package management:** pnpm workspaces, Node.js 24, TypeScript 5.9
- **Hosting:** Replit (migrated from Vercel)
- **Domain:** fixmebutton.com (Cloudflare DNS)

## Where things live

| Path | What |
|------|------|
| `src/` | React frontend (App.tsx, components, pages, styles) |
| `lib/db/src/schema/index.ts` | DB schema — `usersTable` (text UUIDs, `isPremium` boolean) + `progressTable` |
| `lib/api-spec/` | OpenAPI spec — source of truth for API contracts |
| `lib/api-zod/` | Zod schemas generated from API spec |
| `lib/api-client-react/` | React hooks generated from API spec |
| `artifacts/api-server/` | Express API server |
| `artifacts/fixmebutton/` | Main app (Vite + React frontend) |
| `artifacts/fixmebutton-mobile/` | Future mobile app |
| `docs/` | Migration guides, architecture docs |
| `scripts/` | Build/dev utilities |
| `.agents/` | Replit AI metadata and asset tracking |

## Architecture decisions

- **Migrated from Next.js to Vite+React** — Replit doesn't support Next.js SSR natively. wouter replaced Next.js router. Static export pattern.
- **Text UUIDs for user IDs** — `crypto.randomUUID()` via DB schema default. Not auto-increment integers. This is deliberate for security (non-enumerable).
- **JWT over sessions** — Stateless auth with `jsonwebtoken`. Tokens stored in localStorage on the client. `GET /api/auth/me` validates on mount.
- **Email verification required** — Signup creates unverified account. Cannot sign in until email verified. OAuth users auto-verified.
- **Premium is server-enforced** — `PremiumGate` component checks `session.user.id` against DB, not client-side flags. Stripe webhooks set `isPremium`.
- **OAuth conditionally loaded** — Google/GitHub providers only initialize when their env vars are set. Sign-in page conditionally shows buttons.
- **Stripe prices whitelist** — `ALLOWED_PRICES` server-side set. Only 'monthly'/'yearly' keys accepted. Returns 400 for unrecognized priceId.

## Product

**Free tier:** Ad-supported troubleshooting articles with step-by-step instructions. 8 guides published across smartphone, computer, and internet-wifi categories.

**Premium tier ($4.99/mo or $39.99/yr):** Interactive guides with progress tracking, "I'm stuck" branching help, and voice-guided mode. Server-enforced via Stripe subscriptions.

**Content pipeline:** Guides researched from real forum data, written with fix format (ordered 3-5 fixes, easiest to hardest, with Common Mistake paragraphs and WARNINGS for data-destructive steps).

## User preferences

- Reading level target: Grade 6-8. No jargon without explanation.
- Every guide includes "Common Mistake" paragraphs after each fix.
- WARNINGS must be explicit when a fix erases data/settings.
- Image placeholders use `![description](PLACEHOLDER)` format — illustrator agent replaces these.
- Categories: smartphones, computers, tvs-streaming, internet-wifi, email-accounts
- Fix format: "Fix N: [Short action name]" with Settings paths using `>` separators

## Gotchas

- **Replit vs local:** Replit workspace at `/home/runner/workspace` is separate from local clone. Divergent commits happen — always rebase onto `origin/main`.
- **DB IDs are text, not integers:** `usersTable.id` is `text` with `crypto.randomUUID()` default. Code that assumes integer IDs will break.
- **Auth requires JWT_SECRET:** Server fails fast at startup if `JWT_SECRET` env var is missing. Set it even in dev.
- **OAuth silent failure:** If `AUTH_GOOGLE_ID`/`AUTH_GITHUB_ID` are unset, OAuth buttons simply don't appear. No error — this is by design.
- **Stripe webhook needs raw body:** Express must preserve raw body for Stripe signature verification. Check middleware config.
- **pnpm required:** Preinstall script blocks npm/yarn. Only pnpm works.
- **Port 5000 for API:** Vite dev server on 5173, API on 5000. CORS configured for dev origin.

## Pointers

- See `docs/migration-vercel-to-replit.md` for the full migration context
- See `.agents/agent_assets_metadata.toml` for Replit AI asset tracking
- DB schema is the source of truth for data model — read `lib/db/src/schema/index.ts` first
- API contracts live in `lib/api-spec/` — regenerate client code with `pnpm --filter @workspace/api-spec run codegen`
- Hermes Agent skill pipeline: `fixmebutton-scout` → `fixmebutton-author` → `fixmebutton-illustrator` → `fixmebutton-inspector` → `fixmebutton-publisher`
- Hermes AGENTS.md at repo root mirrors this file for Hermes-specific context
