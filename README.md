# beije. Frontend Case Study

A replica of the beije. "Paketini Oluştur" (Custom Delivery) experience, built with Next.js (Pages Router), TypeScript, Material-UI, and Redux Toolkit.

The app is at `/custom-packet`: pick quantities of menstrual / daily-care products, see the optimized package breakdown and total, and apply promo codes (via URL or manual input).

---

## Getting started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000/custom-packet](http://localhost:3000/custom-packet).

---

## Running tests

This project uses Playwright for end-to-end testing:

```bash
pnpm test
```

A few tests will fail on a fresh checkout — that's expected (see Phase A below).

---

## Case study — what we'd like you to do

You have **~50 minutes**. Two phases:

### Phase A — Bug hunt (~20 min)

The app works *mostly*, but there are several bugs across state management, React rendering, pricing logic, and UX. Some are caught by the Playwright suite; others are not.

Your job:

1. Run the app and the test suite.
2. Find and fix as many bugs as you can.
3. Be ready to walk us through *why* each one was a bug — not just what you changed.

We're more interested in how you read code and reason about state than how many bugs you cross off. If you find one and explain it well, that's better than five quick patches with no understanding.

### Phase B — Feature: promo code confirmation step (~30 min)

**Today:** When a user visits `/custom-packet?promoCode=BEIJE20`, the promo code is applied automatically.

**What we want:** Promo codes coming from the URL should **not** be applied automatically. Instead, show a confirmation card displaying the code, and only apply it when the user clicks the "Uygula" button on that card.

Codes entered manually through the input field should keep working as before — apply directly, without the confirmation step. The confirmation card is only for URL-supplied codes.

For the visual design of the confirmation card, see: **[`public/example_design.png`](public/example_design.png)**

Implementation decisions (where the state lives, naming, edge cases, etc.) are yours to make. Don't hesitate to ask if you get stuck.

---

## Project structure

```text
pages/
  custom-packet.tsx       # main page, server-side promo hydration
  _app.tsx                # Redux Provider
components/
  ProductConfigurator/    # product selection (tabs + quantity steppers)
  PackageSummary/         # right-side summary, totals, discount line
  PromoCodeSection/       # promo input + applied state UI
store/
  packageSlice.ts         # selections + applied promo state
  index.ts                # store config
lib/
  mockData.ts             # product catalog (read-only mock)
  promoCodes.ts           # valid promo codes (read-only mock)
  optimize.ts             # package-size optimization
tests/
  custom-packet.spec.ts   # Playwright E2E suite
types/
  index.ts                # Product, PromoCode, etc.
```

Promo codes available for testing: `BEIJE20` (20% off), `FLAT50` (50 TL off), `KARGO` (free shipping).
