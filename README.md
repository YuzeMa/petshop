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

```bash
pnpm dev:web      # → http://localhost:5173
pnpm build:web    # production build
pnpm test:web     # Vitest smoke test
```

The web app lives in [`apps/web`](apps/web). Copy [`apps/web/.env.example`](apps/web/.env.example) to `apps/web/.env` when the API is available.

## Monorepo layout

```text
apps/
  web/         React + Vite + TypeScript SPA
packages/
  contracts/   REST API contract (coming soon)
```
