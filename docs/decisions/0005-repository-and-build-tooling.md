# 0005. Repository and build tooling

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** The monorepo (see [0001-stack-and-rendering.md](0001-stack-and-rendering.md)) needs a package manager, a module system, a Node baseline, and shared code-quality/type configuration so every contributor gets consistent behavior.
- **Decision:**
  - **Package manager:** pnpm workspaces.
  - **Module system:** ESM everywhere (`"type": "module"`).
  - **Runtime baseline:** Node 22 LTS.
  - **Linting/formatting:** ESLint + Prettier at the repo root, enforcing strict rules including a ban on `any`.
  - **TypeScript config:** a base `tsconfig` at the root, extended per workspace, with `strict: true` (details in [`coding-principles.md`](../coding-principles.md)).
  - **API execution:** `tsx` for dev, `tsc` for typecheck/build.
- **Consequences:**
  - pnpm gives fast installs, a strict/non-flat `node_modules`, and first-class workspace support for the `apps/*` + `packages/*` layout.
  - Shared root configs ensure consistent code style and type-checking across all workspaces; contributors do not each configure their own.
  - ESM + Node 22 LTS is a modern, well-supported baseline aligned with Vite and current tooling.
  - The concrete config files (`.editorconfig`, `.prettierrc`, ESLint config, `tsconfig.base.json`, `pnpm-workspace.yaml`) are created during the init phase, not in this documentation phase.
