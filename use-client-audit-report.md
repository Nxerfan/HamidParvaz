# `"use client"` Audit Report — HamidParvaz

**Total files with `"use client"`:** 72  
**Excluded per agreement:** `ClientProvider.tsx`, `layout.tsx`  

---

## 1. ALREADY SERVER COMPONENTS (no `"use client"` needed)

These files are already server components — included for reference:

| File | Notes |
|------|-------|
| `app/(support)/rules/page.tsx` | Pure static content |
| `app/(support)/about-us/page.tsx` | Pure static content |
| `app/(support)/guid/page.tsx` | Pure static content |
| `app/components/(filters)/FilterUserPannel.tsx` | Pure static content |

---

## 2. QUESTIONABLE — unnecessary `"use client"`

These files have `"use client"` but use **zero React hooks** and **zero browser APIs**. They only render static data. The `"use client"` can be **removed entirely**.

| # | File | Reason | Fix |
|---|------|--------|-----|
| 1 | `app/flight/page.tsx` | No hooks. Imports client children (allowed from server). No FontAwesomeIcon directly. | **Remove `"use client"`** |
| 2 | `app/tour/page.tsx` | No hooks. Uses FontAwesomeIcon directly. Imports client children. | **Remove `"use client"`** after migrating icons to SVG sprites |
| 3 | `app/get-tour/page.tsx` | No hooks. Static data + FontAwesomeIcon. | **Remove `"use client"`** after migrating icons |
| 4 | `app/hotel-on-map/page.tsx` | No hooks. Static data + FontAwesomeIcon. | **Remove `"use client"`** after migrating icons |
| 5 | `app/company/page.tsx` | No hooks. Static data + FontAwesomeIcon. Has `<button>` with no handler. | **Remove `"use client"`** after migrating icons |

**Impact of removing:** These 5 pages become fully static (SSG), eliminating their client JS bundle entirely. Excellent for SEO (travel content).

---

## 3. DEFERRABLE — minimal interactivity extractable to child

These pages have small interactive bits that could be moved to a tiny child component, letting the parent be a server component.

| # | File | What makes it client | Suggested refactor |
|---|------|----------------------|--------------------|
| 6 | `app/(support)/faq/page.tsx` | `useState` for search input | Extract `<FaqSearch>` as client child, page stays server |
| 7 | `app/userpanel/tracking/page.tsx` | FontAwesomeIcon only (already no hooks) | Replace icons with inline SVGs or extract to client icon component |
| 8 | `app/userpanel/messages/page.tsx` | `useState` + `useEffect` that initialise from `PAGE_DATA` (completely unnecessary — data is static) | Remove the hooks entirely; make it a server component |
| 9 | `app/userpanel/gift-card/page.tsx` | Same pattern as `messages` | Remove the hooks; make it a server component |
| 10 | `app/userpanel/tel-robat/page.tsx` | Same pattern as `messages` | Remove the hooks; make it a server component |

**Impact of deferring:** Pages 8–10 become fully static. Page 6 keeps only ~1KB of client JS for the search input.

---

## 4. JUSTIFIED — legitimately needs `"use client"`

All remaining files (~55 files) require client-side rendering for one or more of:

- `useState` / `useReducer` for interactive UI (forms, filters, accordions, modals)
- `useEffect` for side effects (timers, data fetching, syncing)
- `useRouter` / `useSearchParams` / `usePathname` for navigation
- `useContext` / context providers (PassengerContext, FiltersContext)
- Custom hooks (`useCalendar`, `useDestinationDropdown`, `useGuestCounter`, `useSearchLogic`)
- `createPortal` for modals
- `FontAwesomeIcon` in leaf components (cannot be avoided without replacing the icon library entirely)
- Next.js error boundary (`error.tsx` — must be client component)

These are **not candidates for refactoring** under the current scope.

### Key categories of justified files:

**Interactive forms & booking flows:**  
`auth/page.tsx`, `cooperation/page.tsx`, all `reserve/form`, `reserve/prepay`, `cancellation/*`, `flight/*`, `hotel/*`, `tour/*` (most pages)

**Interactive filter components:**  
`CheckboxFilter.tsx`, `FilterAccordion.tsx`, `FilterCheckboxItem.tsx`, `Filters.tsx`, `FilterSidebar.tsx`, `PriceRangeFilter.tsx`

**Interactive UI widgets:**  
`FAQSection.tsx`, `HotelDetailModal.tsx`, `TravelCards.tsx`, `HotelListPage.tsx`, `TourDetailFull.tsx`

**Blog / content with state:**  
`Blog.tsx`, `Article.tsx`

**Headers with client-only icon library:**  
`UserPannelHeader.tsx` (uses FontAwesomeIcon — no hooks but icon lib forces client)

**Hooks / context / lib:**  
All files under `app/lib/`

**User panel with actual interactivity:**  
`userpanel/page.tsx`, `userpanel/pax/page.tsx`, `userpanel/creadit/page.tsx`, `userpanel/change-password/page.tsx`, `userpanel/auto-reserve/page.tsx`, `userpanel/club/*`

---

## 5. Summary of savings if all Questionable + Deferrable are addressed

| Category | Files | Est. client JS removed |
|----------|-------|-----------------------|
| Questionable (remove entirely) | 5 | ~50–80 KB each (page-level bundles) |
| Deferrable (extract or cleanup) | 5 | ~10–50 KB each |
| **Total** | **10 files** | **~300–500 KB estimated reduction** |

---

## 6. Top 5 Priority Refactoring Targets

1. **`app/flight/page.tsx`** — Easiest win. No FontAwesomeIcon usage → just delete `"use client"`.
2. **`app/company/page.tsx`** — Fully static, no hooks. Delete `"use client"` and handle icons.
3. **`app/get-tour/page.tsx`** — Same as above.
4. **`app/hotel-on-map/page.tsx`** — Same as above.
5. **`app/userpanel/messages/page.tsx`** — Remove unnecessary `useState`/`useEffect`, delete `"use client"`.
