<div align="center">

# 🧘‍♀️ Mundo Pilates

### Modern Pilates Studio Landing Page with Smart Booking

**Transform bodies. Book classes seamlessly. Grow wellness studios.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

> One-page pilates studio site with a mock booking system. Built as a fast-to-ship, maintainable landing page with no real backend or auth requirements.

## Project structure

```
mundo-pilates/
├── app/                  # Next.js App Router (layouts, pages, API routes)
│   ├── api/
│   │   ├── availability/ # GET availability by date
│   │   └── booking/      # POST mock booking
│   ├── globals.css       # Tailwind base + component classes
│   ├── layout.tsx
│   └── page.tsx          # Single-page composition
├── components/           # UI sections (NavBar, Hero, About, Pilates, Booking, ReservationModal)
├── lib/
│   └── types.ts          # Shared TypeScript interfaces
├── mock-data/
│   └── slots.json        # 8 days × 6 time slots, 6 beds each
├── public/
│   └── images/           # Static images placeholder
└── __tests__/            # Vitest unit tests
```

## Running locally

```bash
npm install
npm run dev       # starts on localhost:3000
npm test          # run unit tests with Vitest
npm run typecheck # TypeScript strict check
```

## Design tokens (Tailwind)

| Token          | Value     | Usage                        |
|----------------|-----------|------------------------------|
| `sage-500`     | `#5a8252` | Primary brand / CTA buttons  |
| `sage-900`     | `#263724` | Footer background            |
| `sage-50–200`  | greens    | Backgrounds, hover states    |
| `cream`        | `#F8F6F1` | Section backgrounds          |
| `font-serif`   | Playfair  | Headings                     |
| `font-sans`    | Inter     | Body text                    |

---

## ADR-001: Next.js 14 App Router for a landing + mock booking page

**Date:** 2026-04-18  
**Status:** Accepted

### Context

Mundo Pilates needs a fast, maintainable one-page site with:
- A hero, about, class schedule, and booking section
- A mock booking flow (no real payments, no auth, no database)
- Potential to graduate to a real backend later without rewriting the frontend

The team is already fluent in React/TypeScript. The deliverable is a landing page, not a full SaaS.

### Decision

Use **Next.js 14 with the App Router** and **Tailwind CSS**.

### Alternatives considered

| Option | Reason ruled out |
|---|---|
| Vite + React SPA | No built-in routing or API layer; adding a booking endpoint later would need a separate server |
| Next.js 14 Pages Router | App Router is the current default; no reason to start on a deprecated path |
| Astro | Better for fully static sites; the booking flow requires client-side interactivity and we want the API routes to co-locate |
| Remix | Overhead for a single-page site; team familiarity favors Next.js |

### Consequences

**Gains:**
- API routes live in `app/api/` — the mock booking endpoint is a real `POST /api/booking` handler. When the studio is ready for a real booking system, the route signature stays the same; only the implementation changes.
- App Router layouts make it trivial to add an admin page or authentication later without restructuring.
- Tailwind co-locates design decisions with the components that use them; no separate CSS files to maintain.
- `next/image` gives automatic WebP conversion and lazy loading for studio photos with zero configuration.

**Trade-offs:**
- App Router RSC mental model has a learning curve (Server vs. Client components). For a mostly-static landing page this rarely matters in practice.
- Tailwind classnames can become verbose on complex components; the `@layer components` pattern in `globals.css` mitigates this for repeated patterns like buttons.

---

## ADR-002: Mock data approach — static JSON served via API route

**Date:** 2026-04-18  
**Status:** Accepted

### Context

There is no real booking database. The product goal is to demo the booking UX and validate the slot/bed model before committing to a backend.

### Decision

Serve availability from `mock-data/slots.json` via `GET /api/availability?date=YYYY-MM-DD`. Bookings are accepted and return a fake `bookingId` (UUID); no state is persisted between requests.

### Consequences

**Gains:**
- Zero infrastructure. The whole app deploys to Vercel with one command.
- The API contract (`api-contract.md`) documents the exact shape that a real backend must implement, so the frontend never needs to change.
- Easy to seed realistic data — JSON is human-editable.

**Trade-offs:**
- Bookings are not actually persisted. The confirmation modal shows a success state, but a refresh loses nothing. This is intentional and must be communicated to stakeholders.
- When a real backend is added, `app/api/availability/route.ts` and `app/api/booking/route.ts` need to be rewritten to call the real service. The public API shape stays identical.
