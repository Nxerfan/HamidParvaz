# Hamid Parvaz — AGENTS.md

## Stack

- **Next.js 16 App Router** (`src`-less, routes under `app/`)
- **React 19, TypeScript (strict), Tailwind CSS v4** (`@tailwindcss/postcss`)
- **Font Awesome** (free solid/regular/brands) + `react-icons`
- **Sahel** Persian font (`--Font: "Sahel", sans-serif`)

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (Next.js) |
| `npm run build` | Static export to `./out` |
| `npm run lint` | ESLint (next/core-web-vitals + typescript) |
| `npx next build` | Alternative build invocation |

**No test, typecheck, or format scripts exist.** Type errors surface only at build time (strict mode, `noEmit: true`).

## Architecture

- **RTL site** — `lang="fa" dir="rtl"` in root layout
- **3 domains** with parallel patterns: `flight/`, `hotel/`, `tour/`
  - Each: `(domain)se/page.tsx` (search), `(domain)ch/page.tsx` (choose/detail), `reserve/form/`, `reserve/prepay/`
- **Route groups**: `(MainPages)/`, `(MakeanAcount)/`, `(support)/`
- **Server actions** in `app/actions/` — all `"use server"`, follow `(_prevState, formData)` pattern
- **State**: React Context (`PassengerProvider` in `ClientProvider.tsx`) + URL state via search params
- **Toast system**: `app/components/Toast/ToastProvider.tsx` wrapped at root
- **Persian date**: Jalaali calendar utility in `app/lib/jalaali.ts` + `useCalendar.tsx` hook
- **Static export** to GitHub Pages — `next.config.ts` uses default config, remote images whitelisted
- **API routes** under `app/api/` — all return mock data from `app/data/` (no DB)
- **Types** in `app/types/index.ts` — `Hotel`, `Tour`, `Flight`, `Passenger`, `User`, `FilterState`, etc.
- **Custom hooks** in `app/lib/hooks/` — `useDestinationDropdown`, `useGuestCounter`, `useSearchLogic`, `useToast`

## Routes Overview

| Group | Pages (57 total) |
|---|---|
| Core | `/` landing, `/flight`, `/hotel`, `/tour` |
| Flight | `/flight/flight{se,ch}`, `/flight/reserve/{form,prepay}`, `/flight-info` |
| Hotel | `/hotel/hotel{se,ch}`, `/hotel/reserve/{form,prepay}`, `/hotel-on-map` |
| Tour | `/tour/tour{se,ch}`, `/tour/reserve/{form,prepay}`, `/get-tour` |
| Tour MYO | `/tour/make-your-own` → `/flight/{away,return}` → `/hotel/room` → `/passenger-info` → `/payment` |
| User panel | `/userpanel` + `/{pax,messages,club/*,tracking,creadit,gift-card,auto-reserve,change-password,tel-robat}` |
| Other | `/blog/[slug]`, `/cancellation/{flight,hotel,tour}`, `/company`, `/reserve/{auto-reserve/*,form,prepay}` |

## Gotchas

- `.env*` files are **gitignored** — do not commit secrets
- `.md` (no extension) is a Persian TODO/bug list, not documentation
- No `sharp` native binary? `npm run build` will warn but still succeed
