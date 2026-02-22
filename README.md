# SwapRent MVP

SwapRent is a local marketplace to rent or trade unused items.

## Stack
- Next.js 14 App Router + TypeScript
- TailwindCSS with reusable shadcn-style UI primitives
- Prisma ORM + PostgreSQL
- NextAuth scaffold (Email magic link + optional Google)
- Zod validation in API routes

## Getting Started
1. Copy env values:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Prisma setup:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   npm run prisma:seed
   ```
4. Start app:
   ```bash
   npm run dev
   ```

## Implemented in this iteration
- App scaffold and base design system.
- Prisma schema covering users, items, requests, conversations, reviews, reports.
- Browse page with search/filter/sort.
- Item details page with owner, availability, and similar items.
- API routes for item search, reviews, and local image uploads.
- Filter unit test with Vitest.
- DB query layer with fallback mock data for local-first development.

## Seed users
- `alice@swaprent.dev`
- `ben@swaprent.dev`

## Next implementation steps
- Multi-step create listing flow.
- Dashboard requests and messaging UX.
- Stripe checkout or paid simulation toggle for rental completion.
- Rate-limiting guards for messages + requests.
