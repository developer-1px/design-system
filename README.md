# Design MD

First-party design system for `@interactive-os`.

`@interactive-os/aria` owns headless behavior and APG contracts. `design-md`
owns the visual grammar that makes those contracts usable as a polished product
surface: tokens, primitives, semantic-light composition formulas, previews, and
domain proof fixtures.

The role model is a source-owned component registry. The visual target is a
Codex-level 2026 agent workspace: minimal, modern, dense, and quiet.

## Responsibility

- Provide the default `@interactive-os` visual system.
- Keep components and compositions copyable and inspectable.
- Keep design-system names structural and domain-agnostic.
- Use demo domains only to prove that the same composition layer can produce
  different result screens.

## Layers

- `src/design-system/foundation`: tokens and state tone.
- `src/design-system/primitives`: visual primitives and shell surfaces.
- `src/design-system/composition`: structural formulas for section sets, content
  blocks, tables, trees, and page areas.
- `src/design-system/catalog`: previews, inventory, and composition catalog data.
- `src/patterns/apg`: first-party visual adapters for headless APG patterns.
- `src/demo`: domain fixtures that reuse the same structural composition layer.

## Design Direction

- Codex-like minimalism and modern product density.
- Thin borders, small radius, restrained shadows.
- Strong alignment, compact rows, quiet state tone.
- No hero treatment, marketing decoration, or explanatory filler.

## Scripts

```sh
pnpm dev
pnpm build
pnpm lint
```
