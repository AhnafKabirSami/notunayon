# Backend Dependency Overrides

Decision record for the npm `overrides` in `backend/package.json`.
These are **temporary** workarounds. Remove them when the upstream fix lands.

## Why

`npm audit` reported 5 vulnerabilities (3 high, 2 moderate) caused by two
transitive dependencies. The suggested `npm audit fix --force` would downgrade
Prisma to 6.12.0 and nodemon to 3.1.11, which conflicts with project rules
(Prisma 7 is part of the approved stack), so it was not used.

| Package | Vulnerable | Fixed | Advisory | Pulled in by |
|---|---|---|---|---|
| `effect` | <= 3.22.0 (was 3.20.0) | 3.22.1+ | GHSA-7589-6fvf-x4pw (ReDoS in `Schema.TemplateLiteral`) | `prisma` > `@prisma/config@7.10.1` (pinned exactly to 3.20.0) |
| `minimatch` | 7.0.0 - 11.0.0 (was 10.2.6) | 11.0.1+ | GHSA-g3hv-75wg-m249 (DoS via globparts amplification) | `nodemon@3.1.14` (requires `^10.2.1`) |

The `prisma`, `@prisma/config` and `nodemon` findings were only derived from
the two packages above.

## What was changed

```json
"overrides": {
  "@prisma/config": { "effect": "3.22.5" },
  "nodemon": { "minimatch": "^11.0.1" }
}
```

Both overrides are scoped to the single parent package that needs them, so no
other part of the dependency tree is affected. Prisma stays at 7.10.1.

## Resulting versions

- `effect@3.22.5` (stays on the 3.x line; 4.x is a rewrite and was avoided)
- `minimatch@11.0.9` (requires Node `20 || >=22`)
- `prisma`, `@prisma/client`, `@prisma/adapter-mariadb`: 7.10.1 (unchanged)
- `nodemon`: 3.1.14 (unchanged)

The lockfile also gains one new dev-only transitive package,
`@isaacs/nonrecursive-glob-match@1.1.0`, required by `minimatch@11`.

## Compatibility checks performed

- `npm audit`: 0 vulnerabilities
- `npx prisma validate` and `npx prisma generate`: pass with Prisma 7.10.1
- Express server starts; `GET /` and `GET /api/health` return 200
- `nodemon` starts and runs the server
- Verified on Node 22.23 and Node 26.13.1; lockfile is stable under npm 11.20.0

## Risks

- Prisma does not officially test `@prisma/config@7.10.1` against
  `effect@3.22.5`. Re-run `prisma validate` and `prisma generate` whenever
  Prisma is upgraded.
- `minimatch@11` drops Node 18. Backend now needs Node 20+ (dev tooling only).

## When to remove

Delete each override once upstream resolves it, then run `npm install` and
`npm audit`:

- `effect`: when a Prisma release depends on `effect >= 3.22.1`
- `minimatch`: when nodemon depends on `minimatch >= 11.0.1`

## Known unrelated issue (not addressed here)

`backend/src/lib/prisma.js` requires `../generated/prisma/client`, but
`prisma generate` (Prisma 7.10.1, `prisma-client` generator) emits TypeScript
files (`client.ts`), which plain Node `require()` cannot resolve. This behaves
identically on the pre-change lockfile. `server.js` does not import
`lib/prisma.js` yet, so nothing is broken at runtime today. Needs a decision
before the database layer is wired up.
