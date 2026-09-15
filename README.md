# LUMORA — Premium Photoshoot & Photography Marketplace

**Capture Moments. Create Stories.**

A large, production-quality, **frontend-only** photography marketplace built with React. LUMORA combines a luxury photography studio, a photoshoot booking platform, a photographer portfolio network, and a digital/print photo store into a single cohesive product.

## Created By

**Parikshit Jadhav**

---

## Project Description

LUMORA lets people discover photographers, browse and book photoshoot packages, explore a curated photography gallery, and purchase digital photographs or physical prints — all from one premium, editorial-styled interface. Every interaction (search, filters, cart, wishlist, booking, checkout, reviews, admin CRUD) is fully functional and backed by `localStorage`, with **no backend, database, or server of any kind**.

---

## Features

**Discovery**
- Cinematic homepage with rotating hero, featured categories, featured photoshoots, photographer spotlight, trending gallery, "How LUMORA Works", a premium experience section, testimonials, and a newsletter signup
- Global search overlay across photographers, photoshoots, gallery, and store products
- Explore page with search, category/style/location/price/rating filters, sorting, grid/list toggle, and pagination
- Photoshoot marketplace organised by category → subcategory tree

**Photoshoots & Photographers**
- Detailed photoshoot pages with image gallery, included/excluded lists, cancellation policy, FAQ accordion, and reviews
- Live-pricing booking widget: date, time, people, location, add-ons
- Photographer marketplace with filters, and full photographer profile pages (bio, styles, equipment, portfolio lightbox, packages, reviews, locations served)
- Compare up to 3 photoshoot packages side by side

**Store**
- Digital photo store with license selection (Personal / Commercial / Editorial)
- Print store with size, frame, material, and quantity customisation and live price calculation
- Product detail pages, wishlist, and cart integration throughout

**Cart, Checkout & Bookings**
- Full cart: quantities, save-for-later, coupon codes (`LUMORA10`, `FIRSTSHOOT`, `WELCOME5`), tax/delivery calculation
- 5-step checkout: Customer Info → Delivery/Shoot Info → Order Summary → Payment (simulated) → Confirmation with generated order ID
- Bookings list (Upcoming / Completed / Cancelled) and a detailed booking page with reschedule, cancel, invoice (print), contact, and review submission

**Account**
- Simulated authentication (login, register, forgot password) with a demo account
- User dashboard: overview stats, profile editing, orders, and submitted reviews
- Wishlist, personal Collections (create/rename/delete, add/remove items), and a notification center
- Settings: theme toggle (light/dark), notification preferences, simulated password change, account deletion

**Content**
- Immersive masonry Gallery with category filters, like/save, and a fullscreen lightbox (zoom, next/prev, share)
- Inspiration magazine with articles and a reading page
- Location Explorer with a mock interactive map (pins, no external map API) and location detail cards
- About and Contact pages with a working contact form, FAQ, and support info

**Admin**
- Frontend-only Admin Dashboard: overview stats + revenue chart, and CRUD-style management (add/delete, persisted to `localStorage`) for photographers, photoshoots, orders, bookings (status updates), reviews (approve), gallery, products, categories, coupons, notifications, and settings

**Platform-wide**
- Fully responsive (desktop, laptop, tablet, mobile) with a dedicated mobile navigation drawer
- Skeleton loaders, empty states, and a custom 404 page
- Tasteful animations and transitions throughout
- Centralised image configuration (`src/data/images.js`)
- Accessible semantic markup, labelled inputs, keyboard-friendly focus states

---

## Technology Stack

- **React 19** with **Vite** (rollup/rolldown build)
- **JavaScript (JSX)** — no TypeScript
- **React Router v7** for client-side routing
- **Context API** for global state (Auth, Cart, Wishlist, Booking, Notifications, Theme, Collections, Compare)
- **localStorage** for persistence (no backend)
- **CSS** — hand-written design system using CSS custom properties, no framework
- **lucide-react** for icons
- **Google Fonts**: Fraunces (display serif) + Inter (body sans-serif)

---

## Project Structure

```
lumora/
├── index.html
├── src/
│   ├── main.jsx               # Entry point, wraps App in all providers + router
│   ├── App.jsx                # Route definitions (lazy-loaded pages)
│   ├── index.css              # Imports every stylesheet in src/styles
│   ├── components/            # Reusable UI building blocks
│   ├── pages/                 # One file per route
│   ├── context/                # AuthContext, CartContext, WishlistContext,
│   │                             BookingContext, NotificationContext, ThemeContext,
│   │                             CollectionsContext, CompareContext
│   ├── data/                  # Mock data: photographers, photoshoots, products,
│   │                             gallery, categories, reviews, locations, articles,
│   │                             images (centralised image config)
│   ├── utils/                 # storage.js, price.js, validation.js, formatters.js
│   └── styles/                 # tokens.css (design system), base.css, and one
│                                 stylesheet per feature area (navbar, cards, etc.)
```

---

## Installation

```bash
npm install
npm run dev
```

The app runs entirely in the browser — no environment variables, API keys, or servers are required.

## Available Scripts

| Script            | Description                                  |
|--------------------|-----------------------------------------------|
| `npm run dev`      | Start the Vite development server             |
| `npm run build`    | Production build to `dist/`                   |
| `npm run preview`  | Preview the production build locally          |
| `npm run lint`     | Run `oxlint` across the project                |

---

## Frontend Architecture

- **Components** are presentational and reusable (cards, modals, rating, pagination, filter panel, booking widget, etc.) and take data via props.
- **Pages** compose components and data, and own page-level state (filters, tabs, form state).
- **Context** providers hold cross-page state that needs to persist and be shared (auth session, cart, wishlist, bookings/orders, notifications, theme, collections, compare list).
- **Data** files are the mock "database" — plain JS modules exporting arrays/objects, with a single centralised `images.js` so imagery can be swapped without touching components.
- **Utils** hold pure functions: currency/date formatting, price calculations (booking totals, print pricing, cart totals, coupons), and form validation.
- **Routing** is defined once in `App.jsx` using `React.lazy` + `Suspense` for code-splitting, with `ProtectedRoute` guarding authenticated/admin-only pages.

## State Management

Local component state (`useState`) handles UI-only concerns (open/closed modals, form inputs, active tab). Anything that needs to be shared across pages or survive a refresh lives in a Context provider, which reads its initial value from `localStorage` on mount and writes back on every change through a small `storage.js` helper (`loadJSON` / `saveJSON` / `STORAGE_KEYS`).

## Authentication

Authentication is **entirely simulated on the frontend** — there is no server, token, or real password check. Registering or logging in stores a plain profile object in `localStorage`. A demo account is available everywhere the login form appears:

```
Email:    demo@lumora.com
Password: demo123
```

Logging in with `admin@lumora.com` (any password of 6+ characters) additionally unlocks the `/admin` dashboard.

## Booking System

Selecting a date, time, people, location, and add-ons on a photoshoot page calculates a live total (`src/utils/price.js`). "Book Now" adds the configured session to the cart and proceeds to checkout; "Add to Cart" keeps browsing. Completing checkout converts cart items of type `photoshoot` into booking records (status `Pending`) stored via `BookingContext`, viewable and manageable from **My Bookings**.

## Cart System

The cart (`CartContext`) holds photoshoot bookings, digital photo licenses, and print configurations side by side. It supports quantity changes, save-for-later, coupon codes, and computes subtotal, discount, delivery (free above ₹4,999), and a simulated 5% tax.

## Wishlist

Any photoshoot, photographer, digital photo, or print can be saved to a single wishlist (`WishlistContext`), grouped by type on the Wishlist page, with one-click move-to-cart.

## Admin Panel

`/admin` (requires the admin demo login above) provides an overview with stat cards and a revenue chart, plus manage-style tables for photographers, users, photoshoots, orders, bookings (status changes), reviews (approve), gallery, products, categories, and coupons. Additions/deletions persist to `localStorage` per section.

## Responsive Design

Every page uses fluid, mobile-first CSS (no fixed desktop-only layouts). Below ~1180px the navigation collapses into a slide-in drawer; below ~940px filter panels become slide-in overlays; grids reflow from 3–4 columns down to 1 column on small screens.

## Image System

All imagery is referenced from `src/data/images.js`, organised by feature (categories, photographers, gallery, products, prints, locations, articles). Components and pages never hardcode image URLs — they import from this file, so artwork can be replaced globally in one place.

## Security Note

This is a **frontend-only demo project**. There is no real backend, no real authentication, no real payment processing, and no real data persistence beyond the current browser's `localStorage`. Do not enter real payment details anywhere in this app (none are ever requested).

## Future Improvements

- Node.js + Express API with a real database (e.g. MongoDB or PostgreSQL)
- Real authentication (hashed passwords, sessions/JWTs, email verification)
- A real payment gateway integration (Razorpay/Stripe)
- Cloud storage for photographer portfolios and uploads (e.g. S3/Cloudinary)
- Real-time notifications (WebSockets) for booking status changes
- A photographer-facing availability/calendar API
- A dedicated booking/scheduling microservice

---

## Credits

**Created by Parikshit Jadhav**
#   l u m o r a  
 #   l u m o r a  
 