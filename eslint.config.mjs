import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import checkFile from "eslint-plugin-check-file"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // Naming conventions (CLAUDE.md "Naming")
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      // Folders: kebab-case; route folders may use (group), [param], @slot, _private
      "check-file/folder-naming-convention": [
        "error",
        { "src/app/**/": "NEXT_JS_APP_ROUTER_CASE", "src/!(app)/**/": "KEBAB_CASE" },
      ],
    },
  },
  {
    // Components: PascalCase (Next.js special files and shadcn ui/ are exempt)
    files: ["src/**/*.tsx"],
    ignores: ["src/app/**", "src/components/ui/**"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/!(use)*.tsx": "PASCAL_CASE", "**/use*.tsx": "CAMEL_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    // Hooks, utils, config, API files: camelCase (documents.api.ts → "documents")
    files: ["src/**/*.ts"],
    ignores: ["src/app/**", "src/**/*.d.ts"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.ts": "CAMEL_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    // shadcn primitives keep their generated kebab-case names
    files: ["src/components/ui/**/*.tsx"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": ["error", { "**/*.tsx": "KEBAB_CASE" }],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])

export default eslintConfig
