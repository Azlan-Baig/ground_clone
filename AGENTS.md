# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router. Route entries use `page.tsx` and `layout.tsx`. Sanity Studio is embedded at `app/studio/[[...tool]]/page.tsx`.
- `sanity/`: Sanity config, helpers, and schemas (`sanity.config.ts`, `sanity/lib/*`, `sanity/schemaTypes/*`).
- `public/`: Static assets (e.g., `/next.svg`).
- `app/globals.css`: Tailwind CSS v4 entry and global tokens.
- Tooling: `eslint.config.mjs`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`.

## Build, Test, and Development Commands
- `pnpm dev`: Start local dev server with Turbopack at `http://localhost:3000`. Visit `/studio` for Sanity Studio.
- `pnpm build`: Production build of the Next.js app.
- `pnpm start`: Run the built app locally.
- `pnpm lint`: Lint with Next.js + TypeScript rules.

## Coding Style & Naming Conventions
- **TypeScript**: Strict mode enabled (`tsconfig.json`). Prefer explicit types on exports and public APIs.
- **ESLint**: Uses `next/core-web-vitals` + `next/typescript`. Fix issues before committing (`pnpm lint`).
- **React components**: `PascalCase` for components; default export for route components (`page.tsx`, `layout.tsx`).
- **Routes & files**: Lowercase route segment folders under `app/` (e.g., `app/blog/page.tsx`).
- **Styling**: Tailwind utility-first classes in components; keep global tokens in `app/globals.css`.
- **Sanity**: Define schemas in `sanity/schemaTypes`, image helpers in `sanity/lib/image.ts`, queries via `sanity/lib/client.ts` or `sanity/lib/live.ts`.

## Testing Guidelines
- No test framework is configured yet. If adding tests, co-locate as `*.test.ts(x)` beside source or create `tests/`.
- Recommended stack: Vitest + React Testing Library for units, Playwright for e2e. Add a `test` script to `package.json` if introduced.

## Commit & Pull Request Guidelines
- Current history is minimal; adopt Conventional Commits (e.g., `feat: add hero section`, `fix: image URL builder`).
- PRs: include clear description, linked issues, screenshots for UI changes, and notes on env/config updates.
- Keep PRs focused and small; ensure `pnpm lint` and `pnpm build` pass.

## Security & Configuration Tips
- Required env vars (set in `.env.local`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `NEXT_PUBLIC_SANITY_API_VERSION`.
- Values prefixed with `NEXT_PUBLIC_` are exposed to the client—do not put secrets there.
- Do not commit `.env*` files; verify Studio loads at `/studio` after configuring envs.

