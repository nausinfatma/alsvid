# Antigravity handoff

## Architecture
Vite + React 18 + TypeScript + React Router 6. Plain CSS tokens in `src/styles/global.css`. All content lives in `src/data/site.ts`; adding a service there automatically adds its route, nav/footer link and card.

## Routes
`/`, `/it-support`, `/it-training`, `/skill-development`, `/bpo`, `/bpo/healthcare`, `/bpo/insurance`, `/bpo/education`, `/about`, `/gallery`, `/contact`, `*` (404).

## Components
Layout (skip link, scroll reset), Header (sticky, BPO dropdown, mobile menu with Escape to close), Footer, PageHero, ServiceCard. Pages: Home, Bpo, ServicePage (shared), About, Gallery, Contact, NotFound.

## Feature status
| Feature | Status |
|---|---|
| Routing, nav, dropdown, mobile menu | Implemented |
| Service pages | Implemented with short copy; Education BPO is draft; others need your final copy |
| Contact form | Client validation, honeypot, double-submit lock implemented. Delivery needs `VITE_CONTACT_ENDPOINT`. No server-side validation or rate limiting yet (do these in the endpoint) |
| Gallery | Grid + empty state. No lightbox (not verified in reference) |
| About | Placeholder |
| Logo, photos, brand colors | Placeholders (text wordmark, original palette) |
| Canonical/OG per page, real sitemap domain | Not done |
| Automated tests (`tests/`) | None yet |

## Next steps
1. Send reference screenshots/menu/form details, then align layout and copy.
2. Add your logo and photos; update `site.ts`.
3. Connect the contact endpoint.
4. Add tests (Vitest + Testing Library, Playwright for routes).
5. Replace `example.com` URLs.
