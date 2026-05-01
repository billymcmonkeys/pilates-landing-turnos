<div align="center">

# 🧘‍♀️ Mundo Pilates

### Modern Pilates Studio Landing Page with Smart Booking

**Transform bodies. Book classes seamlessly. Grow wellness studios.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2-729B1B?style=flat-square&logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://github.com/billymcmonkeys/pilates-landing-turnos) • [Report Bug](https://github.com/billymcmonkeys/pilates-landing-turnos/issues) • [Request Feature](https://github.com/billymcmonkeys/pilates-landing-turnos/issues)

</div>

---

## 📖 About This Project

**Mundo Pilates** is a modern, single-page landing site for pilates studios with an integrated mock booking system. Designed for fast deployment and easy maintenance, this project showcases a complete booking flow without requiring a backend database or authentication system.

Built for pilates studios looking to validate their booking UX before committing to full backend infrastructure. The mock API routes can be easily replaced with real endpoints without changing the frontend code.

### 🎨 Created by MC Monkeys

This project was built by **[MC Monkeys](https://mcmonkeys.up.railway.app/)** — where humans and AI agents collaborate to build real-world digital solutions. MC Monkeys is the team behind **Mission Control for Claude Code**, a system that makes AI agent work visible in real time.

**Mundo Pilates** was developed using this human-AI collaborative approach, combining strategic planning, modern development practices, and operational visibility to deliver a production-ready landing page.

**Learn more:** [https://mcmonkeys.up.railway.app/](https://mcmonkeys.up.railway.app/)

---

## ✨ Features

- 🏠 **Hero Section** — Eye-catching landing with studio imagery and primary CTA
- ℹ️ **About Section** — Studio story, philosophy, and values
- 🧘 **Pilates Info Section** — Benefits and class types offered
- 📅 **Smart Booking System** — Date picker with real-time availability
- 🛏️ **Bed Selection** — Choose from available reformer beds per time slot
- ⏰ **Time Slot Management** — Morning, afternoon, and evening class times
- ✅ **Reservation Modal** — Capture client details (name, email, phone)
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile
- 🎨 **Custom Design Tokens** — Sage green palette with Playfair Display headings
- 🧪 **Unit Tested** — Vitest tests for booking components and modal
- 🚀 **Zero-Config Deployment** — Deploy to Vercel in one command

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **[Next.js 14](https://nextjs.org/)** | React framework with App Router for optimal performance and server-side rendering |
| **[React 18](https://reactjs.org/)** | Modern UI library with hooks and concurrent features |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe development and enhanced developer experience |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first styling with custom design tokens |
| **[Vitest](https://vitest.dev/)** | Fast unit testing with React Testing Library |
| **Mock JSON Data** | Static slot availability served via API routes |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17 or higher)
- **npm** (v9 or higher) or **yarn** / **pnpm**
- **Git** for version control

---

## 🚀 Installation

Follow these steps to get Mundo Pilates running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/billymcmonkeys/pilates-landing-turnos.git
cd pilates-landing-turnos
```

### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
```

If port `3000` is busy, use a custom port:

```bash
npm run dev -- -p 3010
```

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

The page will automatically reload when you make changes to the code.

---

## 📱 How to Use

### Booking a Class

1. **Navigate to Booking Section**
   - Scroll to the booking section or click "Book Now" in the navigation
   - View the current week's availability

2. **Select Date and Time**
   - Choose a date from the calendar picker
   - View available time slots for the selected day
   - Each slot shows available beds (reformers)

3. **Choose a Bed**
   - Click on an available time slot
   - Select from available bed numbers
   - Unavailable slots are grayed out

4. **Complete Reservation**
   - Fill in your name, email, and phone number
   - Review your selected date, time, and bed
   - Click "Confirm Booking" to complete

5. **Confirmation**
   - Receive a confirmation modal with booking ID
   - Note: This is a mock system — bookings are not persisted

---

## 📂 Project Structure

## 📂 Project Structure

```
pilates-landing-turnos/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Single-page composition
│   ├── globals.css               # Tailwind base + custom design tokens
│   └── api/                      # API route handlers
│       ├── availability/         # GET availability by date
│       │   └── route.ts          # Returns available slots from mock data
│       └── booking/              # POST mock booking
│           └── route.ts          # Accepts booking, returns fake ID
├── components/                   # Reusable React components
│   ├── NavBar.tsx                # Main navigation bar
│   ├── HeroSection.tsx           # Landing hero with CTA
│   ├── AboutSection.tsx          # Studio information
│   ├── PilatesSection.tsx        # Benefits and class info
│   ├── BookingSection.tsx        # Booking calendar and slot selection
│   └── ReservationModal.tsx     # Booking form modal
├── lib/                          # Utility functions and types
│   └── types.ts                  # Shared TypeScript interfaces
├── mock-data/                    # Static data files
│   └── slots.json                # 8 days × 6 time slots × 6 beds
├── __tests__/                    # Vitest unit tests
│   ├── BookingSection.test.tsx   # Booking component tests
│   └── ReservationModal.test.tsx # Modal tests
├── public/                       # Static assets
│   ├── images/                   # Image files (placeholder)
│   ├── robots.txt                # SEO crawling rules
│   └── sitemap.xml               # Site structure for SEO
├── docs/                         # Documentation
│   ├── api-contract.md           # API endpoint specifications
│   └── test-plan.md              # Testing strategy
├── .gitignore                    # Git exclusions
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind + design tokens
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Vitest testing setup
├── vitest.setup.ts               # Test environment configuration
└── package.json                  # Dependencies and scripts
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript compiler without emitting files |
| `npm test` | Run Vitest unit tests |
| `npm run test:watch` | Run tests in watch mode |

---

## 🎨 Design Tokens (Tailwind)

| Token          | Value     | Usage                        |
|----------------|-----------|------------------------------|
| `sage-500`     | `#5a8252` | Primary brand / CTA buttons  |
| `sage-600`     | `#4a6f42` | Button hover states          |
| `sage-900`     | `#263724` | Footer background            |
| `sage-50–200`  | greens    | Backgrounds, hover states    |
| `cream`        | `#F8F6F1` | Section backgrounds          |
| `font-serif`   | Playfair Display | Headings              |
| `font-sans`    | Inter     | Body text                    |

---

## 📚 Architecture Decisions

### ADR-001: Next.js 14 App Router for a landing + mock booking page

**Date:** 2026-04-18  
**Status:** Accepted

#### Context

Mundo Pilates needs a fast, maintainable one-page site with:
- A hero, about, class schedule, and booking section
- A mock booking flow (no real payments, no auth, no database)
- Potential to graduate to a real backend later without rewriting the frontend

The team is already fluent in React/TypeScript. The deliverable is a landing page, not a full SaaS.

#### Decision

Use **Next.js 14 with the App Router** and **Tailwind CSS**.

#### Alternatives considered

| Option | Reason ruled out |
|---|---|
| Vite + React SPA | No built-in routing or API layer; adding a booking endpoint later would need a separate server |
| Next.js 14 Pages Router | App Router is the current default; no reason to start on a deprecated path |
| Astro | Better for fully static sites; the booking flow requires client-side interactivity and we want the API routes to co-locate |
| Remix | Overhead for a single-page site; team familiarity favors Next.js |

#### Consequences

**Gains:**
- API routes live in `app/api/` — the mock booking endpoint is a real `POST /api/booking` handler. When the studio is ready for a real booking system, the route signature stays the same; only the implementation changes.
- App Router layouts make it trivial to add an admin page or authentication later without restructuring.
- Tailwind co-locates design decisions with the components that use them; no separate CSS files to maintain.
- `next/image` gives automatic WebP conversion and lazy loading for studio photos with zero configuration.

**Trade-offs:**
- App Router RSC mental model has a learning curve (Server vs. Client components). For a mostly-static landing page this rarely matters in practice.
- Tailwind classnames can become verbose on complex components; the `@layer components` pattern in `globals.css` mitigates this for repeated patterns like buttons.

---

### ADR-002: Mock data approach — static JSON served via API route

**Date:** 2026-04-18  
**Status:** Accepted

#### Context

There is no real booking database. The product goal is to demo the booking UX and validate the slot/bed model before committing to a backend.

#### Decision

Serve availability from `mock-data/slots.json` via `GET /api/availability?date=YYYY-MM-DD`. Bookings are accepted and return a fake `bookingId` (UUID); no state is persisted between requests.

#### Consequences

**Gains:**
- Zero infrastructure. The whole app deploys to Vercel with one command.
- The API contract (`api-contract.md`) documents the exact shape that a real backend must implement, so the frontend never needs to change.
- Easy to seed realistic data — JSON is human-editable.

**Trade-offs:**
- Bookings are not actually persisted. The confirmation modal shows a success state, but a refresh loses nothing. This is intentional and must be communicated to stakeholders.
- When a real backend is added, `app/api/availability/route.ts` and `app/api/booking/route.ts` need to be rewritten to call the real service. The public API shape stays identical.

---

## 🐛 Known Issues & Limitations

### Current Limitations (Mock Booking System)

**⚠️ IMPORTANT: This is a prototype with mock data designed for demonstration purposes. It is NOT production-ready for real bookings.**

#### Booking Limitations
- **No Persistence:** Bookings are not saved — they return a fake `bookingId` but don't persist anywhere
- **No Email Confirmation:** No actual emails are sent to users
- **No Payment Processing:** No integration with payment gateways
- **No Calendar Sync:** Bookings don't sync with Google Calendar, iCal, etc.
- **No Admin Panel:** No way to manage, view, or cancel bookings
- **No Authentication:** Anyone can book without creating an account

#### Technical Limitations
- **Static Mock Data:** Availability is pre-defined in `mock-data/slots.json` (8 days only)
- **No Real-Time Updates:** Slot availability doesn't update in real-time across users
- **No Conflict Prevention:** Multiple users could theoretically book the same slot
- **Client-Side Only:** All booking logic runs on the client (no server validation)

#### Planned Improvements (Future Phases)
These limitations are intentional for the demo and will be addressed in production versions:
- **Phase 1:** Real backend with database (PostgreSQL), booking persistence, admin dashboard
- **Phase 2:** Payment integration (Stripe), email confirmations (SendGrid), user accounts
- **Phase 3:** Real-time availability updates, calendar sync, booking management system

**Use Case:** Mundo Pilates is perfect for:
- Showcasing booking UX to stakeholders
- Testing user flows and design decisions
- Landing page with clear CTA and brand messaging
- Rapid prototyping and client demos

**Not Suitable For:**
- Production deployment with real customer bookings
- Studios with actual class schedules and payment needs
- Multi-location or franchise operations

---

## 🗺️ Roadmap

### Phase 0 (Current) — Landing Page + Mock Booking ✅
- ✅ Single-page responsive design
- ✅ Hero, About, Pilates info sections
- ✅ Mock booking system with date/time/bed selection
- ✅ Reservation modal with form validation
- ✅ Static mock data (8 days, 6 slots/day, 6 beds/slot)
- ✅ Unit tests with Vitest
- ✅ TypeScript strict mode
- ✅ Tailwind custom design tokens

### Phase 1 — Real Booking System
- ⏳ PostgreSQL database with Prisma ORM
- ⏳ Real availability management
- ⏳ Booking persistence and conflict prevention
- ⏳ Admin dashboard for managing bookings
- ⏳ Email confirmations (SendGrid/Resend)
- ⏳ Booking cancellation and rescheduling

### Phase 2 — User Accounts & Payments
- ⏳ User authentication (NextAuth.js)
- ⏳ User profiles and booking history
- ⏳ Stripe payment integration
- ⏳ Class packages and memberships
- ⏳ Refund and credit system

### Phase 3 — Advanced Features
- ⏳ Calendar sync (Google Calendar, iCal)
- ⏳ SMS reminders (Twilio)
- ⏳ Instructor management system
- ⏳ Waitlist functionality
- ⏳ Multi-location support
- ⏳ Analytics dashboard

---

## 🤝 Contributing

We welcome contributions! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code:
- Follows the existing TypeScript and code style
- Passes all linting checks (`npm run lint`)
- Passes all tests (`npm test`)
- Includes appropriate comments and documentation
- Works across all major browsers

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

### Project Creator: MC Monkeys

**MC Monkeys** is a human-AI collaborative system building real-world digital solutions. The team uses Claude Code agents with full operational visibility through Mission Control.

- 🌐 **Website:** [https://mcmonkeys.up.railway.app/](https://mcmonkeys.up.railway.app/)
- 🎯 **Mission Control:** [Live Demo](https://mcmonkeys.up.railway.app/app)
- 📖 **Our Story:** [Read the Story](https://mcmonkeys.up.railway.app/web/story)
- 💼 **GitHub:** [@billymcmonkeys](https://github.com/billymcmonkeys)
- 📧 **Email:** billy.mcmonkeys@gmail.com

### Need Help?

- 🐛 [Report a Bug](https://github.com/billymcmonkeys/pilates-landing-turnos/issues)
- 💡 [Request a Feature](https://github.com/billymcmonkeys/pilates-landing-turnos/issues)
- 💬 [Ask a Question](https://github.com/billymcmonkeys/pilates-landing-turnos/discussions)

---

## 🙏 Acknowledgments

- Built using **human-AI collaborative workflows** with Claude Code agents
- Developed with full operational visibility through **[MC Monkeys Mission Control](https://mcmonkeys.up.railway.app/)**
- Icons by [Lucide React](https://lucide.dev/)
- Built on the amazing [Next.js](https://nextjs.org/) framework
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Testing with [Vitest](https://vitest.dev/)
- Inspired by modern wellness studio websites
- Built with ❤️ for pilates instructors and studio owners

---

<div align="center">

### 🧘‍♀️ Transform your pilates studio! 🧘‍♀️

**[Visit MC Monkeys](https://mcmonkeys.up.railway.app/)** | **[Star this repo ⭐](https://github.com/billymcmonkeys/pilates-landing-turnos)**

Built with human-AI collaboration by [MC Monkeys](https://mcmonkeys.up.railway.app/) 🐵

*Making AI agent work visible. One project at a time.*

</div>
