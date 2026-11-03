---
name: review-checklist
description: "TQE frontend review checklist: extra checks for React state, TanStack Query, forms, Next.js server/client code, security, accessibility and async UI states. Use when reviewing code or before finishing a feature."
---

# Review Checklist

Every rule in `CLAUDE.md` is a review item; this list adds only the checks it doesn't already state. Skip anything `npm run lint` / `npm run typecheck` catch. Report only real violations.

## React

- Props or state mutated in place (`push`, `sort`, direct assignment) instead of a copy via the setter.
- State update based on previous state without the functional form (`setX(prev => ...)`).
- Array index or other unstable value used as a key for dynamic lists.
- Props added with no real use case.

## Next.js server/client

- Browser-only APIs (`window`, `localStorage`) or client hooks used in a Server Component.
- Runtime data (`cookies()`, `headers()`, `searchParams`) or uncached async work read outside a `<Suspense>` boundary and not cached with `'use cache'` (blocks the prerendered shell).

## TanStack Query

- Query key not built from the module's key factory (`documentKeys.*`), shared with another endpoint (often a copied hook), or missing a param the query depends on.
- Dependent query missing `enabled`.
- Sorting or mapping inside `queryFn` when `select` or a util would do.
- Independent requests awaited one after another instead of in parallel.
- A long-running job (AI assessment) polled without stopping once its status is final.

## Forms

- Missing `defaultValues` for any field.
- Submit not disabled while submitting.
- Server `fieldErrors` not mapped onto fields with `setError`, or a general error not shown.
- Validation duplicated in the component instead of the Zod schema.

## Security

- Tokens or sensitive data in `localStorage`/`sessionStorage`; `dangerouslySetInnerHTML` with unsanitized content.
- Cookie-authenticated mutations sent without the CSRF header.
- File upload missing type/size validation, progress, or cancel.

## Accessibility

- `onClick` on a `div`/`span` instead of a button or link; a button used for navigation or a link used for an action.
- Icon-only buttons or inputs without an accessible label.
- Form inputs without an associated label, or errors not linked to their field.

## UI states

- Async UI missing a loading, error or empty state.
- Large, rarely used component (charts, rich viewers, heavy dialogs) not lazily loaded with `next/dynamic`.
