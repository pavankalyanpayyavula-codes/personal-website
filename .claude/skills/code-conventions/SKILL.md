---
name: code-conventions
description: Naming, formatting, TypeScript, file layout, testing and commit conventions for this personal-website repo (React 18 + Vite + TypeScript, deployed on Vercel). Use before writing, renaming or reviewing any code here, adding a page, component, hook, test or API route, editing site content, or when asked how something "should" be named or formatted in this project.
---

# Code conventions: personal-website

These rules describe how the code in this repo is written today. Most are enforced by tools,
so `npm run check` is the source of truth. If this file and a tool disagree, the tool wins:
fix this file.

| Concern     | Tool                           | Config                    |
| ----------- | ------------------------------ | ------------------------- |
| Types       | TypeScript 5 (strict)          | `tsconfig.json`           |
| Naming/bugs | ESLint 9 + typescript-eslint   | `eslint.config.js`        |
| Formatting  | Prettier 3                     | `.prettierrc.json`        |
| Editors     | EditorConfig                   | `.editorconfig`           |
| Tests       | Vitest + React Testing Library | `vite.config.ts` (`test`) |

## Before you finish any change

```bash
npm run check   # typecheck → lint → format:check → test, stops at the first failure
npm run build   # what Vercel builds
```

`npm run format` fixes formatting. Vercel runs the tests before every deploy
(`buildCommand` in `vercel.json`), so a red test blocks the release.

## Naming

### Files and folders

| What                 | Convention                               | Example                           |
| -------------------- | ---------------------------------------- | --------------------------------- |
| React component      | `PascalCase.tsx`, one component per file | `Navbar.tsx`, `SocialIcon.tsx`    |
| Page (one per route) | `PascalCase` + `Page` suffix             | `CareerPage.tsx`, `AboutPage.tsx` |
| Hook                 | `useCamelCase.ts`                        | `useDocumentTitle.ts`             |
| Other TS modules     | `camelCase.ts`                           | `localApi.ts`, `content.ts`       |
| Folder barrel / data | `index.ts`                               | `src/data/index.ts`               |
| Stylesheet           | Same name as its component/page          | `CareerPage.css` for `CareerPage` |
| Test                 | Same name + `.test.ts(x)`, beside source | `Navbar.test.tsx`                 |
| Vercel API route     | `kebab-case.ts` (becomes the URL)        | `api/contact.ts` → `/api/contact` |
| Folders              | lowercase                                | `components`, `pages`, `hooks`    |

### Identifiers

| What                          | Convention                                                                            | Example                                          |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Components                    | `PascalCase`                                                                          | `const FadeIn = (...) => ...`                    |
| Props interface               | `<Component>Props`                                                                    | `NavbarProps`, `FadeInProps`                     |
| Types and interfaces          | `PascalCase`, **no** `I` prefix                                                       | `Experience`, `SubmitStatus`                     |
| Variables, functions, params  | `camelCase`                                                                           | `categoryName`, `handleSubmit`                   |
| Module-level constants        | `UPPER_SNAKE_CASE`                                                                    | `EMAIL_RE`, `EMPTY_FORM`, `LIMITS`               |
| Booleans                      | Question prefix: `is`/`has`/`should`/`can`/`did`/`will` (`all`/`some` for aggregates) | `isOpen`, `isLive`, `isSending`, `allComingSoon` |
| Event handlers (in component) | `handle<Event>`                                                                       | `handleChange`, `handleSubmit`                   |
| Callback props                | `on<Event>`                                                                           | `onSelect`                                       |
| Unused params                 | Prefix `_`                                                                            | `(_req, res) => ...`                             |
| Union string literals         | lowercase words                                                                       | `'idle' \| 'sending' \| 'success'`               |

ESLint's `@typescript-eslint/naming-convention` enforces the type, variable, boolean, function
and parameter rules above.

### CSS classes

- `kebab-case`, scoped by a block name: `.role-title`, `.post-meta`, `.contact-form-card`.
- State classes start with `is-`: `.is-active`, `.is-open`, `.is-raised`, `.is-upcoming`.
- Each page's root element carries `page container <name>` (e.g. `page container career`).
- Colours, fonts, spacing and radii come from the CSS custom properties in `src/index.css`
  (`--ink`, `--accent`, `--r-md`, ...). Don't hard-code new colours; add a token there.
  Every token needs a dark-mode value in the `prefers-color-scheme: dark` block.

## Formatting

Prettier owns formatting; never hand-format against it. Settings (`.prettierrc.json`):

- 2-space indent, LF line endings, final newline.
- Single quotes in TS/TSX (`'text'`); JSX attributes use double quotes (`className="x"`).
- Semicolons on.
- Trailing commas everywhere they're allowed.
- 100-character line width.
- Arrow functions always keep parentheses: `(x) => x`.

Things Prettier doesn't decide:

- **Imports**, in this order, separated by nothing (Prettier keeps them as written):
  1. external packages (`react`, `react-router-dom`, `framer-motion`),
  2. type-only imports from external packages (`import type { ReactNode } from 'react'`),
  3. internal modules (`../components/...`, `../hooks/...`, `../data`),
  4. internal types (`import type { ... } from '../types/content'`),
  5. the stylesheet last (`import '../styles/CareerPage.css'`).
- Use `import type` for anything only used as a type (ESLint enforces this).
- Comments explain **why**, not what. Use `/** ... */` on exported functions, types and
  non-obvious fields; `//` for inline notes.
- Write `'` as `&apos;` inside JSX text (`Let&apos;s talk`).

## TypeScript

- `strict` is on, plus `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`.
- No `any` in source code. Use `unknown` and narrow it (see `catch (error)` in `api/contact.ts`).
  Tests may use `any` for loose mocks.
- Prefer `interface` for object shapes and props, `type` for unions and aliases.
- Content shapes live in `src/types/content.ts`; data in `src/data/index.ts` is annotated with
  them (`export const career: CareerContent = {...}`).
- Components are arrow functions with a typed props object and a default export:

  ```tsx
  interface NavbarProps {
    links?: NavLink[];
  }

  const Navbar = ({ links = [] }: NavbarProps) => { ... };

  export default Navbar;
  ```

- Let TypeScript infer return types of components; annotate return types of exported
  non-component functions (`readDotEnv(): Record<string, string>`).
- Handle `null` explicitly instead of using `!`. Throw a clear error when something must exist
  (`if (!rootElement) throw new Error('Missing <div id="root">')`).

## Where things go

```
api/                Vercel serverless functions. Every file here is deployed as a route,
                    so never put tests or helpers in this folder.
dev/                Dev-server-only code (runs api/ routes inside `npm run dev`).
public/             Static files served as-is (resume PDF, favicon, share image).
src/components/     Reusable UI used by more than one page.
src/data/index.ts   ALL site text and content. Edit content here, not in components.
src/hooks/          Custom hooks (`use*`).
src/pages/          One component per route, wired up in src/App.tsx.
src/styles/         One stylesheet per page/component; design tokens in src/index.css.
src/test/           Test setup and shared helpers (renderAt, getByClass).
src/types/          Shared TypeScript types.
tests/              Tests for api/ and dev/ (kept out of api/ on purpose).
```

### Adding a page

1. `src/pages/FooPage.tsx` + `src/styles/FooPage.css`; call `useDocumentTitle('Foo')`.
2. Add the route in `src/App.tsx` inside the `<Layout />` route.
3. Add `{ name: 'Foo', path: '/foo' }` to `navigation` in `src/data/index.ts`.
4. Put its text in `src/data/index.ts` with a type in `src/types/content.ts`.
5. Write `src/pages/FooPage.test.tsx`, and add the route to `src/App.test.tsx`.

## Tests

- Every source file has a test beside it, except `api/` and `dev/`, whose tests live in `tests/`.
- Test what a visitor sees and does: query by role, label or text
  (`getByRole('link', { name: /download résumé/i })`), not by CSS class. `getByClass` in
  `src/test/utils.tsx` is only for layout containers with no accessible role.
- Render pages with `renderAt(<Page />, { route })` from `src/test/utils.tsx`.
- Use `userEvent` for interactions and `vi.stubGlobal('fetch', ...)` for network calls.
  Never let a test send real email: `nodemailer` is mocked in `tests/api/contact.test.ts`.
- `describe` names the unit (`'ContactPage'`); `it` reads as a sentence about behaviour
  (`it('hides the success message after 3 seconds')`).
- Server-side test files start with `// @vitest-environment node`.

## Content and copy

- Text shown on the site lives in `src/data/index.ts`; the resume PDF is the source of truth.
- Use `'#'` for a link that doesn't exist yet (certificates, unpublished posts); the pages hide
  those links automatically.
- Never commit secrets. Email credentials go in `.env` locally (git-ignored, see `.env.example`)
  and in Vercel → Settings → Environment Variables in production.
- Keep the phone number off the site and out of the repo.

## Git

- Work directly on `main` and push to `main`; no feature branches or pull requests for this repo.
- Commit subject: imperative mood, sentence case, no trailing period, about 70 characters max
  (`Hide contact form success message after 3 seconds`). Add a short body with bullet points
  when the change has more than one part.
- Run `npm run check` before committing.
