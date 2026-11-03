# TQE Frontend

Frontend for **TQE (Top Quality Engineering)**, an AI-assisted compliance assessment platform.

- **Conventions:** [`CLAUDE.md`](./CLAUDE.md) (structure, naming, styling, development guidelines)
- **Design:** [Figma – TQE](https://www.figma.com/design/7k4Hd60bFMHyJ9fTocFp9O/TQE)

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (Radix) · Tabler icons

## Getting started

Requires **Node.js 26 LTS** (see `.nvmrc`; run `nvm use`) and **npm**. `npm install` refuses other Node versions (`engine-strict`).

```bash
npm install
npm run dev        # http://localhost:3000
```

## Docker

Production image built from Next.js `standalone` output (multi-stage, runs as non-root `node`):

```bash
docker compose up --build    # http://localhost:3000
```

Or without Compose: `docker build -t tqe-frontend .` then `docker run -p 3000:3000 tqe-frontend`. Use `npm run dev` for local development.

## Scripts

| Script                        | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| `npm run dev`                 | Start the dev server                                  |
| `npm run build` / `npm start` | Production build / serve                              |
| `npm run lint`                | ESLint (zero warnings allowed, includes naming rules) |
| `npm run typecheck`           | TypeScript check                                      |
| `npm run format`              | Format with Prettier (also sorts Tailwind classes)    |

A pre-commit hook runs ESLint and Prettier on staged files.

## Styling

All theme tokens live in `src/app/globals.css`. Use semantic classes, never hex values:

| Need        | Classes                                                                               |
| ----------- | ------------------------------------------------------------------------------------- |
| Surfaces    | `bg-background` (page canvas), `bg-card`, `border-border`                             |
| Brand       | `bg-primary text-primary-foreground`, `text-brand`, `bg-brand-soft`                   |
| Text        | `text-foreground`, `text-muted-foreground`                                            |
| Status      | `text-success bg-success-soft`, `warning`, `danger`, `info`, `highlight`, `neutral`   |
| Text styles | `text-page-title`, `text-section-title`, `text-overline`, `text-stat`, `text-caption` |
| Layout      | `h-header`, `top-header` (header height)                                              |

Add shadcn components when a screen needs them: `npx shadcn@latest add <component>`.

## Open decisions

- **Authentication:** Azure AD / Entra SSO or username and password? HttpOnly cookies or bearer tokens? Which CSRF mechanism? The login form validates input but isn't connected yet.
- **Backend contract:**
  - list request format (pagination, sort, filters);
  - error shape;
  - upload strategy (through the API or presigned URLs, 50 MB per file);
  - AI job status API;
  - whether the create-assessment wizard can save a Draft on step 1.
- **Design:**
  - mobile and tablet screens;
  - Minor vs OFI severity colors;
  - score thresholds;
  - Vuesax vs Tabler icons;
  - targets for "Forgot password?" and "Contact administrator".
- **Organization selector:** dashboard filter (current plan) or a global tenant switch.
- **Regulatory scope:** whether 21 CFR Part 11 / Annex 11 e-signatures and an audit trail are required. They are mainly a backend responsibility.
