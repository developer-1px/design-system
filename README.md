# Design MD

Light, compact React starter for Codex-like product demos.

## Design System

- `src/design-system/tokens.css`: color, spacing, radius, typography, layout tokens
- `src/design-system/primitives.css`: shared button, panel, card, badge, row styles
- `src/design-system/primitives.tsx`: reusable React primitives
- `src/data/demo.ts`: page metadata and demo data
- `src/pages/WorkspacePages.tsx`: 10 Codex-like demo pages

## Pages

Workstream, Projects, Changes, Runs, Approvals, Sources, Database, Components, Tokens, Settings.

## Scripts

```sh
pnpm dev
pnpm build
pnpm lint
```

## Design Direction

- White and warm-gray surfaces
- Thin borders, small radius, restrained shadows
- Sidebar, work log, status panel, table, and composer patterns
- No hero treatment or decorative marketing sections
