# PetCircle

Pet e-commerce shopping cart prototype.

Canonical requirements: [`Requirement.md`](Requirement.md)

Architecture and decisions: [`docs/INDEX.md`](docs/INDEX.md)

## Prerequisites

- Node.js 22 LTS (see [`.nvmrc`](.nvmrc))
- pnpm 9 (see `packageManager` in [`package.json`](package.json))

## Setup

```bash
pnpm install
```

## Frontend (hello world)

Run from the **repository root**:

```bash
pnpm dev:web      # → http://localhost:5173
pnpm build:web    # production build
pnpm test:web     # Vitest smoke test
```

The web app lives in [`apps/web`](apps/web). Copy [`apps/web/.env.example`](apps/web/.env.example) to `apps/web/.env` when connecting to the API.

## Backend (hello world)

For local dev, optionally copy [`apps/api/.env.example`](apps/api/.env.example) to `apps/api/.env` to override defaults. The server runs without `.env` using built-in defaults (`PORT=3000`, `CORS_ALLOWED_ORIGINS=http://localhost:5173`).

```bash
cp apps/api/.env.example apps/api/.env   # optional
```

Run from the **repository root**:

```bash
pnpm dev:api      # → http://localhost:3000
pnpm build:api    # tsc emit to apps/api/dist
pnpm test:api     # Vitest + supertest
```

Manual checks:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/hello
```

The API lives in [`apps/api`](apps/api). Shared REST response types live in [`packages/api-types`](packages/api-types).

## Monorepo layout

```text
apps/
  api/         Node + Express + TypeScript API
  web/         React + Vite + TypeScript SPA
packages/
  api-types/   REST request/response types (shared by FE and BE)
```
