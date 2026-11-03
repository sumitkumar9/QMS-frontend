# TQE Frontend

Frontend for **TQE (Top Quality Engineering)**, an AI-assisted compliance assessment QMS (assessments, documents, document review, findings, reports).

- Design: Figma `TQE`, file key `7k4Hd60bFMHyJ9fTocFp9O`. Figma tool calls are limited, so read only the frames you need. Key frames:
  - Login `64:834`
  - Dashboard: internal auditor `1038:29097`, external auditor `1038:29764`
  - Assessments list `99:1205`
  - Create assessment: step 1 `446:2125`, step 2 `107:1305`, upload `113:579`
  - Assessment details `1038:25595`
  - Documents `1322:8262`
  - Document review `1225:10196`
  - Findings: accept `409:2796`, dispute `409:2266`, dismiss `409:3378`
  - Shared components (finding, status, accordion, checkbox) `304:1274`
- Open product and backend decisions are listed in `README.md`.

@AGENTS.md

## Stack and commands

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4 · shadcn/ui (Radix) · Tabler icons.
Runtime: **Node.js 26 LTS** (`nvm use`) and **npm only** (`engine-strict` is on). Never use pnpm or yarn.

| Command             | Use                                                                   |
| ------------------- | --------------------------------------------------------------------- |
| `npm run dev`       | Dev server                                                            |
| `npm run lint`      | ESLint, zero warnings allowed (includes the file/folder naming rules) |
| `npm run typecheck` | `next typegen` + `tsc --noEmit`                                       |
| `npm run format`    | Prettier (sorts Tailwind classes)                                     |
| `npm run build`     | Production build                                                      |

Run `lint`, `typecheck` and `build` before saying a task is done.

## Project structure

```
src/
├── app/          # routes only: thin page/layout files that render one module component
├── modules/      # UI + business logic per module (see Components and modules)
├── api/          # shared data access per backend module: <m>.urls.ts, <m>.api.ts, <m>.queries.ts, <m>.types.ts
├── context/      # app-wide contexts only (session); never server data
├── components/   # shared UI: ui/ (shadcn), auth/, form/, layout/, feedback/
├── lib/          # pure helpers (cn, dates, format, permissions)
├── config/       # site, navigation, env
├── hooks/        # generic hooks only
└── types/        # shared types (Paginated<T>, ListParams)
```

- Dependency direction: `app → modules → api / context / components / lib / config`. `api/`, `components/` and `lib/` never import from `modules/`.
- Modules use API hooks from `api/<module>/*.queries.ts` and never call the HTTP client directly. A module may use another module's API hooks, but never its components.
- API types live only in `api/`. Form value types come from `schema.ts` via `z.infer`.
- URL files hold endpoint paths only. Toast behavior is configured centrally in the query client, not per call.
- Permissions are checked with `can()` / `<Can>` using `resource.action` strings, never role names. The backend is the real enforcement.
- No barrel `index.ts` files. Import with the `@/` alias.

## Components and modules

- A screen component (`DocumentList.tsx`) composes the page from smaller pieces. Split by visual section or responsibility (filters, table, header actions, dialog), not into a file per small JSX element.
- Split a component when it outgrows the size limit in the Development Guidelines, mixes unrelated responsibilities, or one part needs its own state. Child components mostly take props.
- Module layout:
  - Small module (~6 files or fewer): flat.
  - Larger module: screens and their hooks stay at the module root, and child components go in `modules/<module>/components/`.
  - Keep `components/` flat until ~15 files, then group it by screen.
- Extract a logic hook (`useDocumentForm.ts`) only when it makes the component simpler: several queries, derived state and many handlers, or a complex form. A query plus a table stays in the component.
- A module's `components/` is private. When another module needs one of its components, move it to `src/components/`; don't import it across modules.

## Naming (enforced by ESLint)

- Folders: `kebab-case` (`document-review/`). Route folders may use `(group)` and `[param]`.
- Component files: `PascalCase`, matching the export (`DocumentList.tsx` → `export function DocumentList`).
- Hooks: `useX.ts`. Other files: `camelCase` (`queryClient.ts`, `documents.api.ts`).
- Exceptions: Next.js special files (`page.tsx`, `layout.tsx`, …) and shadcn files in `components/ui/` (kebab-case).
- Named exports everywhere, except the default exports Next.js requires.
- Changing only the case of a file name: use `git mv`.

## Styling

- All tokens live in `src/app/globals.css` (Tailwind v4 CSS config). There is no `tailwind.config` and no PostCSS config.
- Use semantic classes only. Never hex values or raw palette colors (`bg-blue-600`) in components:
  - surfaces: `bg-background` (page canvas), `bg-card`, `border-border`
  - brand: `bg-primary`, `text-brand`, `bg-brand-soft`
  - text: `text-foreground`, `text-muted-foreground`
  - status tones: `success | warning | danger | info | highlight | neutral`, each with `-soft` (`text-danger bg-danger-soft`)
  - text styles: `text-page-title`, `text-section-title`, `text-overline`, `text-stat`, `text-caption`
  - header offset: `h-header`, `top-header`
- Domain values map onto the status tones in **one** shared badge component, never inline per screen:
  - Finding severity: Critical `danger`, Major `warning`, Minor and OFI `highlight`, Observation `info`.
  - Compliance: Compliant `success`, Partial `warning`, Non-compliant `danger`, Insufficient evidence `neutral`.
  - Assessment status: Draft `neutral`, In Progress `info`, Completed `success`.
  - Score bar: ≥ 70 `success`, 40–69 `warning`, < 40 `danger`.
- Add UI primitives with `npx shadcn@latest add <name>`. Edit them in `components/ui/` when needed; don't wrap them just to rename them. Re-running `shadcn add` overwrites local edits (e.g. `Button` defaults to `type="button"`), so re-apply them.
- Responsive and mobile-first. Desktop must match Figma (1920px frames). Smaller screens, until mobile designs exist:
  - `lg` (1024–1279): sidebar collapses to icons, and stat rows go to 2 columns.
  - `md` (768–1023): sidebar becomes a drawer, and two-column forms stack.
  - below `md`: tables become card lists, tabs scroll horizontally, and dialogs become full-screen sheets.
- The app is light-only. Don't add `dark:` styles.

## Development Guidelines

"Best practice" / "good quality code" means: clean, readable, efficient code, with no shortcuts, unnecessary complexity or over-engineering.

- Solve only what's asked: no extra features, options or "future-proofing". Don't refactor unrelated code; mention it in the summary instead.
- Match a similar existing file before writing a new one. Ask before adding a dependency.
- Extract a shared hook/util/component only when the same logic appears in 3+ places.
- Keep functions to one job (~30 lines) and components ~150 lines; use early returns, no nested ternaries, no magic values.
- Comments are one line and explain _why_. No commented-out code. Fix errors, don't silence them (`@ts-ignore`, `eslint-disable`).
- Derive values during render. No `useEffect` for data transforms or fetching, no copying query data into `useState`, no unneeded `useMemo`/`useCallback`.
- After a mutation, `invalidateQueries` instead of patching local state.
- Before finishing: re-read your diff, remove dead code, unused imports and debug logs, and list what you changed and deliberately left alone.

## Project-specific rules

- **Server Components by default.** Put `'use client'` on the smallest interactive component, never on a whole page.
- **Dates:**
  - Date-only values (`YYYY-MM-DD`) are never passed through `new Date()` or timezone-converted (it shifts them by a day).
  - Timestamps are UTC ISO strings, shown in the user's timezone. Format all dates through `lib/dates.ts`.
  - Signature and audit timestamps always come from the server.
- **Filter, sort, page and tab state lives in the URL**, so views can be shared and survive a refresh.
- **Secrets never go in `NEXT_PUBLIC_*` env vars.**
