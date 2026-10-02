# FreshCart — E-Commerce PWA

A full-featured e-commerce storefront built with Vue 3, consuming a real REST API ([Route Academy E-Commerce API](https://ecommerce.routemisr.com)) — with full offline support and background sync layered on top as a Progressive Web App.

Browse products, manage a cart and wishlist, sign up / log in / reset your password, and check out — all of it still works with no connection, and queued changes sync automatically once you're back online.

## Features

- Product browsing with search, category and brand filtering
- Cart and wishlist with optimistic offline updates
- Authentication (signup, login, password reset) with protected routes
- Checkout — cash on delivery or online payment via a hosted checkout session
- Order history
- Fully responsive, mobile-first UI
- Offline-first: browse previously viewed products/categories and modify your cart/wishlist with no connection — changes sync automatically when you're back online
- Installable as a PWA, with an app-shell architecture for instant navigation

## Tech Stack

**Core**
- Vue 3 (Composition API) + Vite
- Vue Router (history mode, route guards)
- Pinia (state management)

**Styling / UI**
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Flowbite + Flowbite Vue
- Font Awesome
- vue3-carousel, vue3-spinners

**Forms & Validation**
- vee-validate + Yup

**Networking**
- Axios, with request/response interceptors (auth token injection, 401 auto-logout)

**PWA / Offline**
- `vite-plugin-pwa` (custom service worker via the `injectManifest` strategy)
- Workbox — precaching, routing, strategies, background sync, expiration, cacheable response
- Per-route caching strategy tuned to data type: `NetworkFirst` for cart/wishlist/product data (never serve stale price or stock), `StaleWhileRevalidate` for categories/brands, `CacheFirst` for images
- Background Sync API — cart and wishlist mutations made while offline are queued and automatically replayed once connectivity returns
- Auth and checkout are intentionally never cached or queued offline, to avoid stale-session or duplicate-order risk

**Other**
- vue3-toastify (notifications)

## Performance

Audited with Lighthouse (production build, desktop):

| Category | Score |
|---|---|
| Performance | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## What I Built (PWA layer)

- Designed and implemented the full offline architecture from scratch: manifest, custom service worker, and per-endpoint caching strategy based on data sensitivity
- Implemented Background Sync with a custom `onSync` handler and service-worker-to-page messaging, so the UI reflects real sync outcomes instead of assuming success
- Diagnosed and fixed cross-cutting issues this surfaced: components that bypassed the state layer and broke offline handling, false error states caused by conflating "queued" with "failed," and SPA navigation failing offline without an app-shell fallback route

## Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build for production
npm run build

# preview the production build locally
npm run preview
```

No environment variables are required — the app is frontend-only and talks directly to the public Route Academy API.

## Project Structure

```
src/
├── api/            # Axios instance + interceptors
├── assets/         # images, fonts, global CSS
├── components/     # feature-organized components (Cart, Categories, Home, Login, etc.)
├── Composables/     # reusable composition functions
├── icons/          # custom icon components
├── Layout/         # app shell layout
├── pages/          # route-level views
├── router/         # vue-router setup + auth guards
├── stores/         # Pinia stores
├── utils/          # helpers (e.g. image optimization)
├── App.vue
├── main.js
└── sw.js           # custom service worker (Workbox, injectManifest)
```

## Author

**Yusuf Bagha** — Frontend Developer (Vue, React, Next.js)
[GitHub](https://github.com/Yusuf-bagha) · [LinkedIn](https://linkedin.com/in/yusuf-bagha)
