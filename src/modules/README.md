# modules/

UI and business logic, one folder per product module (`assessments`, `documents`, `document-review`, `findings`, `reports`, `settings`, `dashboard`). Full rules: `CLAUDE.md`.

```
modules/assessments/
├── AssessmentList.tsx        # screen components at the root
├── AssessmentForm.tsx
├── useAssessmentForm.ts      # optional: only when it simplifies the component
├── schema.ts                 # optional: Zod form schemas
├── constants.ts              # optional: labels, select options
├── types.ts                  # optional: UI-only types (API types live in src/api/)
└── components/               # optional: child components private to this module
```

- Route files in `src/app/` render one screen component from here.
- Data comes from hooks in `src/api/<module>/<module>.queries.ts`. Never call axios here.
- Never import another module's components. Move shared UI to `src/components/`.
- Style with theme classes (`bg-primary`, `text-muted-foreground`, `bg-success-soft`, `text-page-title`…), never hex values.
