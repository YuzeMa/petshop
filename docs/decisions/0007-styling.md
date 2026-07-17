# 0007. Styling

- **Status:** accepted
- **Date:** 2026-07-17
- **Context:** The React SPA needs a styling approach. Options considered: plain global CSS, CSS Modules, Tailwind CSS, and component libraries.
- **Decision:** Use **CSS Modules**.
- **Consequences:**
  - Locally scoped class names avoid global-CSS collisions without extra runtime cost.
  - No additional dependencies or build plugins beyond what Vite supports out of the box.
  - Keeps the prototype's styling footprint small and framework-agnostic; a utility framework or component library can be adopted later if the UI grows.
