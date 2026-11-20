# Notunayon

Notunayon is a static React prototype for discovering and exchanging agricultural by-products in Bangladesh. It uses illustrative marketplace data and local browser state to demonstrate supplier discovery, offers, and buyer, seller, and admin workflows.

## Run locally

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run build
npm run lint
```

## Prototype routes

- `/` — Public homepage and sourcing enquiry.
- `/marketplace` and `/marketplace/:id` — Search, filter, and inspect sample materials.
- `/requests`, `/how-it-works`, `/about`, `/contact`, and `/logistics` — Public information pages.
- `/login` and `/register` — Local-only account demonstrations.
- `/buyer-dashboard/*`, `/seller-dashboard/*`, and `/admin/*` — Demonstration workspaces.

No backend, database, real authentication, payment processing, or AI service is connected. Listing, offer, and profile interactions are mock-only; sample prices, supply, statistics, and match scores are not verified real-world data.
