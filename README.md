# Boilerplate Monorepo

Production-ready Turborepo monorepo boilerplate.

## Tech Stack

- **Runtime**: Node.js >= 18
- **Package Manager**: pnpm 9
- **Monorepo**: Turborepo
- **Framework**: Next.js 16 (App Router, React Compiler)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: Zustand (client) + TanStack React Query (server)
- **Validation**: Zod
- **API Client**: ky
- **Dark Mode**: next-themes
- **Font**: Pretendard Variable

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

| Path                         | Description                      |
| ---------------------------- | -------------------------------- |
| `apps/web`                   | Main Next.js application         |
| `packages/ui`                | Shared UI components (shadcn/ui) |
| `packages/eslint-config`     | Shared ESLint configuration      |
| `packages/typescript-config` | Shared TypeScript configuration  |

## Scripts

| Command            | Description          |
| ------------------ | -------------------- |
| `pnpm dev`         | Start development    |
| `pnpm build`       | Build all packages   |
| `pnpm lint`        | Lint all packages    |
| `pnpm format`      | Format with Prettier |
| `pnpm check-types` | Type check           |

## Commit Convention

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `perf`, `chore`
