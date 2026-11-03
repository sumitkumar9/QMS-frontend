# api/

Shared data-access layer: HTTP calls, React Query hooks and API types, one folder per backend module. Full rules: `CLAUDE.md`.

```
api/documents/
├── documents.urls.ts      # always: endpoint paths only
├── documents.api.ts       # always: typed request functions
├── documents.queries.ts   # React Query hooks + documentKeys (invalidation lives here)
└── documents.types.ts     # request/response types (when more than a few lines)
```

The shared HTTP client (`client.ts`, `errors.ts`) is added together with the first API integration.
