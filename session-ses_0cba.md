# Next.js project quality sweep & flight folder responsiveness

**Session ID:** ses_0cba167d9ffeVwkJ6U5jhlpzwS
**Created:** 7/6/2026, 1:50:42 AM
**Updated:** 7/6/2026, 1:56:13 AM

---

## User

Role: Senior Frontend Architect, UI/UX Auditor, and Product Strategist

Goal: Perform a total quality sweep of the entire Next.js project, fixing every responsiveness, spacing, and accessibility issue file by file. You will specifically rework the `flight` folder to be fully responsive. After all fixes, you will produce:
1. A detailed checklist of all files and their status.
2. A visual verification report for all major pages at mobile/tablet/desktop breakpoints.
3. 10 actionable suggestions for code quality improvements.
4. 10 concrete recommendations for a more beautiful, polished UI.
5. 10 new feature ideas that align with the app's purpose.
6. A count of the total number of **distinct pages**, excluding repeated UI patterns (e.g., the same modal/form component reused across different features is counted only once). Identify the unique page layouts.

Context:
- The project is a large productivity/PWA app (Nexus) with many pages and components.
- You have full access to the source code under `src/`.
- Many mobile responsiveness issues exist; `flight` is completely non-responsive.
- You must work autonomously, file by file, without stopping to ask questions. Build a checklist, fix issues, and only when all files are processed, compile the final reports and recommendations.

Phase 1 – Inventory & Planning:
- List every UI file (pages, layouts, components) that may contain visual or interactive elements. Group them logically (e.g., pages, shared components, feature components). Ignore purely server-side or config files.

Phase 2 – Per-File Audit & Fix:
For each file, examine and correct:
- **Code Quality:** Remove unused imports, fix missing React keys, improve hook dependencies, remove leftover console.logs, fix any obvious memory leaks (e.g., missing cleanup in useEffect), improve naming inconsistencies.
- **Responsiveness:** Use mobile-first Tailwind classes. Replace fixed widths (px) with relative/percentage/flex. Ensure touch targets >= 44px. Add overflow and scroll handling for small screens. Fix any horizontal overflow.
- **Spacing:** Enforce Tailwind spacing scale (p-, m-, gap-, space-). Eliminate arbitrary pixel values unless absolutely necessary. Consistent padding and margins across similar components.
- **Accessibility:** Add missing aria-labels, proper form labels, focus-visible states, semantic HTML. Check contrast visually (light/dark).
- **Visual Consistency:** Ensure the component looks correct in all 20+ themes (you can infer by checking color tokens). Verify RTL (Persian/Arabic) does not break layout.

After fixing each file, mark it in a running checklist: [Path, Status (OK / Fixed / Issues remaining), Notes].

**Special: `flight` folder** — completely redesign its layout to be fully responsive. Use the app's existing design tokens. Test mobile/tablet/desktop in your mind. Ensure all functionality is preserved.

Phase 3 – Visual Verification:
Once all files are processed, describe the appearance of every major page/section:
- Dashboard
- Projects list & detail
- Tasks (list, detail, board if any)
- Settings (all tabs)
- Calendar
- Prompt Pad
- AI Assistant Panel
- Flight
- Notes, Habits, Reviews (if separate pages)
- Auth pages (login, register)
- Any other unique page

For each, describe at viewport widths: 375px (mobile), 768px (tablet), 1280px (desktop). Confirm that:
- All interactive elements are reachable and usable.
- No overlapping or cut-off text.
- Spacing is consistent and professional.
- Dark/light modes are visually correct (briefly note if any theme breaks).

Phase 4 – Final Deliverables:
1. **Checklist Table:** columns: File, Status, Notes.
2. **Visual Verification Report:** as described above.
3. **10 Code Quality Suggestions:** e.g., use more TypeScript strictness, extract reusable hooks, improve error boundaries, etc.
4. **10 UI Beauty Recommendations:** e.g., micro-interactions, skeleton loaders, smoother transitions, better empty states, glassmorphism elements, refined shadows, etc.
5. **10 New Feature Ideas:** creative and practical additions that extend the app's value (e.g., time tracking, Pomodoro timer, client portal, AI daily standup, etc.). Keep the zero-cost constraint in mind.
6. **Unique Page Count:** Count distinct page layouts. If a "create task" form appears inside a modal in multiple places, it's one UI pattern, so count it once. List the unique page names and total.

Constraints:
- Do not modify backend logic, API contracts, or data models unless absolutely necessary for responsiveness (and if so, explain).
- Preserve all i18n keys and translations. If new UI text is introduced, add it to the translation files.
- Do not break existing animations or themes.
- Assume `next build` will pass; you are not required to run it but must write code that should compile without errors.

Begin now. Start with the file inventory, then fix file by file without interruption. Only after all files are fixed, produce the final reports and suggestions. 

---

## Assistant (Build · Glm 5.2 · 8.4s)

_Thinking:_

Let me start by understanding the project structure. This is a large task, so I need to be systematic. Let me first explore the codebase to understand what I'm working with.

Let me start with Phase 1 - Inventory & Planning. I'll explore the directory structure first.

I'll start by exploring the project structure to build an inventory, then work through files systematically.

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz</path>
<type>directory</type>
<entries>
.git/
.github/
.gitignore
.md
.next/
app/
eslint.config.mjs
next-env.d.ts
next.config.ts
node_modules/
package-lock.json
package.json
postcss.config.mjs
public/
tsconfig.json
tsconfig.tsbuildinfo
use-client-audit-report.md

(17 entries)
</entries>
```

**Tool: bash**

**Input:**
```json
{
  "command": "git log --oneline -5; git status --short | Select-Object -First 20"
}
```

**Output:**
```
a29a666 fixing
dc2e498 FIXIXIXI
e299318 FoxiFixi
84140d6 Fix A1
63adfcf Fix 1

```

---

## Assistant (Build · Glm 5.2 · 2.9s)

_Thinking:_

Let me explore the project structure more deeply.

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\package.json"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\package.json</path>
<type>file</type>
<content>
1: {
2:   "name": "nextjs-dashboard",
3:   "version": "0.1.0",
4:   "private": true,
5:   "scripts": {
6:     "dev": "next dev",
7:     "build": "next build",
8:     "start": "next start",
9:     "lint": "eslint"
10:   },
11:   "dependencies": {
12:     "@fortawesome/fontawesome-svg-core": "^7.2.0",
13:     "@fortawesome/free-brands-svg-icons": "^7.2.0",
14:     "@fortawesome/free-regular-svg-icons": "^7.2.0",
15:     "@fortawesome/free-solid-svg-icons": "^7.2.0",
16:     "@fortawesome/react-fontawesome": "^3.2.0",
17:     "babel-plugin-react-compiler": "^1.0.0",
18:     "next": "^16.2.9",
19:     "react": "19.2.3",
20:     "react-dom": "19.2.3",
21:     "react-icons": "^5.5.0",
22:     "sharp": "^0.35.2"
23:   },
24:   "devDependencies": {
25:     "@tailwindcss/postcss": "^4",
26:     "@types/node": "^20",
27:     "@types/react": "^19.2.15",
28:     "@types/react-dom": "^19.2.3",
29:     "eslint": "^9",
30:     "eslint-config-next": "16.1.1",
31:     "typescript": "^5.9.3"
32:   }
33: }

(End of file - total 33 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app</path>
<type>directory</type>
<entries>
(MainPages)/
(MakeanAcount)/
(support)/
actions/
api/
blog/
cancellation/
ClientProvider.tsx
company/
components/
data/
error.module.css
error.tsx
favicon.ico
flight-info/
flight/
get-tour/
globals.css
hotel-on-map/
hotel/
layout.tsx
lib/
not-found.module.css
not-found.tsx
page.tsx
reserve/
tour/
travel/
types/
userpanel/

(30 entries)
</entries>
```

---

## Assistant (Build · Glm 5.2 · 239.1s)

_Thinking:_

This is a Next.js project using App Router. Let me explore the structure more deeply. I see there's a `flight` folder that needs special attention. Let me get a full inventory of all the UI files.

Let me use the explore agent to get a comprehensive view of the structure since this is a large task.

**Tool: task**

**Input:**
```json
{
  "description": "Inventory all UI files",
  "prompt": "Explore the Next.js project at D:\\Works\\Project001\\sex\\HamidParvaz very thoroughly. I need a complete inventory of ALL UI files (pages, layouts, components) under the `app/` directory.\n\nDo the following:\n1. List ALL .tsx files under app/ recursively, grouped by their parent folder. Include their full relative paths from the project root.\n2. Identify which folders are route groups (parenthesized like (MainPages)) vs regular routes.\n3. Identify the `app/flight/` folder specifically - list all files inside it.\n4. Identify shared components under app/components/ - list all files.\n5. Note any .css files (module css or global).\n6. Note the layout.tsx files at each level.\n7. Identify the i18n / translation files location (look for messages/, locales/, dictionaries, or similar).\n8. Check globals.css for design tokens (CSS variables for colors, spacing, themes).\n\nReturn a structured, complete list. Do NOT read full file contents - just list paths and group them. Be exhaustive - I need every single .tsx file path.",
  "subagent_type": "explore"
}
```

**Output:**
```
<task id="ses_0cba11471ffebnNXD5YPPwQDb2" state="completed">
<task_result>
I now have a complete and exhaustive picture of the project. Here is the full structured inventory.

---

# Complete UI File Inventory — `app/` Directory

**Project root:** `D:\Works\Project001\sex\HamidParvaz`
**Framework:** Next.js 16.2.9 (App Router) + React 19.2.3 + Tailwind CSS v4 + React Compiler
**Language/locale:** Single-language Persian/Farsi (RTL) — no i18n framework (see Section 8)

---

## 1. ALL `.tsx` Files, Grouped by Parent Folder

### A. Root Level (`app/`) — App-level scaffolding
```
app/ClientProvider.tsx
app/error.tsx
app/layout.tsx
app/not-found.tsx
app/page.tsx
```

### B. Route Group: `app/(MainPages)/`
```
app/(MainPages)/layout.tsx
app/(MainPages)/home/page.tsx
```

### C. Route Group: `app/(MakeanAcount)/`
```
app/(MakeanAcount)/layout.tsx
app/(MakeanAcount)/auth/page.tsx
```

### D. Route Group: `app/(support)/`
```
app/(support)/layout.tsx
app/(support)/about-us/page.tsx
app/(support)/cooperation/page.tsx
app/(support)/faq/page.tsx
app/(support)/guid/page.tsx
app/(support)/rules/page.tsx
```

### E. `app/blog/` — Regular route (with dynamic segment)
```
app/blog/page.tsx
app/blog/[slug]/page.tsx
```

### F. `app/cancellation/`
```
app/cancellation/page.tsx
app/cancellation/flight/page.tsx
app/cancellation/hotel/page.tsx
app/cancellation/tour/page.tsx
```

### G. `app/company/`
```
app/company/page.tsx
```

### H. `app/flight-info/`
```
app/flight-info/page.tsx
```

### I. `app/get-tour/`
```
app/get-tour/page.tsx
```

### J. `app/hotel/`
```
app/hotel/page.tsx
app/hotel/hotelch/page.tsx
app/hotel/hotelse/page.tsx
app/hotel/reserve/form/page.tsx
app/hotel/reserve/prepay/page.tsx
```

### K. `app/hotel-on-map/`
```
app/hotel-on-map/page.tsx
```

### L. `app/reserve/`
```
app/reserve/form/page.tsx
app/reserve/prepay/page.tsx
app/reserve/auto-reserve/page.tsx
app/reserve/auto-reserve/filters/page.tsx
```

### M. `app/tour/`
```
app/tour/page.tsx
app/tour/tourch/page.tsx
app/tour/tourse/page.tsx
app/tour/make-your-own/page.tsx
app/tour/make-your-own/passenger-info/page.tsx
app/tour/make-your-own/payment/page.tsx
app/tour/make-your-own/hotel/page.tsx
app/tour/make-your-own/hotel/room/page.tsx
app/tour/make-your-own/flight/away/page.tsx
app/tour/make-your-own/flight/return/page.tsx
app/tour/reserve/form/page.tsx
app/tour/reserve/prepay/page.tsx
```

### N. `app/travel/` — Regular route (with dynamic segment)
```
app/travel/[slug]/page.tsx
app/travel/[slug]/TourDetailClient.tsx   ← client component (not a route)
```

### O. `app/userpanel/`
```
app/userpanel/page.tsx
app/userpanel/auto-reserve/page.tsx
app/userpanel/change-password/page.tsx
app/userpanel/club/page.tsx
app/userpanel/club/history/page.tsx
app/userpanel/club/level/page.tsx
app/userpanel/club/used-score/page.tsx
app/userpanel/creadit/page.tsx
app/userpanel/gift-card/page.tsx
app/userpanel/messages/page.tsx
app/userpanel/pax/page.tsx
app/userpanel/tel-robat/page.tsx
app/userpanel/tracking/page.tsx
```

### P. `app/lib/` — Non-route React utilities (Contexts/Hooks)
```
app/lib/PassengerContext.tsx
app/lib/useCalendar.tsx
app/lib/hooks/useSearchLogic.tsx
```

**Subtotal (routes + root + lib): 78 `.tsx` files**

---

## 2. Route Groups vs Regular Routes

| Folder | Type | Notes |
|---|---|---|
| `app/(MainPages)/` | **Route group** | Parenthesized; `home/` resolves to `/home` |
| `app/(MakeanAcount)/` | **Route group** | Parenthesized; `auth/` resolves to `/auth` |
| `app/(support)/` | **Route group** | Parenthesized; about-us, cooperation, faq, guid, rules all sit at root URL level |
| `app/blog/`, `app/cancellation/`, `app/company/`, `app/flight-info/`, `app/flight/`, `app/get-tour/`, `app/hotel/`, `app/hotel-on-map/`, `app/reserve/`, `app/tour/`, `app/travel/`, `app/userpanel/` | **Regular routes** | Segment names become URL segments |

All three route groups own a `layout.tsx`. Note: the `components/` folder also uses parenthesized sub-folders — `components/(Headers)/`, `components/(Forms)/`, `components/(filters)/` — but these are **component groupings, NOT route groups** (they're not part of routing).

---

## 3. `app/flight/` Folder — Complete File Listing

```
app/flight/page.tsx
app/flight/globals.css
app/flight/flightch/page.tsx
app/flight/flightch/globals.css
app/flight/flightse/page.tsx
app/flight/flightse/globals.css
app/flight/reserve/form/page.tsx
app/flight/reserve/prepay/page.tsx
app/flight/reserve/global.css
```

- 5 route pages: `flight` (index), `flightch`, `flightse`, `reserve/form`, `reserve/prepay`
- 3 CSS files (one per route segment level)
- No `layout.tsx` at this level (inherits from root)

---

## 4. Shared Components — `app/components/`

### `app/components/` (root)
```
app/components/Article.tsx
app/components/Blog.tsx
app/components/Description.tsx
app/components/FAQSection.tsx
app/components/Footer.tsx
app/components/HotelDetailModal.tsx
app/components/HotelListPage.tsx
app/components/LoadingSkeleton.tsx
app/components/SideBar.tsx
app/components/TourDetailFull.tsx
app/components/TravelCards.tsx
app/components/UsefullWays.tsx
app/components/cancellation.tsx
```

### `app/components/(Headers)/` — Component group (parenthesized, not a route group)
```
app/components/(Headers)/Header.tsx
app/components/(Headers)/Header3.tsx
app/components/(Headers)/HeaderAutoReserve.tsx
app/components/(Headers)/HeaderBuyRoom.tsx
app/components/(Headers)/HeaderMakeYourTour.tsx
app/components/(Headers)/MobileNavDrawer.tsx
app/components/(Headers)/SecondHeader.tsx
app/components/(Headers)/UserPannelHeader.tsx
```

### `app/components/(Forms)/`
```
app/components/(Forms)/FormType1.tsx
app/components/(Forms)/FormType2.tsx
app/components/(Forms)/FormType3.tsx
app/components/(Forms)/FormType5.tsx
```
*(Note: no FormType4.tsx — numbering skips 4)*

### `app/components/(filters)/`
```
app/components/(filters)/CheckboxFilter.tsx
app/components/(filters)/FilterAccordion.tsx
app/components/(filters)/FilterCheckboxItem.tsx
app/components/(filters)/FilterSidebar.tsx
app/components/(filters)/FilterUserPannel.tsx
app/components/(filters)/Filters.tsx
app/components/(filters)/PriceRangeFilter.tsx
```

### `app/components/Toast/`
```
app/components/Toast/ToastContainer.tsx
app/components/Toast/ToastItem.tsx
app/components/Toast/ToastProvider.tsx
```

**Components subtotal: 35 `.tsx` files**
**GRAND TOTAL `.tsx` files: 113**

---

## 5. CSS Files

### Global/Plain CSS (per route segment, imported into pages)
```
app/globals.css                          ← ROOT master stylesheet (design tokens live here)
app/(MakeanAcount)/global.css
app/(support)/globals.css
app/(support)/cooperation/global.css
app/blog/global.css
app/cancellation/global.css
app/company/global.css
app/flight-info/global.css
app/flight/globals.css
app/flight/flightch/globals.css
app/flight/flightse/globals.css
app/flight/reserve/global.css
app/get-tour/global.css
app/hotel/globals.css
app/hotel/hotelch/globals.css
app/hotel-on-map/global.css
app/reserve/global.css
app/tour/globals.css
app/tour/tourch/globals.css
app/tour/tourse/global.css
app/tour/make-your-own/global.css
app/tour/make-your-own/premium-rooms.css   ← bespoke stylesheet
app/tour/reserve/global.css
app/userpanel/global.css
app/components/globals.css
app/components/(filters)/FiltersGlobal.css
```

### CSS Modules
```
app/not-found.module.css
app/error.module.css
app/company/company.module.css
app/components/LoadingSkeleton.module.css
app/components/Toast/Toast.module.css
```

**Total CSS files: 32** (26 plain/global + 5 modules + 1 bespoke `premium-rooms.css`)

---

## 6. `layout.tsx` Files (by Level)

Only **4** layout files exist in the whole tree:

```
app/layout.tsx                         ← ROOT (required)
app/(MainPages)/layout.tsx             ← route-group layout
app/(MakeanAcount)/layout.tsx          ← route-group layout
app/(support)/layout.tsx               ← route-group layout
```

**Notable absences:** No `layout.tsx` for `flight/`, `hotel/`, `tour/`, `userpanel/`, `reserve/`, `cancellation/`, `blog/`, `travel/`, or any other regular route. These route trees inherit directly from the root layout. The route-group layouts appear to inject shared chrome (e.g. headers/footers) selectively for the main site pages, auth flow, and support pages.

---

## 7. i18n / Translation Files — NOT FOUND

A thorough search found **no internationalization setup**:

- No `messages/`, `locales/`, `dictionaries/`, `lang/`, or `translation/` directories anywhere in the project.
- No files matching `*i18n*` or `*translation*`.
- No i18n libraries in `package.json` — checked for `next-intl`, `react-i18next`, `i18next`, `next-i18n-router`, `@formatjs`, `lingui`, `rosetta`. None present.
- No `.json` files in `public/` (which would typically hold locale bundles).

**Conclusion:** This is a **single-language application (Persian/Farsi)**. Localization is hardcoded; the RTL layout is enforced globally via `direction: rtl` in `app/globals.css` and the Sahel Persian font is declared via `@font-face`.

---

## 8. Design Tokens in `app/globals.css`

The root stylesheet defines a single `:root` token block. There is **no dark-mode / theme-switching layer** (no `[data-theme]`, no `prefers-color-scheme: dark` token overrides).

### Color tokens
| Token | Value | Purpose |
|---|---|---|
| `--gold` | `#ffcd11` | Primary brand accent (gold) |
| `--goldDark` | `#cea500` | Darker gold (hover/borders/focus) |
| `--goldText` | `#5c4b00` | Gold-tinted text |
| `--grayBg` | `#0000000c` | Light translucent gray background |
| `--grayBgHover` | `#f5f0de` | Warm-tinted hover background |
| `--textDark` | `#333` | Primary body text |
| `--textGray` | `#727272` | Secondary/muted text |
| `--bgLight` | `#f5f5f5` | Page background |
| `--bgWhite` | `#fff` | Card/surface background |

### Spacing / sizing tokens
- `--fontSize: 15px` (base font size — single token, no spacing scale)

### Other tokens
| Token | Value |
|---|---|
| `--transition` | `all 0.3s ease` |
| `--boxShadow` | `0 2px 8px rgba(0,0,0,0.06), 0 -1px 4px rgba(0,0,0,0.02)` |
| `--borderLight` | `1px solid #00000030` |
| `--Font` | `"Sahel", sans-serif` |

### Typography
- Custom `@font-face` declarations for **Sahel** font (normal, bold, 900/black weights), served from `/sahel-font-v1.0.0-alpha9/` in `public/`.

### Global behavioral CSS
- CSS reset (`* { margin:0; padding:0; box-sizing:border-box }`)
- `body { direction: rtl }` — RTL enforced project-wide
- WCAG focus indicators (`:focus-visible` outline using `--goldDark`)
- Reduced-motion media query (`prefers-reduced-motion`)
- `.sr-only` screen-reader utility class

### Observation
The design-token system is **minimal** — there is no formal spacing scale, no breakpoint tokens, no semantic token layer (e.g. `--color-primary` → `--gold`). Colors are referenced directly by their concrete names. There is **no theme (light/dark) switching infrastructure** despite the gold/dark palette.

---

## Supplementary Note — Non-`.tsx` App Directories (out of scope but relevant)

These contain only `.ts` files (no UI components) and were excluded from the UI inventory:

- `app/api/` — Route handlers: `search`, `tours`, `flights`, `hotels`, `blog`, `user/profile`, `faq`, `articles` (+ dynamic `[id]` routes for tours, flights, hotels, articles)
- `app/actions/` — Server actions: `auth.ts`, `booking.ts`, `contact.ts`, `user.ts`
- `app/data/` — Static data sources: `articles.ts`, `hotels.ts`, `tours.ts`
- `app/types/` — `index.ts` (shared TypeScript types)

---

### Summary Counts
- **`.tsx` files total: 113** (78 routes/lib + 35 components)
- **`.css` files total: 32** (26 global + 5 module + 1 bespoke)
- **`layout.tsx` files: 4** (root + 3 route groups)
- **Route groups: 3** — `(MainPages)`, `(MakeanAcount)`, `(support)`
- **Regular route trees: 12**
- **i18n setup: none** (single-language Persian/RTL app)
</task_result>
</task>
```

---

## Assistant (Build · Glm 5.2 · 22.6s)

_Thinking:_

This is a large project with 113 .tsx files. The task is asking me to:
1. Audit and fix responsiveness, spacing, accessibility issues file by file
2. Specifically rework the `flight` folder to be fully responsive
3. Produce final reports

Given the scope (113 .tsx files + 32 CSS files), I need to be strategic. Let me focus on:
1. The `flight` folder first (specifically called out as completely non-responsive)
2. Key shared components (Header, Footer, Forms, Filters)
3. Major pages

But realistically, I cannot fix all 113 files in one session. Let me be pragmatic and focus on the highest-impact files, with the `flight` folder being the priority.

Let me first read the flight folder files to understand the structure and the issues. Let me also read the globals.css and key components to understand the design system.

Let me start by reading the flight folder files, the main layout, globals.css, and key shared components in parallel.

Actually, given the enormous scope, I should be strategic. Let me:
1. Read the flight folder (all files) - this is the priority
2. Read globals.css to understand design tokens
3. Read the main layout and key components

Let me set up a todo list first since this is a multi-step task.

Wait - the task is enormous. The user wants me to fix "every file" but that's 113+ files. I should be honest about scope but make a strong, focused effort. Let me prioritize:

1. flight folder (priority - explicitly called out)
2. Shared components (Header, Footer, Forms, Filters) - high impact
3. Major pages

Let me start with the flight folder and globals.css. I'll read them in parallel.

Actually, let me think about how to approach this efficiently. The task says "work autonomously, file by file, without stopping to ask questions." But 113 files is a LOT. I should focus on the most impactful files and be thorough there, then provide the reports.

Let me start by reading the flight folder files since that's the explicit priority, plus the globals.css and layout for context.

This is a large project (113 .tsx files, 32 CSS files). Let me set up my task tracking and start with the priority `flight` folder plus core design system files.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Phase 1: Inventory & Planning - complete",
      "priority": "high",
      "status": "completed"
    },
    {
      "content": "Read & understand design tokens (globals.css) and root layout",
      "priority": "high",
      "status": "in_progress"
    },
    {
      "content": "Rework flight/ folder to be fully responsive (priority)",
      "priority": "high",
      "status": "pending"
    },
    {
      "content": "Audit & fix shared components (Header, Footer, Forms, Filters, Toast)",
      "priority": "high",
      "status": "pending"
    },
    {
      "content": "Audit & fix major pages (home, auth, tour, hotel, reserve, userpanel)",
      "priority": "medium",
      "status": "pending"
    },
    {
      "content": "Audit & fix support pages, blog, cancellation, company",
      "priority": "medium",
      "status": "pending"
    },
    {
      "content": "Phase 3: Visual verification report",
      "priority": "medium",
      "status": "pending"
    },
    {
      "content": "Phase 4: Final deliverables (checklist, suggestions, recommendations, feature ideas, page count)",
      "priority": "high",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Phase 1: Inventory & Planning - complete",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Read & understand design tokens (globals.css) and root layout",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Rework flight/ folder to be fully responsive (priority)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Audit & fix shared components (Header, Footer, Forms, Filters, Toast)",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Audit & fix major pages (home, auth, tour, hotel, reserve, userpanel)",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Audit & fix support pages, blog, cancellation, company",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 3: Visual verification report",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Phase 4: Final deliverables (checklist, suggestions, recommendations, feature ideas, page count)",
    "status": "pending",
    "priority": "high"
  }
]
```

---

## Assistant (Build · Glm 5.2 · 5.0s)

Let me read the design tokens, root layout, and the flight folder files in parallel.

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\globals.css"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\globals.css</path>
<type>file</type>
<content>
1: /* ================= Variables ================= */
2: :root {
3:   --gold: #ffcd11;
4:   --goldDark: #cea500;
5:   --goldText: #5c4b00;
6:   --grayBg: #0000000c;
7:   --grayBgHover: #f5f0de;
8:   --textDark: #333;
9:   --textGray: #727272;
10:   --bgLight: #f5f5f5;
11:   --bgWhite: #fff;
12:   --transition: all 0.3s ease;
13:   --fontSize: 15px;
14:   --boxShadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 -1px 4px rgba(0, 0, 0, 0.02);
15:   --borderLight: 1px solid #00000030;
16:   --Font: "Sahel", sans-serif;
17: }
18: /* ================= Font ================= */
19: @font-face {
20:   font-family: "Sahel";
21:   src: url("/sahel-font-v1.0.0-alpha9/Sahel.woff") format("woff"),
22:        url("/sahel-font-v1.0.0-alpha9/Sahel.ttf") format("truetype");
23:   font-weight: normal;
24:   font-style: normal;
25:   font-display: swap;
26: }
27: @font-face {
28:   font-family: "Sahel";
29:   src: url("/sahel-font-v1.0.0-alpha9/Sahel-Bold.woff") format("woff"),
30:        url("/sahel-font-v1.0.0-alpha9/Sahel-Bold.ttf") format("truetype");
31:   font-weight: bold;
32:   font-style: normal;
33:   font-display: swap;
34: }
35: @font-face {
36:   font-family: "Sahel";
37:   src: url("/sahel-font-v1.0.0-alpha9/Sahel-Black.woff") format("woff"),
38:        url("/sahel-font-v1.0.0-alpha9/Sahel-Black.ttf") format("truetype");
39:   font-weight: 900;
40:   font-style: normal;
41:   font-display: swap;
42: }
43: /* ================= Reset ================= */
44: * {
45:   margin: 0;
46:   padding: 0;
47:   box-sizing: border-box;
48: }
49: 
50: html {
51:   overflow-x: hidden;
52: }
53: 
54: body {
55:   font-family: var(--Font);
56:   color: var(--textDark);
57:   background: var(--bgLight);
58:   direction: rtl;
59:   overflow-x: hidden;
60:   max-width: 100%;
61: }
62: 
63: /* ================= Focus Indicators (WCAG 2.4.7) ================= */
64: :focus-visible {
65:   outline: 2px solid var(--goldDark);
66:   outline-offset: 2px;
67: }
68: 
69: /* Remove outline only for mouse users */
70: :focus:not(:focus-visible) {
71:   outline: none;
72: }
73: 
74: /* ================= Reduced Motion (WCAG 2.3.3) ================= */
75: @media (prefers-reduced-motion: reduce) {
76:   *,
77:   *::before,
78:   *::after {
79:     animation-duration: 0.01ms !important;
80:     animation-iteration-count: 1 !important;
81:     transition-duration: 0.01ms !important;
82:     scroll-behavior: auto !important;
83:   }
84: }
85: 
86: /* ================= Accessibility Utilities ================= */
87: fieldset {
88:   border: none;
89:   padding: 0;
90:   margin: 0;
91:   min-width: 0;
92: }
93: 
94: .sr-only {
95:   position: absolute;
96:   width: 1px;
97:   height: 1px;
98:   padding: 0;
99:   margin: -1px;
100:   overflow: hidden;
101:   clip: rect(0, 0, 0, 0);
102:   white-space: nowrap;
103:   border-width: 0;
104: }

(End of file - total 104 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\layout.tsx"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\layout.tsx</path>
<type>file</type>
<content>
1: import "./globals.css";
2: import ClientProvider from "./ClientProvider";
3: 
4: export default function RootLayout({
5:   children,
6: }: Readonly<{
7:   children: React.ReactNode;
8: }>) {
9:   return (
10:     <html lang="fa" dir="rtl">
11:       <body suppressHydrationWarning={true}>
12:         <ClientProvider>{children}</ClientProvider>
13:       </body>
14:     </html>
15:   );
16: }

(End of file - total 16 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\flight\\page.tsx"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\flight\page.tsx</path>
<type>file</type>
<content>
1: "use client";
2: import "./globals.css";
3: import Link from "next/link";
4: import Image from "next/image";
5: import Description from "../components/Description";
6: import UsefulWays from "../components/UsefullWays";
7: import Header from "../components/(Headers)/Header";
8: import TravelCards from "../components/TravelCards";
9: import Form2 from "../components/(Forms)/FormType2";
10: import FAQSection from "../components/FAQSection";
11: 
12: const PAGE_DATA = {
13:   offerSection: {
14:     title: "بلیط هواپیما",
15:     links: [
16:       {
17:         id: 1,
18:         href: "/cooperation",
19:         src: "	https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/MBS_1_1a9008da4e.png",
20:         alt: "سازمانی",
21:       },
22:       {
23:         id: 2,
24:         href: "/hotel",
25:         src: "https://mrbilit.com/_ipx/f_webp/https://content.mrbilit.ir/uploads/mrbilit2_Size_2_1000_Hotels_copy_2_0ab8e6c1be.png",
26:         alt: "هتل",
27:       },
28:     ],
29:   },
30:   destinationsSection: {
31:     header: "رزرو بلیط هواپیما داخلی و خارجی",
32:     list: [
33:       {
34:         id: 1,
35:         src: "/kish city.jpg",
36:         alt: "کیش",
37:         title: "بلیط هواپیما کیش",
38:       },
39:       {
40:         id: 2,
41:         src: "/tehran city.jpg",
42:         alt: "تهران",
43:         title: "بلیط هواپیما تهران",
44:       },
45:       {
46:         id: 3,
47:         src: "/mashhad city.jpg",
48:         alt: "مشهد",
49:         title: "بلیط هواپیما مشهد",
50:       },
51:       {
52:         id: 4,
53:         src: "/gheshm city.jpg",
54:         alt: "قشم",
55:         title: "بلیط هواپیما قشم",
56:       },
57:       {
58:         id: 5,
59:         src: "/shiraz city.jpg",
60:         alt: "شیراز",
61:         title: "بلیط هواپیما شیراز",
62:       },
63:       {
64:         id: 6,
65:         src: "/masghat city.jpg",
66:         alt: "مسقط ",
67:         title: "بلیط هواپیما مسقط ",
68:       },
69:       {
70:         id: 7,
71:         src: "/istabul city.jpg",
72:         alt: "استانبول",
73:         title: "بلیط هواپیما استانبول",
74:       },
75:       {
76:         id: 8,
77:         src: "/dubai city.jpg",
78:         alt: "دبی",
79:         title: "بلیط هواپیما دبی",
80:       },
81:     ],
82:   },
83:   airlinesSection: {
84:     title: "شرکت های هواپیمایی",
85:     list: [
86:       {
87:         id: 1,
88:         src: "/Iran_Air.png",
89:         alt: "ایران ایر",
90:         name: "ایران ایر (هما)",
91:         internalLink: "#",
92:         externalLink: "https://www.iranair.com/",
93:         internalText: "دیدن پرواز های این شرکت",
94:         externalText: "درباره ی این شرکت",
95:       },
96:       {
97:         id: 2,
98:         src: "/mahan-air.png",
99:         alt: "ماهان",
100:         name: "ماهان ایر",
101:         internalLink: "#",
102:         externalLink: "https://www.mahan.aero/",
103:         internalText: "دیدن پرواز های این شرکت",
104:         externalText: "درباره ی این شرکت",
105:       },
106:       {
107:         id: 3,
108:         src: "/IranAseman_Air.png",
109:         alt: "آسمان",
110:         name: "آسمان ایر",
111:         internalLink: "#",
112:         externalLink: "https://www.iaa.ir/",
113:         internalText: "دیدن پرواز های این شرکت",
114:         externalText: "درباره ی این شرکت",
115:       },
116:       {
117:         id: 4,
118:         src: "/Kish_Air.png",
119:         alt: "کیش ایر",
120:         name: "کیش ایر",
121:         internalLink: "#",
122:         externalLink: "https://www.kishairlines.com/",
123:         internalText: "دیدن پرواز های این شرکت",
124:         externalText: "درباره ی این شرکت",
125:       },
126:       {
127:         id: 5,
128:         src: "/Gheshm_Air.png",
129:         alt: "قشم ایر",
130:         name: "قشم ایر",
131:         internalLink: "#",
132:         externalLink: "https://www.qeshm-air.ir/",
133:         internalText: "دیدن پرواز های این شرکت",
134:         externalText: "درباره ی این شرکت",
135:       },
136:       {
137:         id: 6,
138:         src: "/Zagros_Air.png",
139:         alt: "زاگرس",
140:         name: "زاگرس ایر",
141:         internalLink: "#",
142:         externalLink: "https://www.zagrosairlines.com/",
143:         internalText: "دیدن پرواز های این شرکت",
144:         externalText: "درباره ی این شرکت",
145:       },
146:       {
147:         id: 7,
148:         src: "/Ata_Air.png",
149:         alt: "آتا",
150:         name: "آتا ایر",
151:         internalLink: "#",
152:         externalLink: "https://www.ataair.ir/",
153:         internalText: "دیدن پرواز های این شرکت",
154:         externalText: "درباره ی این شرکت",
155:       },
156:     ],
157:   },
158:   faqSection: {
159:     title: "سوالات متداول",
160:     list: [
161:       {
162:         id: 1,
163:         question: "آیا امکان لغو رزرو بلیط هواپیما وجود دارد؟",
164:         answer:
165:           "بله، طبق قوانین هر ایرلاین، لغو بلیط تا ساعات مشخصی قبل از پرواز با کسر جریمه امکان‌پذیر است.",
166:       },
167:       {
168:         id: 2,
169:         question: "هزینه چمدان اضافی در پروازهای داخلی چقدر است؟",
170:         answer:
171:           "معمولاً ۱۵ کیلوگرم اول رایگان است. برای وزن اضافی، نرخ هر کیلوگرم بسته به ایرلاین متفاوت (حدود ۵۰ تا ۱۵۰ هزار تومان) می‌باشد.",
172:       },
173:       {
174:         id: 3,
175:         question: "بهترین زمان برای خرید بلیط هواپیما کی است؟",
176:         answer:
177:           "حداقل ۳ تا ۶ هفته قبل از سفر، به‌ویژه در روزهای سه‌شنبه و چهارشنبه، قیمت‌ها مناسب‌تر است.",
178:       },
179:       {
180:         id: 4,
181:         question: "آیا برای کودکان زیر ۲ سال بلیط جداگانه نیاز است؟",
182:         answer:
183:           "بله، کودکان زیر ۲ سال با ۱۰٪ قیمت بزرگسال (بلیط بغل) و بدون صندلی مجزا سفر می‌کنند.",
184:       },
185:     ],
186:   },
187: };
188: 
189: const Page = () => {
190:   return (
191:     <>
192:       <Header banner="/FlightBanner.png" bannerMobile="/FlightBanner-mobile.png" />
193:       <TravelCards />
194:       <Form2 />
195:       <main>
196:         <div className="main">
197:           <section>
198:             <div className="ImgForOfer">
199:               <div className="top">
200:                 <h4>{PAGE_DATA.offerSection.title}</h4>
201:               </div>
202:               <div className="bottom">
203:                 {PAGE_DATA.offerSection.links.map((link) => (
204:                   <Link key={link.id} href={link.href} style={{ display: "block" }}>
205:                     <div style={{ position: "relative", width: "100%", height: "270px" }}>
206:                       <Image src={link.src} alt={link.alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
207:                     </div>
208:                   </Link>
209:                 ))}
210:               </div>
211:             </div>
212:           </section>
213: 
214:           <div className="destinationsContainer">
215:             <section className="destinationsSection">
216:               <header className="destinationsHeader">
217:                 <h5>{PAGE_DATA.destinationsSection.header}</h5>
218:               </header>
219:               <div className="destinationsList">
220:                 {PAGE_DATA.destinationsSection.list &&
221:                 PAGE_DATA.destinationsSection.list.length > 0 ? (
222:                   PAGE_DATA.destinationsSection.list.map((item, i) => (
223:                     <Link
224:                       href={`/flight/flightse?destination=${encodeURIComponent(item.alt)}`}
225:                       key={item.id || i}
226:                       className="destinationItem"
227:                     >
228:                       <Image
229:                         src={item.src}
230:                         alt={item.alt}
231:                         width={140}
232:                         height={140}
233:                         style={{ objectFit: "cover", borderRadius: "8px", width: "auto", height: "auto" }}
234:                       />
235:                       <span>{item.title}</span>
236:                     </Link>
237:                   ))
238:                 ) : (
239:                   <p>هیچ مقصدی یافت نشد</p>
240:                 )}
241:               </div>
242:             </section>
243:           </div>
244: 
245:           <Description />
246: 
247:           <section>
248:             <h2 className="SectionTitle">{PAGE_DATA.airlinesSection.title}</h2>
249:             <div className="MediaScroller">
250:               {PAGE_DATA.airlinesSection.list.map((item, i) => (
251:                 <div key={i} className="MediaElement">
252:                   <div style={{ position: "relative", width: "100px", height: "100px" }}>
253:                     <Image src={item.src} alt={item.alt} fill sizes="100px" style={{ objectFit: "contain" }} />
254:                   </div>
255:                   <p>{item.name}</p>
256:                   <div className="Options2">
257:                     <Link href={item.internalLink}>
258:                       <p>{item.internalText}</p>
259:                     </Link>
260:                     <Link href={item.externalLink}>
261:                       <p>{item.externalText}</p>
262:                     </Link>
263:                   </div>
264:                 </div>
265:               ))}
266:             </div>
267:           </section>
268: 
269:           <FAQSection
270:             faqData={PAGE_DATA.faqSection.list}
271:             title={PAGE_DATA.faqSection.title}
272:           />
273:         </div>
274:         <UsefulWays />
275:       </main>
276:     </>
277:   );
278: };
279: 
280: export default Page;

(End of file - total 280 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\flight\\globals.css"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\flight\globals.css</path>
<type>file</type>
<content>
1: .ImgForOfer {
2:     width: 100%;
3:     max-width: 1200px;
4:     justify-self: center;
5:     gap: 20px;
6:     display: grid;
7:     .top {
8:         text-align: center;
9:         h4 {
10:             font-size: 21px;
11:             font-weight: bold;
12:         }
13:     }
14:     .bottom {
15:         display: flex;
16:         gap: 20px;
17:         justify-content: space-between;
18:         img {
19:             width: 592px;
20:             height: 270px;
21:         }
22:         @media (max-width: 768px) {
23:             flex-direction: column;
24:             img {
25:                 width: 100%;
26:                 height: auto;
27:             }
28:         }
29:     }
30:     .bottomHotel {
31:         display: grid;
32:     }
33: }
34: .main {
35:     display: grid;
36:     background: var(--bgWhite);
37:     gap: 40px;
38:     padding: 20px 0 0 0;
39:     width: 100%;
40:     max-width: 100%;
41:     overflow-x: hidden;
42: }
43: .destinationsContainer {
44:     display: grid;
45:     gap: 80px;
46:     justify-self: center;
47:     background-color: var(--bgWhite);
48:     width: 100%;
49: 
50:     .destinationsHeader {
51:         h5 {
52:             font-size: 24px;
53:             color: var(--textDark);
54:             font-weight: bold;
55:         }
56:     }
57: 
58:     .destinationsSection {
59:         display: grid;
60:         padding: 20px 0 0 0;
61:         gap: 20px;
62:         width: 100%;
63:         max-width: 1200px;
64:         justify-self: center;
65:         text-align: center;
66: 
67:         .destinationsList {
68:             display: flex;
69:             flex-wrap: wrap;
70:             height: auto;
71:             justify-content: center;
72:             gap: 12px;
73: 
74:             .destinationItem {
75:                 overflow: hidden;
76:                 width: auto;
77:                 height: 190px;
78:                 max-width: 140px;
79:                 border-radius: 20px;
80:                 position: relative;
81:                 flex-shrink: 0;
82: 
83:                 &::after {
84:                     content: "";
85:                     position: absolute;
86:                     inset: 0;
87:                     box-shadow: inset 0 -50px 50px -25px #f5e7b3;
88:                     pointer-events: none;
89:                     border-radius: 20px;
90:                 }
91: 
92:                 img {
93:                     width: 100%;
94:                     height: 100%;
95:                     object-fit: cover;
96:                 }
97: 
98:                 span {
99:                     position: absolute;
100:                     width: 90px;
101:                     text-align: center;
102:                     left: 22px;
103:                     bottom: 30px;
104:                     color: var(--bgWhite);
105:                     font-size: 15px;
106:                     font-weight: bold;
107:                 }
108:             }
109:         }
110:     }
111: }
112: 
113: .description {
114:     box-shadow: none;
115:     gap: 0;
116: }
117: 
118: .ScrollCards {
119:     display: grid;
120:     gap: 20px;
121:     margin-bottom: 20px;
122:     width: 100%;
123:     max-width: 1200px;
124:     justify-self: center;
125:     .SectionTitle {
126:         margin: 0 20px 10px;
127:         font-weight: bold;
128:         color: var(--textDark);
129:         text-align: center;
130:     }
131:     .MediaScroller {
132:         display: grid;
133:         grid-auto-flow: column;
134:         grid-auto-columns: 22%;
135:         padding: 0 20px 20px;
136:         overflow-x: auto;
137:         overscroll-behavior-inline: contain;
138:         scroll-snap-type: inline mandatory;
139:         scroll-padding-inline: 20px;
140:         @media (max-width: 768px) {
141:             grid-auto-columns: 70%;
142:             padding: 0 12px 12px;
143:         }
144:         .MediaElement {
145:             display: grid;
146:             gap: 20px;
147:             padding: 20px;
148:             background: var(--bgWhite);
149:             border-radius: 12px;
150:             border: var(--borderLight);
151:             text-align: center;
152:             width: fit-content;
153:             min-width: 230px;
154: 
155:             p {
156:                 font-weight: bold;
157:                 color: var(--textDark);
158:             }
159:             img {
160:                 justify-self: center;
161:                 max-width: 122px;
162:                 max-height: 122px;
163:                 width: 100%;
164:                 object-fit: cover;
165:                 background: var(--gold);
166:             }
167:         }
168:     }
169: 
170:     .MediaScroller > * {
171:         scroll-snap-align: start;
172:     }
173: }
174: 
175: .FAQSection {
176:     display: grid;
177:     gap: 20px;
178:     width: 100%;
179:     max-width: 1200px;
180:     justify-self: center;
181:     padding: 10px;
182:     margin-bottom: 80px;
183: 
184:     .SectionTitle {
185:         font-size: 20px;
186:         font-weight: bold;
187:         color: var(--textDark);
188:     }
189: 
190:     .FAQWrapper {
191:         background: var(--bgWhite);
192:         border-radius: 16px;
193:         overflow: hidden;
194:         box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
195: 
196:         .FAQItem {
197:             border-bottom: var(--borderLight);
198:             border-color: #00000012;
199: 
200:             &:last-child {
201:                 border-bottom: none;
202:             }
203: 
204:             &.active {
205:                 .Icon {
206:                     transform: rotate(45deg);
207:                 }
208:             }
209: 
210:             .FAQButton {
211:                 width: 100%;
212:                 padding: 20px 24px;
213:                 background: none;
214:                 border: none;
215:                 display: flex;
216:                 justify-content: space-between;
217:                 align-items: center;
218:                 cursor: pointer;
219:                 text-align: right;
220:                 font-size: 16px;
221:                 color: var(--textDark);
222:                 font-family: inherit;
223:                 transition: 0.3s;
224:                 font-weight: 500;
225: 
226:                 &:hover {
227:                     background: var(--grayBgHover);
228:                 }
229: 
230:                 .Icon {
231:                     font-size: 22px;
232:                     color: var(--goldDark);
233:                     transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
234:                 }
235:             }
236: 
237:             .FAQAnswer {
238:                 overflow: hidden;
239:                 background: var(--bgWhite);
240:                 transition:
241:                     max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
242:                     opacity 0.3s ease,
243:                     margin-top 0.3s ease;
244: 
245:                 > * {
246:                     overflow: hidden;
247:                 }
248: 
249:                 p {
250:                     color: var(--textGray);
251:                     line-height: 1.8;
252:                     font-size: 14px;
253:                     margin: 0;
254:                     padding: 0 20px 20px 20px;
255:                 }
256:             }
257:         }
258:     }
259: }
260: .SectionTitle {
261:     margin: 0 20px 10px;
262:     font-weight: bold;
263:     color: var(--textDark);
264:     max-width: 1200px;
265:     width: 100%;
266:     justify-self: center;
267: }
268: .MediaScroller {
269:     display: grid;
270:     grid-auto-flow: column;
271:     grid-auto-columns: 21%;
272:     gap: 20px;
273:     padding: 0 20px 20px;
274:     overflow-x: auto;
275:     overscroll-behavior-inline: contain;
276:     scroll-snap-type: inline mandatory;
277:     scroll-padding-inline: 20px;
278:     max-width: 1200px;
279:     width: 100%;
280:     justify-self: center;
281:     @media (max-width: 768px) {
282:         grid-auto-columns: 70%;
283:         padding: 0 12px 12px;
284:     }
285:     .MediaElement {
286:         display: grid;
287:         gap: 20px;
288:         padding: 20px;
289:         background: var(--bgWhite);
290:         border-radius: 12px;
291:         border: var(--borderLight);
292:         text-align: center;
293:         p {
294:             font-weight: bold;
295:             color: var(--textDark);
296:         }
297:         img {
298:             justify-self: center;
299:             width: 122px;
300:             height: 122px;
301:             width: 100%;
302:             object-fit: cover;
303:         }
304:         .Options2 {
305:             display: flex;
306:             a {
307:                 display: flex;
308:                 flex-wrap: nowrap;
309:                 text-decoration: none;
310:                 font-size: 12px;
311:                 font-weight: normal;
312:                 p {
313:                     transition: 0.3s;
314:                 }
315:                 &:hover {
316:                     p {
317:                         color: var(--goldDark);
318:                     }
319:                 }
320:             }
321:         }
322:     }
323: }
324: 
325: .MediaScroller > * {
326:     scroll-snap-align: start;
327: }
328: 
329: /* ===== Flight Page Mobile Fixes ===== */
330: @media (max-width: 768px) {
331:     .main {
332:         padding: 16px 16px 0;
333:         gap: 28px;
334:     }
335:     /* 1. ImgForOfer mobile */
336:     .ImgForOfer {
337:         padding: 0;
338:     }
339:     .ImgForOfer .top h4 {
340:         font-size: 18px;
341:     }
342:     .ImgForOfer .bottom {
343:         gap: 16px;
344:     }
345:     .ImgForOfer .bottom img {
346:         height: auto;
347:         max-height: 200px;
348:     }
349:     /* 2. destinationsSection mobile */
350:     .destinationsContainer {
351:         gap: 32px;
352:         padding: 0;
353:     }
354:     .destinationsContainer .destinationsHeader h5 {
355:         font-size: 20px;
356:     }
357:     .destinationsContainer .destinationsSection {
358:         padding: 0;
359:     }
360:     .destinationsContainer .destinationsList .destinationItem {
361:         max-width: 110px;
362:         height: 150px;
363:     }
364:     .destinationsContainer .destinationsList .destinationItem span {
365:         font-size: 13px;
366:         left: 50%;
367:         transform: translateX(-50%);
368:         bottom: 16px;
369:         width: auto;
370:         max-width: 90%;
371:         white-space: nowrap;
372:         overflow: hidden;
373:         text-overflow: ellipsis;
374:     }
375:     /* 3. description mobile (global fix already applies, verify /flight override) */
376:     .description {
377:         box-shadow: none;
378:     }
379:     .description .cards .item {
380:         max-width: 320px;
381:     }
382:     /* 4. MediaScroller mobile */
383:     .MediaScroller .MediaElement .Options2 {
384:         flex-wrap: wrap;
385:         gap: 8px;
386:         justify-content: center;
387:     }
388:     .MediaScroller .MediaElement .Options2 a {
389:         font-size: 11px;
390:         white-space: nowrap;
391:     }
392:     .SectionTitle {
393:         margin: 0 0 10px;
394:         font-size: 18px;
395:     }
396:     .FAQSection {
397:         padding: 0 12px;
398:         margin-bottom: 40px;
399:     }
400:     .FAQSection .FAQButton {
401:         font-size: 14px;
402:         padding: 16px;
403:     }
404: }

(End of file - total 404 lines)
</content>
```

---

## Assistant (Build · Glm 5.2 · 6.1s)

_Thinking:_

Now let me read the rest of the flight folder files. Let me read flightch, flightse, and reserve files.

Now let me read the rest of the flight folder files.

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\flight\\flightch\\page.tsx"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\flight\flightch\page.tsx</path>
<type>file</type>
<content>
1: "use client";
2: 
3: import { useState, useEffect } from "react";
4: import { useRouter } from "next/navigation";
5: import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
6: import {
7:   faClock,
8:   faPlus,
9:   faUserClock,
10:   faTrash,
11: } from "@fortawesome/free-solid-svg-icons";
12: import "./globals.css";
13: import HeaderAutoReserve from "../../components/(Headers)/HeaderAutoReserve";
14: import { useToast } from "../../lib/hooks/useToast";
15: 
16: interface PassengerData {
17:   id: number;
18:   type: string;
19:   typeLabel: string;
20:   gender: string;
21:   nationality: string;
22:   issuingCountry: string;
23: }
24: 
25: const PAGE_DATA = {
26:   timeoutModal: {
27:     title: "زمان شما به پایان رسید!",
28:     message: "برای امنیت تراکنش، مهلت رزرو ۱۰ دقیقه می‌باشد.",
29:     buttonText: "متوجه شدم",
30:   },
31:   passengerCard: {
32:     title: "ورود اطلاعات مسافران",
33:     genderOptions: ["آقا", "خانوم"],
34:     nationalityOptions: [
35:       { value: "iranian", label: "ایرانی" },
36:       { value: "foreign", label: "خارجی" },
37:     ],
38:     countries: [
39:       { value: "US", label: "ایالات متحده" },
40:       { value: "GB", label: "بریتانیا" },
41:       { value: "DE", label: "آلمان" },
42:       { value: "FR", label: "فرانسه" },
43:       { value: "TR", label: "ترکیه" },
44:       { value: "AE", label: "امارات متحده عربی" },
45:       { value: "CA", label: "کانادا" },
46:     ],
47:     labels: {
48:       firstName: "نام به انگلیسی",
49:       lastName: "نام خانوادگی به انگلیسی",
50:       nationalId: "شماره ملی",
51:       issuingCountry: "کشور صادرکننده پاسپورت",
52:       passportNumber: "شماره گذرنامه",
53:       expiryDate: "تاریخ انقضای گذرنامه",
54:       birthDate: "تاریخ تولد",
55:     },
56:     days: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
57:     months: [
58:       { value: "1", label: "فروردین" },
59:       { value: "2", label: "اردیبهشت" },
60:       { value: "3", label: "خرداد" },
61:       { value: "4", label: "تیر" },
62:       { value: "5", label: "مرداد" },
63:       { value: "6", label: "شهریور" },
64:       { value: "7", label: "مهر" },
65:       { value: "8", label: "آبان" },
66:       { value: "9", label: "آذر" },
67:       { value: "10", label: "دی" },
68:       { value: "11", label: "بهمن" },
69:       { value: "12", label: "اسفند" },
70:     ],
71:     placeholders: {
72:       firstName: "First Name",
73:       lastName: "Last Name",
74:       nationalId: "شماره ملی",
75:       passportNumber: "Passport Number",
76:       issuingCountry: "انتخاب کشور...",
77:       year: "سال",
78:       day: "روز",
79:       month: "ماه",
80:     },
81:     previousPassengersLabel: "مسافران قبلی",
82:   },
83:   addPassenger: {
84:     title: "افزودن مسافر",
85:     types: [
86:       { type: "adult", label: "بزرگسال" },
87:       { type: "child", label: "کودک" },
88:       { type: "infant", label: "نوزاد" },
89:     ],
90:     alertMessage:
91:       "به ازای هر بزرگسال حداکثر ۳ همراه مجاز است. شما در حال حاضر {adultCount} بزرگسال و {nonAdultCount} همراه دارید. ابتدا بزرگسال جدید اضافه کنید.",
92:   },
93:   contactInfo: {
94:     title: "اطلاعات تماس",
95:     mobileLabel: "تلفن همراه",
96:     mobilePlaceholder: "0912...",
97:     phoneLabel: "تلفن ثابت",
98:     phonePlaceholder: "021...",
99:     emailLabel: "ایمیل",
100:     emailPlaceholder: "Email@example.com",
101:   },
102:   flightInfo: {
103:     originCity: "تهران",
104:     destinationCity: "تهران",
105:     departureTime: "6:00",
106:     arrivalTime: "7:00",
107:     penaltyText: "قوانین جریمه و استرداد",
108:     charterBadge: "چارتری",
109:     dotCount: 28,
110:     airplaneIcon: "✈",
111:   },
112:   billCard: {
113:     title: "صورتحساب",
114:   },
115:   confirmButton: {
116:     text: "تایید و ادامه",
117:     arrow: "←",
118:   },
119:   timeFormat: {
120:     label: "زمان باقیمانده",
121:   },
122: };
123: 
124: const NiksaPassengerInfo = () => {
125:   const router = useRouter();
126:   const [timeLeft, setTimeLeft] = useState(600);
127:   const [showTimeoutModal, setShowTimeoutModal] = useState(false);
128:   const toast = useToast();
129: 
130:   const [passengers, setPassengers] = useState<PassengerData[]>([
131:     {
132:       id: Date.now(),
133:       type: "adult",
134:       typeLabel: "بزرگسال",
135:       gender: "آقا",
136:       nationality: "iranian",
137:       issuingCountry: "",
138:     },
139:   ]);
140: 
141:   useEffect(() => {
142:     if (timeLeft <= 0) {
143:       setShowTimeoutModal(true);
144:       return;
145:     }
146:     const timer = setInterval(() => {
147:       setTimeLeft((prev) => prev - 1);
148:     }, 1000);
149:     return () => clearInterval(timer);
150:   }, [timeLeft]);
151: 
152:   const formatTime = (seconds: number): string => {
153:     const mins = Math.floor(seconds / 60);
154:     const secs = seconds % 60;
155:     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
156:   };
157: 
158:   const handleAddPassenger = (pType: string, pLabel: string) => {
159:     const adultCount = passengers.filter((p) => p.type === "adult").length;
160:     const nonAdultCount = passengers.filter((p) => p.type !== "adult").length;
161: 
162:     if (pType === "adult") {
163:       addNew(pType, pLabel);
164:     } else {
165:       if (nonAdultCount >= adultCount * 3) {
166:         toast.warning(
167:           PAGE_DATA.addPassenger.alertMessage
168:             .replace("{adultCount}", adultCount.toString())
169:             .replace("{nonAdultCount}", nonAdultCount.toString()),
170:         );
171:         return;
172:       }
173:       addNew(pType, pLabel);
174:     }
175:   };
176: 
177:   const addNew = (type: string, label: string) => {
178:     setPassengers([
179:       ...passengers,
180:       {
181:         id: Date.now() + Math.random(),
182:         type: type,
183:         typeLabel: label,
184:         gender: "آقا",
185:         nationality: "iranian",
186:         issuingCountry: "",
187:       },
188:     ]);
189:   };
190: 
191:   const updatePassenger = (id: number, field: keyof PassengerData, value: string) => {
192:     setPassengers((prev) =>
193:       prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
194:     );
195:   };
196: 
197:   const removePassenger = (id: number) => {
198:     if (passengers.length > 1) {
199:       setPassengers((prev) => prev.filter((p) => p.id !== id));
200:     }
201:   };
202: 
203:   return (
204:     <>
205:       <HeaderAutoReserve currentStep={3} />
206: 
207:       {showTimeoutModal && (
208:         <div
209:           style={{
210:             position: "fixed",
211:             top: 0,
212:             left: 0,
213:             width: "100%",
214:             height: "100%",
215:             backgroundColor: "rgba(0,0,0,0.8)",
216:             display: "flex",
217:             justifyContent: "center",
218:             alignItems: "center",
219:             zIndex: 1000,
220:             backdropFilter: "blur(8px)",
221:           }}
222:         >
223:           <div
224:             style={{
225:               backgroundColor: "white",
226:               padding: "40px",
227:               borderRadius: "20px",
228:               textAlign: "center",
229:               direction: "rtl",
230:               boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
231:             }}
232:           >
233:             <h2 style={{ color: "#d32f2f", marginBottom: "15px" }}>
234:               {PAGE_DATA.timeoutModal.title}
235:             </h2>
236:             <p style={{ color: "#555" }}>{PAGE_DATA.timeoutModal.message}</p>
237:             <button
238:               onClick={() => router.push("/")}
239:               style={{
240:                 marginTop: "25px",
241:                 padding: "12px 30px",
242:                 backgroundColor: "#1a73e8",
243:                 color: "white",
244:                 border: "none",
245:                 borderRadius: "10px",
246:                 cursor: "pointer",
247:                 fontWeight: "bold",
248:               }}
249:             >
250:               {PAGE_DATA.timeoutModal.buttonText}
251:             </button>
252:           </div>
253:         </div>
254:       )}
255: 
256:       <div className="container">
257:         <div className="Right">
258:           {passengers.map((passenger, index) => (
259:             <div className="Card" key={passenger.id}>
260:               <div className="TopCard">
261:                 <p>{PAGE_DATA.passengerCard.title}</p>
262:                 <div className="Clock">
263:                   <p>{formatTime(timeLeft)}</p>
264:                   <FontAwesomeIcon icon={faClock} />
265:                 </div>
266:               </div>
267: 
268:               <div className="bottomCard">
269:                 <div className="gender">
270:                   <div className="nationality">
271:                     <p>
272:                       {index + 1}. {passenger.typeLabel}
273:                     </p>
274:                     <div className="gender-radios">
275:                       {PAGE_DATA.passengerCard.genderOptions.map((g, idx) => (
276:                         <label key={idx}>
277:                           <input
278:                             type="radio"
279:                             name={`gender-${passenger.id}`}
280:                             checked={passenger.gender === g}
281:                             onChange={() =>
282:                               updatePassenger(passenger.id, "gender", g)
283:                             }
284:                           />
285:                           {g}
286:                         </label>
287:                       ))}
288:                     </div>
289:                     <select
290:                       value={passenger.nationality}
291:                       onChange={(e) =>
292:                         updatePassenger(
293:                           passenger.id,
294:                           "nationality",
295:                           e.target.value,
296:                         )
297:                       }
298:                     >
299:                       {PAGE_DATA.passengerCard.nationalityOptions.map((opt) => (
300:                         <option key={opt.value} value={opt.value}>
301:                           {opt.label}
302:                         </option>
303:                       ))}
304:                     </select>
305:                   </div>
306:                   <div className="addNew">
307:                     <FontAwesomeIcon icon={faUserClock} />
308:                     <p>{PAGE_DATA.passengerCard.previousPassengersLabel}</p>
309:                     {index > 0 && (
310:                       <FontAwesomeIcon
311:                         icon={faTrash}
312:                         style={{
313:                           marginRight: "15px",
314:                           color: "#ff4d4d",
315:                           cursor: "pointer",
316:                         }}
317:                         onClick={() => removePassenger(passenger.id)}
318:                       />
319:                     )}
320:                   </div>
321:                 </div>
322: 
323:                 <div className="OtherInoformation">
324:                   <div className="top">
325:                     <label>
326:                       {PAGE_DATA.passengerCard.labels.firstName}
327:                       <input
328:                         type="text"
329:                         placeholder={
330:                           PAGE_DATA.passengerCard.placeholders.firstName
331:                         }
332:                       />
333:                     </label>
334:                     <label>
335:                       {PAGE_DATA.passengerCard.labels.lastName}
336:                       <input
337:                         type="text"
338:                         placeholder={
339:                           PAGE_DATA.passengerCard.placeholders.lastName
340:                         }
341:                       />
342:                     </label>
343:                   </div>
344: 
345:                   <div className="bottom">
346:                     {passenger.nationality === "iranian" ? (
347:                       <label style={{ flex: 1 }}>
348:                         {PAGE_DATA.passengerCard.labels.nationalId}
349:                         <input
350:                           type="text"
351:                           placeholder={
352:                             PAGE_DATA.passengerCard.placeholders.nationalId
353:                           }
354:                         />
355:                       </label>
356:                     ) : (
357:                       <label className="CountrySelectors" style={{ flex: 1 }}>
358:                         {PAGE_DATA.passengerCard.labels.issuingCountry}
359:                         <select
360:                           value={passenger.issuingCountry}
361:                           onChange={(e) =>
362:                             updatePassenger(
363:                               passenger.id,
364:                               "issuingCountry",
365:                               e.target.value,
366:                             )
367:                           }
368:                         >
369:                           <option value="">
370:                             {PAGE_DATA.passengerCard.placeholders
371:                               .issuingCountry || "انتخاب کشور..."}
372:                           </option>
373:                           {PAGE_DATA.passengerCard.countries.map((c) => (
374:                             <option key={c.value} value={c.value}>
375:                               {c.label}
376:                             </option>
377:                           ))}
378:                         </select>
379:                       </label>
380:                     )}
381: 
382:                     <label style={{ flex: 1 }}>
383:                       {PAGE_DATA.passengerCard.labels.birthDate}
384:                       <div className="dateSelectors">
385:                         <select>
386:                           <option value="">
387:                             {PAGE_DATA.passengerCard.placeholders.day}
388:                           </option>
389:                           {PAGE_DATA.passengerCard.days.map((d) => (
390:                             <option key={d} value={d}>
391:                               {d}
392:                             </option>
393:                           ))}
394:                         </select>
395:                         <select>
396:                           <option value="">
397:                             {PAGE_DATA.passengerCard.placeholders.month}
398:                           </option>
399:                           {PAGE_DATA.passengerCard.months.map((m) => (
400:                             <option key={m.value} value={m.value}>
401:                               {m.label}
402:                             </option>
403:                           ))}
404:                         </select>
405:                         <input
406:                           type="number"
407:                           placeholder={
408:                             PAGE_DATA.passengerCard.placeholders.year
409:                           }
410:                         />
411:                       </div>
412:                     </label>
413:                   </div>
414: 
415:                   {passenger.nationality === "foreign" && (
416:                     <div className="bottom" style={{ marginTop: "10px" }}>
417:                       <label style={{ flex: 1 }}>
418:                         {PAGE_DATA.passengerCard.labels.passportNumber}
419:                         <input
420:                           type="text"
421:                           placeholder={
422:                             PAGE_DATA.passengerCard.placeholders.passportNumber
423:                           }
424:                         />
425:                       </label>
426: 
427:                       <label style={{ flex: 1 }}>
428:                         {PAGE_DATA.passengerCard.labels.expiryDate}
429:                         <div className="dateSelectors">
430:                           <select>
431:                             <option value="">
432:                               {PAGE_DATA.passengerCard.placeholders.day}
433:                             </option>
434:                             {PAGE_DATA.passengerCard.days.map((d) => (
435:                               <option key={d} value={d}>
436:                                 {d}
437:                               </option>
438:                             ))}
439:                           </select>
440:                           <select>
441:                             <option value="">
442:                               {PAGE_DATA.passengerCard.placeholders.month}
443:                             </option>
444:                             {PAGE_DATA.passengerCard.months.map((m) => (
445:                               <option key={m.value} value={m.value}>
446:                                 {m.label}
447:                               </option>
448:                             ))}
449:                           </select>
450:                           <input
451:                             type="number"
452:                             placeholder={
453:                               PAGE_DATA.passengerCard.placeholders.year
454:                             }
455:                           />
456:                         </div>
457:                       </label>
458:                     </div>
459:                   )}
460:                 </div>
461:               </div>
462:             </div>
463:           ))}
464: 
465:           <div className="AddMember">
466:             <p>{PAGE_DATA.addPassenger.title}</p>
467:             <div className="AddOptions">
468:               {PAGE_DATA.addPassenger.types.map((t, index) => {
469:                 const adultCount = passengers.filter(
470:                   (p) => p.type === "adult",
471:                 ).length;
472:                 const nonAdultCount = passengers.filter(
473:                   (p) => p.type !== "adult",
474:                 ).length;
475:                 const isDisabled =
476:                   t.type !== "adult" && nonAdultCount >= adultCount * 3;
477: 
478:                 return (
479:                   <button
480:                     key={index}
481:                     type="button"
482:                     onClick={() => handleAddPassenger(t.type, t.label)}
483:                     style={{
484:                       opacity: isDisabled ? 0.5 : 1,
485:                       cursor: isDisabled ? "not-allowed" : "pointer",
486:                     }}
487:                   >
488:                     <FontAwesomeIcon icon={faPlus} />
489:                     {t.label}
490:                   </button>
491:                 );
492:               })}
493:             </div>
494:           </div>
495: 
496:           <div className="Card">
497:             <div className="TopCard">
498:               <p>{PAGE_DATA.contactInfo.title}</p>
499:             </div>
500:             <div className="bottomCard">
501:               <div className="OtherInoformation">
502:                 <div className="top">
503:                   <label>
504:                     {PAGE_DATA.contactInfo.mobileLabel}
505:                     <input
506:                       type="text"
507:                       placeholder={PAGE_DATA.contactInfo.mobilePlaceholder}
508:                     />
509:                   </label>
510:                   <label>
511:                     {PAGE_DATA.contactInfo.phoneLabel}
512:                     <input
513:                       type="text"
514:                       placeholder={PAGE_DATA.contactInfo.phonePlaceholder}
515:                     />
516:                   </label>
517:                 </div>
518:                 <div className="bottom">
519:                   <label>
520:                     {PAGE_DATA.contactInfo.emailLabel}
521:                     <input
522:                       type="text"
523:                       placeholder={PAGE_DATA.contactInfo.emailPlaceholder}
524:                     />
525:                   </label>
526:                 </div>
527:               </div>
528:             </div>
529:           </div>
530:         </div>
531:         <div className="left">
532:           <div className="card1">
533:             <div className="top">
534:               <div className="Time">
535:                 <div className="Form">
536:                   <span>{PAGE_DATA.flightInfo.departureTime}</span>
537:                   <p>{PAGE_DATA.flightInfo.originCity}</p>
538:                 </div>
539:                 <div className="i">
540:                   {Array.from({ length: PAGE_DATA.flightInfo.dotCount }).map(
541:                     (_, idx) => (
542:                       <span key={idx}>•</span>
543:                     ),
544:                   )}
545:                   <span>{PAGE_DATA.flightInfo.airplaneIcon}</span>
546:                 </div>
547:                 <div className="Form">
548:                   <span>{PAGE_DATA.flightInfo.arrivalTime}</span>
549:                   <p>{PAGE_DATA.flightInfo.destinationCity}</p>
550:                 </div>
551:               </div>
552:             </div>
553:             <div className="bottom">
554:               <p>{PAGE_DATA.flightInfo.penaltyText}</p>
555:               <div className="Avablity">
556:                 <span>{PAGE_DATA.flightInfo.charterBadge}</span>
557:               </div>
558:             </div>
559:           </div>
560:           <div className="card2">
561:             <span>{PAGE_DATA.billCard.title}</span>
562:           </div>
563:           <button>
564:             {PAGE_DATA.confirmButton.text}{" "}
565:             <span>{PAGE_DATA.confirmButton.arrow}</span>
566:           </button>
567:         </div>
568:       </div>
569:     </>
570:   );
571: };
572: 
573: export default NiksaPassengerInfo;

(End of file - total 573 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\flight\\flightch\\globals.css"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\flight\flightch\globals.css</path>
<type>file</type>
<content>
1: .container {
2:   padding: 40px 0;
3:   width: 100%;
4:   max-width: 1200px;
5:   justify-self: center;
6:   background: none;
7:   display: flex;
8:   gap: 20px;
9:   .Right {
10:     display: grid;
11:     gap: 10px;
12:     .Card {
13:       position: relative;
14:       background-color: var(--bgWhite);
15:       box-shadow: var(--boxShadow);
16:       padding: 20px;
17:       border-radius: 12px;
18:       .Titel {
19:         h3 {
20:           font-size: 20px;
21:         }
22:         p {
23:           font-size: 14px;
24:           font-weight: normal;
25:           color: var(--textGray);
26:         }
27:       }
28:       .TopCard {
29:         display: flex;
30:         justify-content: space-between;
31:         padding-bottom: 20px;
32:         border-bottom: var(--borderLight);
33:         p {
34:           font-size: 20px;
35:           font-weight: bold;
36:           color: var(--textDark);
37:         }
38:         .Clock {
39:           display: flex;
40:           gap: 5px;
41:           align-items: center;
42:           p {
43:             font-size: 17px;
44:             font-weight: 500;
45:           }
46:           i {
47:             opacity: 1;
48:           }
49:         }
50:       }
51:       .bottomCard {
52:         padding-top: 20px;
53:         display: grid;
54:         gap: 20px;
55:         .gender {
56:           display: flex;
57:           justify-content: space-between;
58:           width: 95%;
59:           i {
60:             opacity: 1;
61:           }
62:           .nationality {
63:             display: flex;
64:             gap: 20px;
65:             p {
66:               font-size: 15px;
67:               font-weight: bold;
68:               color: var(--textDark);
69:             }
70:             label {
71:               display: flex;
72:               gap: 20px;
73:               color: var(--goldDark);
74:               label {
75:                 display: flex;
76:                 gap: 5px;
77:                 input[type="radio"] {
78:                   appearance: none;
79:                   width: 14px;
80:                   height: 14px;
81:                   border: 2px solid var(--goldDark);
82:                   border-radius: 50%;
83:                   cursor: pointer;
84:                   transition: 0.2s;
85:                   &:hover {
86:                     background-color: #e6b8005e;
87:                     transition: 0.5s;
88:                   }
89:                   &:checked {
90:                     background-color: var(--gold);
91:                     border: 2px solid var(--goldDark);
92:                     transition: 0.8s;
93:                   }
94:                 }
95:               }
96:             }
97:             select {
98:               border: none;
99:               font-weight: bold;
100:               color: var(--goldDark);
101:               font-size: 14px;
102:               font-family: var(--Font);
103:               cursor: pointer;
104:               appearance: none;
105:               -webkit-appearance: none;
106:               -moz-appearance: none;
107:               background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
108:               background-repeat: no-repeat;
109:               background-position: left 10px center;
110:               background-size: 15px;
111:               padding-left: 30px;
112:               padding-right: 10px;
113:               option {
114:                 width: 190px;
115:                 border: none;
116:               }
117:               &:focus {
118:                 outline: none;
119:                 background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='18 15 12 9 6 15'%3E%3C/polyline%3E%3C/svg%3E");
120:               }
121:               &:focus-visible {
122:                 outline: none;
123:               }
124:             }
125:             .gender-radios {
126:               display: flex;
127:               direction: ltr;
128:               gap: 10px;
129:               label {
130:                 display: flex;
131:                 gap: 5px;
132:               }
133:             }
134:           }
135:           .addNew {
136:             display: flex;
137:             gap: 5px;
138:             P {
139:               font-size: 14px;
140:               color: var(--goldDark);
141:               font-weight: bold;
142:             }
143:             i {
144:               color: var(--goldDark);
145:               opacity: 1;
146:             }
147:           }
148:         }
149:         .Span {
150:           display: grid;
151:           gap: 5px;
152:           span {
153:             font-size: 12px;
154:             color: var(--textGray);
155:             &:last-of-type {
156:               padding: 5px;
157:               width: fit-content;
158:               border-radius: 8px;
159:               background-color: var(--grayBgHover);
160:             }
161:           }
162:         }
163:         .OtherInoformation {
164:           width: 100%;
165:           display: grid;
166:           gap: 25px;
167:           .top {
168:             display: flex;
169:             justify-content: space-between;
170:             width: 90%;
171:             label {
172:               display: grid;
173:               justify-content: start;
174:               gap: 5px;
175:               margin-right: 15px;
176:               font-size: 14px;
177:               input[type="text"] {
178:                 border: none;
179:                 height: 50px;
180:                 width: 100%;
181:                 max-width: 400px;
182:                 background-color: var(--bgLight);
183:                 font-family: var(--Font);
184:                 color: var(--textDark);
185:                 border-radius: 8px;
186:                 padding: 0 10px;
187:               }
188:             }
189:           }
190:           .bottom {
191:             display: flex;
192:             justify-content: space-between;
193:             label {
194:               display: grid;
195:               justify-content: start;
196:               gap: 5px;
197:               margin-right: 15px;
198:               font-size: 14px;
199:               input[type="text"] {
200:                 border: none;
201:                 height: 50px;
202:                 width: 100%;
203:                 max-width: 400px;
204:                 background-color: var(--bgLight);
205:                 font-family: var(--Font);
206:                 color: var(--textDark);
207:                 border-radius: 8px;
208:                 padding: 0 10px;
209:               }
210:               .dateSelectors {
211:                 display: flex;
212:                 justify-content: start;
213:                 gap: 5px;
214: 
215:                 font-size: 14px;
216:                 input {
217:                   border: none;
218:                   height: 50px;
219:                   width: 130px;
220:                   background-color: var(--bgLight);
221:                   font-family: var(--Font);
222:                   color: var(--textDark);
223:                   border-radius: 8px;
224:                   padding: 0 10px;
225:                 }
226:                 select {
227:                   border: none;
228:                   width: 130px;
229:                   color: var(--textDark);
230:                   background-color: var(--bgLight);
231:                   border-radius: 8px;
232:                   padding: 0 10px;
233:                   cursor: pointer;
234:                   appearance: none;
235:                   -webkit-appearance: none;
236:                   -moz-appearance: none;
237:                   background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
238:                   background-repeat: no-repeat;
239:                   background-position: left 10px center;
240:                   background-size: 15px;
241:                   &:focus {
242:                     border: none;
243:                     background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='18 15 12 9 6 15'%3E%3C/polyline%3E%3C/svg%3E");
244:                   }
245:                   &:focus-visible {
246:                     outline: none;
247:                   }
248:                 }
249:               }
250:             }
251:           }
252:         }
253:       }
254:       .BottomCard {
255:         padding: 12px 0 0 0;
256: 
257:         .Titel {
258:           display: flex;
259:           justify-content: space-between;
260:           p {
261:             font-size: 14px;
262:             &:last-of-type {
263:               font-weight: bold;
264:             }
265:           }
266:           .R {
267:             display: flex;
268:             gap: 10px;
269:           }
270:         }
271:         .AvableFlights {
272:           border: var(--borderLight);
273:           border-radius: 12px;
274:           display: grid;
275:           gap: 12px;
276:           padding: 12px 16px;
277:           .Option {
278:             display: flex;
279:             justify-content: space-between;
280:             font-size: 14px;
281:             font-weight: bold;
282:             border-bottom: var(--borderLight);
283:             padding-bottom: 8px;
284:             align-items: center;
285:             &:last-child {
286:               border: none;
287:             }
288:             .R {
289:               display: flex;
290:               gap: 10px;
291:               width: 80%;
292:               height: 40px;
293:               padding: 2px;
294:               p {
295:                 margin: auto 0;
296:               }
297:               img {
298:                 width: auto;
299:               }
300:             }
301:           }
302:         }
303:         .TextTi {
304:           display: flex;
305:           justify-content: space-between;
306:           p {
307:             font-size: 12px;
308:             &:last-of-type {
309:               font-size: 17px;
310:               font-weight: bold;
311:               color: var(--goldText);
312:               span {
313:                 font-size: 14px;
314:                 font-weight: normal;
315:               }
316:             }
317:           }
318:         }
319:         .Enable {
320:           display: flex;
321:           justify-content: space-between;
322:           align-items: center;
323:           border: var(--borderLight);
324:           padding: 12px;
325:           border-radius: 12px;
326:           .R {
327:             display: flex;
328:             gap: 12px;
329:             align-items: center;
330:             .Content {
331:               display: grid;
332:               gap: 3px;
333:               p {
334:                 font-size: 12px;
335:                 font-weight: bold;
336:                 &:last-of-type {
337:                   font-size: 14px;
338:                   font-weight: normal;
339:                 }
340:               }
341:             }
342:           }
343:           .L {
344:             .switch {
345:               position: relative;
346:               display: inline-block;
347:               width: 44px;
348:               height: 24px;
349:               input {
350:                 opacity: 0;
351:                 width: 0;
352:                 height: 0;
353:               }
354:               .slider {
355:                 position: absolute;
356:                 cursor: pointer;
357:                 top: 0;
358:                 left: 0;
359:                 right: 0;
360:                 bottom: 0;
361:                 background-color: #ccc;
362:                 transition: 0.4s;
363:                 border-radius: 34px;
364:                 &::before {
365:                   position: absolute;
366:                   content: "";
367:                   height: 20px;
368:                   width: 20px;
369:                   left: 2px;
370:                   bottom: 2px;
371:                   background-color: white;
372:                   transition: 0.4s;
373:                   border-radius: 50%;
374:                 }
375:               }
376:               input:checked + .slider {
377:                 background-color: var(--gold);
378:               }
379:               input:checked + .slider:before {
380:                 transform: translateX(20px);
381:               }
382:             }
383:           }
384:         }
385:         .Rules {
386:           display: grid;
387:           gap: 8px;
388:           p {
389:             font-size: 17px;
390:             font-weight: bold;
391:           }
392:           ul {
393:             padding: 0 20px 0 0;
394:             display: grid;
395:             gap: 3px;
396:             li {
397:               font-size: 12px;
398:               font-weight: bold;
399:               color: var(--textGray);
400:             }
401:           }
402:         }
403:       }
404:       .Sec {
405:         display: grid;
406:         gap: 24px;
407:         .Titel {
408:           p {
409:             font-size: 17px;
410:             font-weight: bold;
411:           }
412:         }
413:       }
414:     }
415:     .Card2 {
416:       width: 100%;
417:     }
418:     .AddMember {
419:       position: relative;
420:       background-color: var(--bgWhite);
421:       box-shadow: var(--boxShadow);
422:       padding: 20px;
423:       border-radius: 12px;
424:       display: flex;
425:       justify-content: space-between;
426:       color: var(--textDark);
427:       font-size: 15px;
428:       .AddOptions {
429:         display: flex;
430:         gap: 12px;
431:         button {
432:           border: none;
433:           background: none;
434:           font-family: var(--Font);
435:           color: var(--goldDark);
436:           font-size: 13px;
437:           gap: 10px;
438:           align-items: center;
439:           cursor: pointer;
440:         }
441:         i {
442:           height: fit-content;
443:           opacity: 1;
444:         }
445:       }
446:     }
447:   }
448:   .left {
449:     width: 330px;
450:     display: flex;
451:     flex-direction: column;
452:     gap: 10px;
453:     .card1 {
454:       width: 100%;
455:       position: relative;
456:       background-color: var(--bgWhite);
457:       box-shadow: var(--boxShadow);
458:       padding: 10px;
459:       border-radius: 12px;
460:       display: grid;
461:       gap: 10px;
462:       overflow: hidden;
463:       .Time {
464:         position: static;
465:         width: 100%;
466:         display: flex;
467:         align-items: center;
468:         .Form {
469:           padding: 0;
470:           display: grid;
471:           justify-content: start;
472:           span {
473:             font-size: 24px;
474:           }
475:           p {
476:             font-size: var(--fontSize);
477:             color: var(--textGray);
478:             text-align: center;
479:           }
480:         }
481:         .i {
482:           align-items: center;
483:           display: flex;
484:           margin: 8px;
485:           color: var(--textGray);
486:           opacity: 0.7;
487:           i {
488:             font-size: 12px;
489:           }
490:         }
491:       }
492:       .bottom {
493:         display: flex;
494:         justify-content: space-between;
495:         align-items: center;
496:         p {
497:           font-size: 14px;
498:           color: var(--textDark);
499:         }
500:         .Avablity {
501:           display: flex;
502:           width: auto;
503:           span {
504:             display: flex;
505:             align-items: center;
506:             font-size: 12px;
507:             height: 28px;
508:             padding: 2px 8px;
509:             background-color: #ffcb1151;
510:             border-radius: 8px;
511:           }
512:         }
513:       }
514:     }
515:     .card2 {
516:       width: 100%;
517:       position: relative;
518:       background-color: var(--bgWhite);
519:       box-shadow: var(--boxShadow);
520:       padding: 10px;
521:       border-radius: 12px;
522:       display: grid;
523:     }
524:     button {
525:       width: 100%;
526:       padding: 10px;
527:       border: none;
528:       background-color: var(--gold);
529:       border-radius: 8px;
530:       box-shadow: var(--boxShadow);
531:       font-family: var(--Font);
532:       font-weight: bold;
533:       cursor: pointer;
534:       transition: 0.3s;
535:       &:hover {
536:         background: var(--goldDark);
537:       }
538:     }
539:   }
540: }
541: .CountrySelectors {
542:   width: 100%;
543:   display: flex !important; /* تغییر از grid به flex */
544:   flex-direction: column;
545:   justify-content: start;
546:   gap: 5px;
547:   margin-right: 0px;
548:   font-size: 14px;
549:   box-sizing: border-box;
550: 
551:   select {
552:     border: none;
553:     width: 100% !important; /* تضمین عرض کامل */
554:     min-width: 100%;
555:     height: 100%;
556:     color: var(--textDark);
557:     background-color: var(--bgLight);
558:     border-radius: 8px;
559:     padding: 18px 10px; /* تنظیم پدینگ برای هماهنگی با اینپوت‌ها */
560:     cursor: pointer;
561:     appearance: none;
562:     -webkit-appearance: none;
563:     -moz-appearance: none;
564:     background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
565:     background-repeat: no-repeat;
566:     background-position: left 10px center;
567:     background-size: 15px;
568:     box-sizing: border-box; /* جلوگیری از بیرون زدگی به خاطر پدینگ */
569: 
570:     &:focus {
571:       outline: none;
572:       background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C5A059' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='18 15 12 9 6 15'%3E%3C/polyline%3E%3C/svg%3E");
573:     }
574:   }
575: }
576: input,select{
577:   font-family: var(--Font);
578: }

(End of file - total 578 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\flight\\flightse\\page.tsx"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\flight\flightse\page.tsx</path>
<type>file</type>
<content>
1: "use client";
2: import { useState, useEffect, Suspense } from "react";
3: import Link from "next/link";
4: import Image from "next/image";
5: import { useSearchParams } from "next/navigation";
6: import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
7: import {
8:   faCircleDot,
9:   faPlane,
10:   faClock,
11:   faAngleDown,
12:   faBell,
13:   faBolt,
14:   faCheck,
15:   faXmark,
16:   faArrowLeft,
17:   faWallet,
18:   faMagnifyingGlass,
19:   faTicket,
20:   faShieldHalved,
21:   faGaugeHigh,
22: } from "@fortawesome/free-solid-svg-icons";
23: import Header from "../../components/(Headers)/SecondHeader";
24: import Form from "../../components/(Forms)/FormType2";
25: import LoadingSkeleton from "../../components/LoadingSkeleton";
26: import FilterSidebar from "../../components/(filters)/FilterSidebar";
27: import FilterAccordion from "../../components/(filters)/FilterAccordion";
28: import PriceRangeFilter from "../../components/(filters)/PriceRangeFilter";
29: import CheckboxFilter from "../../components/(filters)/CheckboxFilter";
30: import "../../components/(filters)/FiltersGlobal.css";
31: import "./globals.css";
32: 
33: interface Flight {
34:   id: number;
35:   airline: string;
36:   airlineCode: string;
37:   logo: string;
38:   departureTime: string;
39:   arrivalTime: string;
40:   origin: string;
41:   originCode: string;
42:   destination: string;
43:   destinationCode: string;
44:   price: number;
45:   flightClass: "economy" | "business";
46:   baggage: string;
47:   departureHour: number;
48:   arrivalHour: number;
49:   seats: number;
50:   tags: string[];
51:   classRate: string;
52:   available: boolean;
53: }
54: 
55: const flightsData: Flight[] = [
56:   {
57:     id: 1,
58:     airline: "چابهار",
59:     airlineCode: "IRU",
60:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=IRU",
61:     departureTime: "06:00",
62:     arrivalTime: "07:00",
63:     origin: "تهران",
64:     originCode: "THR",
65:     destination: "کیش",
66:     destinationCode: "KIH",
67:     price: 1802400,
68:     flightClass: "economy",
69:     baggage: "20kg",
70:     departureHour: 6,
71:     arrivalHour: 7,
72:     seats: 6,
73:     tags: [],
74:     classRate: "Y",
75:     available: true,
76:   },
77:   {
78:     id: 2,
79:     airline: "فلای کیش",
80:     airlineCode: "KIS",
81:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=KIS",
82:     departureTime: "09:30",
83:     arrivalTime: "10:45",
84:     origin: "تهران",
85:     originCode: "THR",
86:     destination: "کیش",
87:     destinationCode: "KIH",
88:     price: 2100000,
89:     flightClass: "economy",
90:     baggage: "25kg",
91:     departureHour: 9,
92:     arrivalHour: 10,
93:     seats: 12,
94:     tags: [],
95:     classRate: "M",
96:     available: true,
97:   },
98:   {
99:     id: 3,
100:     airline: "کیش ایر",
101:     airlineCode: "KIA",
102:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=KIA",
103:     departureTime: "14:15",
104:     arrivalTime: "15:30",
105:     origin: "تهران",
106:     originCode: "THR",
107:     destination: "کیش",
108:     destinationCode: "KIH",
109:     price: 1950000,
110:     flightClass: "economy",
111:     baggage: "20kg",
112:     departureHour: 14,
113:     arrivalHour: 15,
114:     seats: 8,
115:     tags: [],
116:     classRate: "Y",
117:     available: true,
118:   },
119:   {
120:     id: 4,
121:     airline: "آتا",
122:     airlineCode: "ATA",
123:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ATA",
124:     departureTime: "20:45",
125:     arrivalTime: "22:00",
126:     origin: "تهران",
127:     originCode: "THR",
128:     destination: "کیش",
129:     destinationCode: "KIH",
130:     price: 2500000,
131:     flightClass: "business",
132:     baggage: "30kg",
133:     departureHour: 20,
134:     arrivalHour: 22,
135:     seats: 4,
136:     tags: [],
137:     classRate: "C",
138:     available: true,
139:   },
140:   {
141:     id: 5,
142:     airline: "آسمان",
143:     airlineCode: "ASM",
144:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ASM",
145:     departureTime: "07:20",
146:     arrivalTime: "08:35",
147:     origin: "تهران",
148:     originCode: "THR",
149:     destination: "کیش",
150:     destinationCode: "KIH",
151:     price: 1680000,
152:     flightClass: "economy",
153:     baggage: "20kg",
154:     departureHour: 7,
155:     arrivalHour: 8,
156:     seats: 10,
157:     tags: ["foreign-restriction"],
158:     classRate: "Y",
159:     available: true,
160:   },
161:   {
162:     id: 6,
163:     airline: "قشم ایر",
164:     airlineCode: "QES",
165:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=QES",
166:     departureTime: "12:00",
167:     arrivalTime: "13:15",
168:     origin: "تهران",
169:     originCode: "THR",
170:     destination: "کیش",
171:     destinationCode: "KIH",
172:     price: 2200000,
173:     flightClass: "economy",
174:     baggage: "25kg",
175:     departureHour: 12,
176:     arrivalHour: 13,
177:     seats: 7,
178:     tags: [],
179:     classRate: "M",
180:     available: true,
181:   },
182:   {
183:     id: 7,
184:     airline: "معراج",
185:     airlineCode: "MRJ",
186:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=MRJ",
187:     departureTime: "16:30",
188:     arrivalTime: "17:45",
189:     origin: "تهران",
190:     originCode: "THR",
191:     destination: "کیش",
192:     destinationCode: "KIH",
193:     price: 2300000,
194:     flightClass: "business",
195:     baggage: "30kg",
196:     departureHour: 16,
197:     arrivalHour: 17,
198:     seats: 5,
199:     tags: [],
200:     classRate: "C",
201:     available: true,
202:   },
203:   {
204:     id: 8,
205:     airline: "زاگرس",
206:     airlineCode: "ZAG",
207:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ZAG",
208:     departureTime: "22:10",
209:     arrivalTime: "23:25",
210:     origin: "تهران",
211:     originCode: "THR",
212:     destination: "کیش",
213:     destinationCode: "KIH",
214:     price: 1450000,
215:     flightClass: "economy",
216:     baggage: "20kg",
217:     departureHour: 22,
218:     arrivalHour: 23,
219:     seats: 0,
220:     tags: [],
221:     classRate: "Y",
222:     available: false,
223:   },
224:   {
225:     id: 9,
226:     airline: "مهر",
227:     airlineCode: "MEH",
228:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=MEH",
229:     departureTime: "05:00",
230:     arrivalTime: "06:15",
231:     origin: "تهران",
232:     originCode: "THR",
233:     destination: "کیش",
234:     destinationCode: "KIH",
235:     price: 2900000,
236:     flightClass: "business",
237:     baggage: "30kg",
238:     departureHour: 5,
239:     arrivalHour: 6,
240:     seats: 0,
241:     tags: [],
242:     classRate: "J",
243:     available: false,
244:   },
245:   {
246:     id: 10,
247:     airline: "اطلس ایر",
248:     airlineCode: "ATL",
249:     logo: "https://mrbilit.com/_ipx/_/logo/flight%3FproviderCode=ATL",
250:     departureTime: "11:45",
251:     arrivalTime: "13:00",
252:     origin: "تهران",
253:     originCode: "THR",
254:     destination: "کیش",
255:     destinationCode: "KIH",
256:     price: 1980000,
257:     flightClass: "economy",
258:     baggage: "20kg",
259:     departureHour: 11,
260:     arrivalHour: 13,
261:     seats: 0,
262:     tags: [],
263:     classRate: "Y",
264:     available: false,
265:   },
266: ];
267: 
268: const allAirlines = Array.from(
269:   new Set(flightsData.map((f) => f.airline)),
270: ).sort();
271: const allBaggageOptions = Array.from(
272:   new Set(flightsData.map((f) => f.baggage)),
273: ).sort();
274: 
275: const flightRulesData = [
276:   {
277:     title: "قوانین استرداد بلیط",
278:     content:
279:       "بلیط‌های چارتری تا ۲۴ ساعت قبل از پرواز قابل استرداد می‌باشند. در صورت استرداد کمتر از ۲۴ ساعت قبل از پرواز، جریمه ۳۰ درصدی اعمال می‌شود. بلیط‌های سیستمی تا ۳ ساعت قبل از پرواز بدون جریمه قابل استرداد هستند. لطفاً توجه داشته باشید که هزینه خدمات آنلاین غیرقابل بازگشت است.",
280:   },
281:   {
282:     title: "قوانین بار مجاز",
283:     content:
284:       "بار مجاز برای پروازهای اکونومی ۲۰ کیلوگرم و برای پروازهای بیزینس ۳۰ کیلوگرم می‌باشد. حداکثر وزن هر چمدان نباید از ۳۲ کیلوگرم بیشتر شود. بار دستی شامل یک کیف کوچک و یک لپ‌تاپ است. در صورت اضافه بار، هزینه هر کیلوگرم اضافه معادل ۱ درصد قیمت بلیط محاسبه می‌شود.",
285:   },
286:   {
287:     title: "قوانین تغییر بلیط",
288:     content:
289:       "تغییر تاریخ پرواز تا ۴۸ ساعت قبل از پرواز با پرداخت جریمه ۱۰ درصدی امکان‌پذیر است. تغییر نام مسافر مجاز نمی‌باشد. ارتقاء کلاس پروازی با پرداخت مابه‌التفاوت امکان‌پذیر است. لطفاً برای تغییرات با پشتیبانی تماس بگیرید.",
290:   },
291:   {
292:     title: "قوانین حضور در فرودگاه",
293:     content:
294:       "مسافران باید حداقل ۲ ساعت قبل از پروازهای داخلی و ۳ ساعت قبل از پروازهای خارجی در فرودگاه حضور داشته باشند. کارت شناسایی معتبر (کارت ملی یا پاسپورت) الزامی است. در صورت تأخیر بیش از ۳۰ دقیقه، با پشتیبانی تماس بگیرید. پذیرش مسافران ۴۵ دقیقه قبل از پرواز بسته می‌شود.",
295:   },
296: ];
297: 
298: function FlightResultsPageContent() {
299:   const searchParams = useSearchParams();
300:   const airportParam = searchParams.get("airport") || "";
301:   const destinationParam = searchParams.get("destination") || "";
302:   const [minPrice, setMinPrice] = useState(0);
303:   const [maxPrice, setMaxPrice] = useState(3000000);
304:   const globalMin = 0;
305:   const globalMax = 3000000;
306:   const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
307:   const [selectedDepTimes, setSelectedDepTimes] = useState<string[]>([]);
308:   const [selectedArrTimes, setSelectedArrTimes] = useState<string[]>([]);
309:   const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
310:   const [selectedBaggage, setSelectedBaggage] = useState<string[]>([]);
311:   const [selectedTags, setSelectedTags] = useState<string[]>([]);
312:   const [sortBy, setSortBy] = useState<"time" | "price" | null>(null);
313:   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
314:   const [activeDetailId, setActiveDetailId] = useState<number | null>(null);
315:   const [showPopup, setShowPopup] = useState(false);
316:   const [chancePercent, setChancePercent] = useState(0);
317: 
318:   useEffect(() => {
319:     if (showPopup) {
320:       const target = 78;
321:       const duration = 1200;
322:       const startTime = Date.now();
323:       const animate = () => {
324:         const elapsed = Date.now() - startTime;
325:         const progress = Math.min(elapsed / duration, 1);
326:         setChancePercent(Math.floor(progress * target));
327:         if (progress < 1) requestAnimationFrame(animate);
328:       };
329:       requestAnimationFrame(animate);
330:     }
331:   }, [showPopup]);
332: 
333:   const filteredFlights = flightsData
334:     .filter((flight) => {
335:       if (destinationParam && !flight.destination.includes(destinationParam.trim())) return false;
336:       if (flight.price < minPrice || flight.price > maxPrice) return false;
337:       if (
338:         selectedClasses.length &&
339:         !selectedClasses.includes(flight.flightClass)
340:       )
341:         return false;
342:       if (selectedDepTimes.length) {
343:         let match = false;
344:         for (const range of selectedDepTimes) {
345:           if (
346:             range === "0-8" &&
347:             flight.departureHour >= 0 &&
348:             flight.departureHour < 8
349:           )
350:             match = true;
351:           if (
352:             range === "8-18" &&
353:             flight.departureHour >= 8 &&
354:             flight.departureHour < 18
355:           )
356:             match = true;
357:           if (
358:             range === "18-24" &&
359:             flight.departureHour >= 18 &&
360:             flight.departureHour <= 24
361:           )
362:             match = true;
363:         }
364:         if (!match) return false;
365:       }
366:       if (selectedArrTimes.length) {
367:         let match = false;
368:         for (const range of selectedArrTimes) {
369:           if (
370:             range === "0-8" &&
371:             flight.arrivalHour >= 0 &&
372:             flight.arrivalHour < 8
373:           )
374:             match = true;
375:           if (
376:             range === "8-18" &&
377:             flight.arrivalHour >= 8 &&
378:             flight.arrivalHour < 18
379:           )
380:             match = true;
381:           if (
382:             range === "18-24" &&
383:             flight.arrivalHour >= 18 &&
384:             flight.arrivalHour <= 24
385:           )
386:             match = true;
387:         }
388:         if (!match) return false;
389:       }
390:       if (selectedAirlines.length && !selectedAirlines.includes(flight.airline))
391:         return false;
392:       if (selectedBaggage.length && !selectedBaggage.includes(flight.baggage))
393:         return false;
394:       if (selectedTags.length) {
395:         let hasTag = false;
396:         for (const tag of selectedTags) {
397:           if (flight.tags.includes(tag)) hasTag = true;
398:         }
399:         if (!hasTag) return false;
400:       }
401:       return true;
402:     })
403:     .sort((a, b) => {
404:       if (sortBy === "time") return a.departureHour - b.departureHour;
405:       if (sortBy === "price") return a.price - b.price;
406:       return 0;
407:     });
408: 
409:   const availableFlights = filteredFlights.filter((f) => f.available);
410:   const unavailableFlights = filteredFlights.filter((f) => !f.available);
411: 
412:   const toggleDropdown = (name: string) =>
413:     setOpenDropdown((prev) => (prev === name ? null : name));
414:   const handleClassChange = (val: string) =>
415:     setSelectedClasses((prev) =>
416:       prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
417:     );
418:   const handleDepTimeChange = (val: string) =>
419:     setSelectedDepTimes((prev) =>
420:       prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
421:     );
422:   const handleArrTimeChange = (val: string) =>
423:     setSelectedArrTimes((prev) =>
424:       prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
425:     );
426:   const handleAirlineChange = (val: string) =>
427:     setSelectedAirlines((prev) =>
428:       prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
429:     );
430:   const handleBaggageChange = (val: string) =>
431:     setSelectedBaggage((prev) =>
432:       prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
433:     );
434:   const handleTagChange = (val: string) =>
435:     setSelectedTags((prev) =>
436:       prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
437:     );
438:   const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
439:     const val = Number(e.target.value);
440:     if (val <= maxPrice) setMinPrice(val);
441:   };
442:   const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
443:     const val = Number(e.target.value);
444:     if (val >= minPrice) setMaxPrice(val);
445:   };
446: 
447:   const minPercent = ((minPrice - globalMin) / (globalMax - globalMin)) * 100;
448:   const maxPercent = ((maxPrice - globalMin) / (globalMax - globalMin)) * 100;
449:   const progressLeft = minPercent;
450:   const progressWidth = maxPercent - minPercent;
451: 
452:   useEffect(() => {
453:     const handleClickOutside = (e: MouseEvent) => {
454:       const target = e.target as HTMLElement;
455:       if (!target.closest(".filterDropdown")) setOpenDropdown(null);
456:     };
457:     document.addEventListener("click", handleClickOutside);
458:     return () => document.removeEventListener("click", handleClickOutside);
459:   }, []);
460: 
461:   const [activeRuleId, setActiveRuleId] = useState<number | null>(null);
462:   const [openRuleItem, setOpenRuleItem] = useState<number | null>(null);
463: 
464:   const cheapDays = Array(14).fill({ day: "سه‌شنبه 10/2", price: "1,082,000" });
465: 
466:   const renderFlightCard = (flight: Flight) => (
467:     <div
468:       className={`Cards ${!flight.available ? "CardsOfline" : ""}`}
469:       key={flight.id}
470:     >
471:       <div className="RightCard">
472:         <div className="About">
473:           <div className="Icon">
474:             <Image src={flight.logo} alt={flight.airline} width={40} height={40} />
475:             <span>{flight.airline}</span>
476:           </div>
477:           <div className="Time">
478:             <div className="Form">
479:               <span>{flight.departureTime}</span>
480:               <p>{flight.origin}</p>
481:             </div>
482:             <div className="i">
483:               <FontAwesomeIcon icon={faCircleDot} />
484:               <hr className="line-divider" />
485:               <hr className="line-divider" />
486:               <hr className="line-divider" />
487:               <hr className="line-divider" />
488:               <hr className="line-divider" />
489:               <FontAwesomeIcon icon={faPlane} className="fa-flip-horizontal" />
490:             </div>
491:             <div className="Form">
492:               <span>{flight.arrivalTime}</span>
493:               <p>{flight.destination}</p>
494:             </div>
495:           </div>
496:         </div>
497:         <div className="discriptions">
498:           <div
499:             className={`More ${activeDetailId === flight.id ? "active" : ""}`}
500:             onClick={() =>
501:               setActiveDetailId(activeDetailId === flight.id ? null : flight.id)
502:             }
503:           >
504:             <span>
505:               جزئیات <FontAwesomeIcon icon={faAngleDown} />
506:             </span>
507:           </div>
508:           <div
509:             className={`More ${activeRuleId === flight.id ? "active" : ""}`}
510:             onClick={() =>
511:               setActiveRuleId(activeRuleId === flight.id ? null : flight.id)
512:             }
513:           >
514:             <span>
515:               قوانین پرواز <FontAwesomeIcon icon={faAngleDown} />
516:             </span>
517:           </div>
518:           <div className="Avablity">
519:             <span>
520:               {flight.flightClass === "economy" ? "اکونومی" : "بیزنس"}
521:             </span>
522:             {flight.available ? (
523:               <p>{flight.seats} صندلی</p>
524:             ) : (
525:               <p style={{ color: "#999" }}>ظرفیت تکمیل</p>
526:             )}
527:           </div>
528:         </div>
529:       </div>
530:       <div className="LeftCard">
531:         <div className="Top">
532:           <FontAwesomeIcon icon={faBell} />
533:         </div>
534:         <div className="Bottom">
535:           <p>
536:             <span>{flight.price.toLocaleString("fa-IR")}</span> تومان
537:           </p>
538:           {flight.available ? (
539:             <Link href="/flight/reserve/form">
540:               <button className="BtnPrimary">رزرو آنلاین</button>
541:             </Link>
542:           ) : (
543:             <button className="BtnAuto" onClick={() => setShowPopup(true)}>
544:               <FontAwesomeIcon icon={faBolt} />
545:               <span>رزرو خودکار</span>
546:             </button>
547:           )}
548:         </div>
549:       </div>
550:       <div
551:         className={`FlightDetails ${activeDetailId === flight.id ? "active" : ""}`}
552:       >
553:         <div className="DetailsContent">
554:           <div className="row">
555:             <div className="title">
556:               <p>
557:                 سه‌شنبه 2 دی ← چهارشنبه 3 دی <span></span> کلاس نرخی{" "}
558:                 {flight.classRate}
559:               </p>
560:             </div>
561:               <div className="contet">
562:                       <div className="right">
563:                         <p>ساعت ورود به فرودگاه: </p>
564:                         <span>
565:                           ساعت حرکت <FontAwesomeIcon icon={faClock} />:
566:                         </span>
567:                         <p>ساعت رسیدن به مقصد:</p>
568:                       </div>
569:                       <div className="left">
570:                         <p>
571:                           {flight.departureTime} — {flight.origin}، فرودگاه مهرآباد ({flight.originCode}) -
572:                           ترمینال 1
573:                         </p>
574:                         <span>هواپیمای شما</span>
575:                         <p>
576:                           {flight.arrivalTime} — {flight.destination}، فرودگاه کیش ({flight.destinationCode})
577:                         </p>
578:                       </div>
579:                     </div>
580:           </div>
581:           <div className="orw">
582:             <div className="top">
583:               <p>
584:                 بزرگسال × 1{" "}
585:                 <span>{flight.price.toLocaleString("fa-IR")} تومان</span>
586:               </p>
587:               <p>
588:                 مجموع <span>{flight.price.toLocaleString("fa-IR")} تومان</span>
589:               </p>
590:             </div>
591:             <div className="bottom">
592:               <button>
593:                 <FontAwesomeIcon icon={faBell} />{" "}
594:                 {flight.available ? "ارزان شد خبرم کن" : "موجود شد خبرم کن"}
595:               </button>
596:               <button onClick={() => setShowPopup(true)}>
597:                 <FontAwesomeIcon icon={faBolt} />{" "}
598:                 {flight.available ? "ارزان شد رزرو کن" : "موجود شد رزرو کن"}
599:               </button>
600:             </div>
601:           </div>
602:         </div>
603:       </div>
604:       <div
605:         className={`FlightRules ${activeRuleId === flight.id ? "active" : ""}`}
606:       >
607:         <div className="RulesContent">
608:           {flightRulesData.map((rule, rIdx) => {
609:             const isRuleOpen = activeRuleId === flight.id && openRuleItem === rIdx;
610:             return (
611:               <div key={rIdx} className="RuleItem">
612:                 <div
613:                   className={`RuleHeader ${isRuleOpen ? "active" : ""}`}
614:                   onClick={() =>
615:                     setOpenRuleItem(isRuleOpen ? null : rIdx)
616:                   }
617:                 >
618:                   <span>{rule.title}</span>
619:                   <FontAwesomeIcon icon={faAngleDown} />
620:                 </div>
621:                 <div className={`RuleBody ${isRuleOpen ? "active" : ""}`}>
622:                   <p>{rule.content}</p>
623:                 </div>
624:               </div>
625:             );
626:           })}
627:         </div>
628:       </div>
629:     </div>
630:   );
631: 
632:   const chanceStatus =
633:     chancePercent < 35 ? "low" : chancePercent < 70 ? "mid" : "high";
634:   const chanceMessage =
635:     chancePercent < 35
636:       ? "شانس پیدا شدن این پرواز پایین و پرریسک است."
637:       : chancePercent < 70
638:         ? "شانس پیدا شدن متوسط و وابسته به شرایط است."
639:         : "شانس پیدا شدن این پرواز بالا و امیدوارکننده است.";
640: 
641:   return (
642:     <>
643:       <Header />
644:       <main className="flight-results-page">
645:         <Form />
646:         <section>
647:           <div className="Countainer">
648:             <div className="Right">
649:               <div className="Title">
650:                 <span>بلیط هواپیما{airportParam ? ` ${airportParam}` : " تهران به کیش"}</span>
651:               </div>
652: 
653:               <div className="NotifMe">
654:                 <div className="Bell">
655:                   <FontAwesomeIcon icon={faBell} />
656:                   <span>ارزان شد خبرم کن</span>
657:                 </div>
658:                 <label className="switch">
659:                   <input type="checkbox" />
660:                   <span className="slider"></span>
661:                 </label>
662:               </div>
663: 
664:               <div className="Sort">
665:                 <span>مرتب‌سازی بر اساس</span>
666:                 <div className="Choosen">
667:                   <label>
668:                     <input
669:                       type="radio"
670:                       name="sort"
671:                       onChange={() => setSortBy("time")}
672:                       checked={sortBy === "time"}
673:                     />
674:                     زود‌ترین زمان
675:                   </label>
676:                   <label>
677:                     <input
678:                       type="radio"
679:                       name="sort"
680:                       onChange={() => setSortBy("price")}
681:                       checked={sortBy === "price"}
682:                     />
683:                     کمترین قیمت
684:                   </label>
685:                 </div>
686:               </div>
687: 
688:               <FilterSidebar
689:                 resultCount={`نمایش ${filteredFlights.length} از ${flightsData.length} نتیجه`}
690:               >
691:                 <FilterAccordion
692:                   title="قیمت"
693:                   isOpen={openDropdown === "price"}
694:                   onToggle={() => toggleDropdown("price")}
695:                 >
696:                   <PriceRangeFilter
697:                     min={minPrice}
698:                     max={maxPrice}
699:                     globalMin={globalMin}
700:                     globalMax={globalMax}
701:                     step={10000}
702:                     onMinChange={(val) => {
703:                       if (val <= maxPrice) setMinPrice(val);
704:                     }}
705:                     onMaxChange={(val) => {
706:                       if (val >= minPrice) setMaxPrice(val);
707:                     }}
708:                   />
709:                 </FilterAccordion>
710: 
711:                 <FilterAccordion
712:                   title="کلاس پروازی"
713:                   isOpen={openDropdown === "class"}
714:                   onToggle={() => toggleDropdown("class")}
715:                 >
716:                   <CheckboxFilter
717:                     options={[
718:                       { value: "economy", label: "اکونومی" },
719:                       { value: "business", label: "بیزنس" },
720:                     ]}
721:                     selectedValues={selectedClasses}
722:                     onChange={handleClassChange}
723:                   />
724:                 </FilterAccordion>
725: 
726:                 <FilterAccordion
727:                   title="زمان پرواز"
728:                   isOpen={openDropdown === "time"}
729:                   onToggle={() => toggleDropdown("time")}
730:                 >
731:                   <div className="timeSubSection">
732:                     <span className="subTitle">زمان حرکت از تهران</span>
733:                     <div className="checkboxGroup">
734:                       {[
735:                         { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
736:                         { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
737:                         { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
738:                       ].map((item) => {
739:                         const isChecked = selectedDepTimes.includes(item.value);
740:                         return (
741:                           <label
742:                             key={item.value}
743:                             className="checkboxItem"
744:                             onClick={() => handleDepTimeChange(item.value)}
745:                           >
746:                             <div
747:                               className={`customCheckbox ${isChecked ? "checked" : ""}`}
748:                             >
749:                               {isChecked && <FontAwesomeIcon icon={faCheck} />}
750:                             </div>
751:                             <input
752:                               type="checkbox"
753:                               onChange={() => handleDepTimeChange(item.value)}
754:                               checked={isChecked}
755:                               style={{ display: "none" }}
756:                             />
757:                             <span>{item.label}</span>
758:                           </label>
759:                         );
760:                       })}
761:                     </div>
762:                   </div>
763:                   <hr className="filterDivider" />
764:                   <div className="timeSubSection">
765:                     <span className="subTitle">زمان رسیدن به کیش</span>
766:                     <div className="checkboxGroup">
767:                       {[
768:                         { label: "۰۰:۰۰ تا ۰۸:۰۰", value: "0-8" },
769:                         { label: "۰۸:۰۰ تا ۱۸:۰۰", value: "8-18" },
770:                         { label: "۱۸:۰۰ تا ۰۰:۰۰", value: "18-24" },
771:                       ].map((item) => {
772:                         const isChecked = selectedArrTimes.includes(item.value);
773:                         return (
774:                           <label
775:                             key={item.value}
776:                             className="checkboxItem"
777:                             onClick={() => handleArrTimeChange(item.value)}
778:                           >
779:                             <div
780:                               className={`customCheckbox ${isChecked ? "checked" : ""}`}
781:                             >
782:                               {isChecked && <FontAwesomeIcon icon={faCheck} />}
783:                             </div>
784:                             <input
785:                               type="checkbox"
786:                               onChange={() => handleArrTimeChange(item.value)}
787:                               checked={isChecked}
788:                               style={{ display: "none" }}
789:                             />
790:                             <span>{item.label}</span>
791:                           </label>
792:                         );
793:                       })}
794:                     </div>
795:                   </div>
796:                 </FilterAccordion>
797: 
798:                 <FilterAccordion
799:                   title="شرکت‌های هواپیمایی"
800:                   isOpen={openDropdown === "airline"}
801:                   onToggle={() => toggleDropdown("airline")}
802:                 >
803:                   <CheckboxFilter
804:                     options={allAirlines.map((a) => ({ value: a, label: a }))}
805:                     selectedValues={selectedAirlines}
806:                     onChange={handleAirlineChange}
807:                   />
808:                 </FilterAccordion>
809: 
810:                 <FilterAccordion
811:                   title="مقدار بار مجاز"
812:                   isOpen={openDropdown === "baggage"}
813:                   onToggle={() => toggleDropdown("baggage")}
814:                 >
815:                   <CheckboxFilter
816:                     options={allBaggageOptions.map((b) => ({
817:                       value: b,
818:                       label: b,
819:                     }))}
820:                     selectedValues={selectedBaggage}
821:                     onChange={handleBaggageChange}
822:                   />
823:                 </FilterAccordion>
824: 
825:                 <FilterAccordion
826:                   title="برچسب‌ها"
827:                   isOpen={openDropdown === "tags"}
828:                   onToggle={() => toggleDropdown("tags")}
829:                 >
830:                   <CheckboxFilter
831:                     options={[
832:                       {
833:                         value: "foreign-restriction",
834:                         label: "محدودیت خرید اتباع",
835:                       },
836:                     ]}
837:                     selectedValues={selectedTags}
838:                     onChange={handleTagChange}
839:                   />
840:                 </FilterAccordion>
841:               </FilterSidebar>
842:             </div>
843: 
844:             <div className="Left">
845:               <div className="Top">
846:                 <div className="Title">ارزان‌ترین قیمت در هر روز</div>
847:                 <div className="Price">
848:                   {cheapDays.map((item, idx) => (
849:                     <div className="Cards" key={idx}>
850:                       <span>{item.day}</span>
851:                       <p>{item.price} تومان</p>
852:                     </div>
853:                   ))}
854:                 </div>
855:               </div>
856: 
857:               <div className="Bottom">
858:                 {/* فقط پروازهای موجود */}
859:                 {availableFlights.map(renderFlightCard)}
860: 
861:                 {/* باکس زرد رنگ با پروازهای ناموجود */}
862:                 <div className="GetLater">
863:                   <div className="Titel">
864:                     <div className="About">
865:                       <div className="Logo">
866:                         <svg
867:                           height="64px"
868:                           width="64px"
869:                           version="1.1"
870:                           viewBox="-51.2 -51.2 614.4 614.4"
871:                           fill="#ffffff"
872:                         >
873:                           <rect
874:                             x="-51.2"
875:                             y="-51.2"
876:                             width="614.4"
877:                             height="614.4"
878:                             rx="307.2"
879:                             fill="#ffc800"
880:                             strokeWidth="0"
881:                           ></rect>
882:                           <path
883:                             style={{ fill: "#f5f0de" }}
884:                             d="M330.08,267.413h-93.758l-55.104,91.322h40.588l-31.221,124.946l140.197-158.768h-41.265 L330.08,267.413z"
885:                           ></path>
886:                           <g>
887:                             <path
888:                               style={{ fill: "#cea500" }}
889:                               d="M190.579,499.533c-2.508,0-5.036-0.594-7.371-1.821c-6.468-3.402-9.773-10.784-8.002-17.873 l26.3-105.249H181.22c-5.718,0-10.994-3.08-13.804-8.059c-2.811-4.979-2.723-11.087,0.231-15.984l55.104-91.322 c2.871-4.756,8.02-7.661,13.574-7.661h93.758c5.921,0,11.349,3.3,14.074,8.557s2.292,11.594-1.121,16.434l-22.933,32.508h10.683 c6.233,0,11.888,3.652,14.449,9.335c2.563,5.681,1.558,12.338-2.566,17.009L202.471,494.175 C199.377,497.673,195.013,499.533,190.579,499.533z M209.299,342.884h12.507c4.881,0,9.489,2.248,12.495,6.095 c3.004,3.847,4.068,8.865,2.885,13.6l-15.467,61.893l73.917-83.708h-6.119c-5.921,0-11.349-3.3-14.074-8.557 c-2.725-5.257-2.292-11.594,1.121-16.434l22.933-32.508h-54.226L209.299,342.884z"
890:                             ></path>
891:                           </g>
892:                         </svg>
893:                       </div>
894:                       <div className="Content">
895:                         <p>
896:                           موجود شد رزرو کن! <span>(جدید)</span>
897:                         </p>
898:                         <p>
899:                           در لحظه موجود شدن ظرفیت خالی، رزرو خودکار انجام
900:                           می‌شود.
901:                         </p>
902:                       </div>
903:                     </div>
904:                   </div>
905: 
906:                   {/* پروازهای ناموجود داخل باکس زرد */}
907:                   {unavailableFlights.length > 0 && (
908:                     <div className="UnAvailableFlights">
909:                       {unavailableFlights.map(renderFlightCard)}
910:                     </div>
911:                   )}
912:                 </div>
913:               </div>
914:             </div>
915:           </div>
916:         </section>
917: 
918:               {/* پاپ‌آپ مدرن */}
919:         {showPopup && (
920:           <div
921:             className="popup-overlay show"
922:             onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}
923:           >
924:             <div className="popup-modal">
925:               <div className="popup-bg-decor decor-1" />
926:               <div className="popup-bg-decor decor-2" />
927: 
928:               <div className="popup-header">
929:                 <button
930:                   className="close-btn"
931:                   onClick={() => setShowPopup(false)}
932:                   aria-label="بستن"
933:                 >
934:                   <FontAwesomeIcon icon={faXmark} />
935:                 </button>
936:                 <div className="header-content">
937:                   <div className="icon-wrapper">
938:                     <FontAwesomeIcon icon={faBolt} />
939:                   </div>
940:                   <h2>فعال‌سازی رزرو خودکار</h2>
941:                   <p className="subtitle">هرگز یک صندلی خالی را از دست نده!</p>
942:                 </div>
943:               </div>
944: 
945:               <div className="flight-summary">
946:                 <div className="flight-route">
947:                   <div className="route-point">
948:                     <span className="city">تهران</span>
949:                     <span className="code">THR</span>
950:                   </div>
951:                   <div className="route-line">
952:                     <div className="route-dash" />
953:                     <div className="route-plane">
954:                       <FontAwesomeIcon icon={faPlane} />
955:                     </div>
956:                     <div className="route-dash" />
957:                   </div>
958:                   <div className="route-point">
959:                     <span className="city">کیش</span>
960:                     <span className="code">KIH</span>
961:                   </div>
962:                 </div>
963:                 <div className="flight-date">
964:                   <FontAwesomeIcon icon={faClock} />
965:                   <span>شنبه ۱۱ بهمن ۱۴۰۴</span>
966:                 </div>
967:               </div>
968: 
969:               <div className="steps-section">
970:                 <h3 className="section-title">
971:                   <span>چطور کار می‌کند؟</span>
972:                 </h3>
973:                 <div className="steps-grid">
974:                   <div className="step-card step-1">
975:                     <div className="step-icon">
976:                       <FontAwesomeIcon icon={faMagnifyingGlass} />
977:                     </div>
978:                     <div className="step-content">
979:                       <h4>۱. جستجوی مداوم</h4>
980:                       <p>
981:                         سیستم ما ۲۴ ساعته پروازهای این مسیر را بررسی می‌کند.
982:                       </p>
983:                     </div>
984:                   </div>
985:                   <div className="step-card step-2">
986:                     <div className="step-icon">
987:                       <FontAwesomeIcon icon={faBell} />
988:                     </div>
989:                     <div className="step-content">
990:                       <h4>۲. شناسایی ظرفیت</h4>
991:                       <p>
992:                         به محض آزاد شدن صندلی، در کمتر از چند ثانیه متوجه
993:                         می‌شویم.
994:                       </p>
995:                     </div>
996:                   </div>
997:                   <div className="step-card step-3">
998:                     <div className="step-icon">
999:                       <FontAwesomeIcon icon={faTicket} />
1000:                     </div>
1001:                     <div className="step-content">
1002:                       <h4>۳. رزرو خودکار</h4>
1003:                       <p>بلیط به صورت آنی به نام شما صادر و پیامک می‌شود.</p>
1004:                     </div>
1005:                   </div>
1006:                   <div className="step-card step-4">
1007:                     <div className="step-icon">
1008:                       <FontAwesomeIcon icon={faShieldHalved} />
1009:                     </div>
1010:                     <div className="step-content">
1011:                       <h4>۴. ضمانت بازگشت وجه</h4>
1012:                       <p>
1013:                         اگر بلیط پیدا نشد، تمام مبلغ بدون کارمزد برگشت داده
1014:                         می‌شود.
1015:                       </p>
1016:                     </div>
1017:                   </div>
1018:                 </div>
1019:               </div>
1020: 
1021:               <div className="chance-section">
1022:                 <div className="chance-header">
1023:                   <div className="chance-title">
1024:                     <FontAwesomeIcon icon={faGaugeHigh} />
1025:                     <span>تحلیل هوشمند شانس موفقیت</span>
1026:                   </div>
1027:                   <div className="chance-value">
1028:                     <span className="percent">{chancePercent}</span>
1029:                     <span className="symbol">٪</span>
1030:                   </div>
1031:                 </div>
1032:                 <div className={`chance-bar chance-${chanceStatus}`}>
1033:                   <div
1034:                     className="chance-fill"
1035:                     style={{ width: `${chancePercent}%` }}
1036:                   >
1037:                     <div className="chance-dot" />
1038:                   </div>
1039:                 </div>
1040:                 <div className="chance-labels">
1041:                   <span>پایین</span>
1042:                   <span>متوسط</span>
1043:                   <span>بالا</span>
1044:                 </div>
1045:                 <div
1046:                   className={`chance-message chance-message-${chanceStatus}`}
1047:                 >
1048:                   <FontAwesomeIcon
1049:                     icon={chanceStatus === "high" ? faCheck : faBell}
1050:                   />
1051:                   <span>{chanceMessage}</span>
1052:                 </div>
1053:               </div>
1054: 
1055:               <div className="popup-footer">
1056:                 <p className="terms">
1057:                   با ادامه فرآیند،{" "}
1058:                   <Link href="/rules" target="_blank">
1059:                     شرایط و قوانین رزرو خودکار
1060:                   </Link>{" "}
1061:                   را می‌پذیرید.
1062:                 </p>
1063:                 <Link href="/reserve/auto-reserve" className="cta-button">
1064:                   <span className="cta-icon">
1065:                     <FontAwesomeIcon icon={faWallet} />
1066:                   </span>
1067:                   <span className="cta-text">
1068:                     <span className="cta-main">ادامه و شارژ کیف پول</span>
1069:                     <span className="cta-sub">
1070:                       مبلغ مورد نیاز: ۳,۱۶۱,۶۰۰ تومان
1071:                     </span>
1072:                   </span>
1073:                   <span className="cta-arrow">
1074:                     <FontAwesomeIcon icon={faArrowLeft} />
1075:                   </span>
1076:                 </Link>
1077:               </div>
1078:             </div>
1079:           </div>
1080:         )}
1081:       </main>
1082:     </>
1083:   );
1084: }
1085: 
1086: export default function FlightResultsPage() {
1087:   return (
1088:     <Suspense fallback={<LoadingSkeleton type="list" />}>
1089:       <FlightResultsPageContent />
1090:     </Suspense>
1091:   );
1092: }

(End of file - total 1092 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "D:\\Works\\Project001\\sex\\HamidParvaz\\app\\flight\\flightse\\globals.css"
}
```

**Output:**
```
<path>D:\Works\Project001\sex\HamidParvaz\app\flight\flightse\globals.css</path>
<type>file</type>
<content>
1: .Countainer {
2:   width: 100%;
3:   max-width: 1200px;
4:   justify-self: center;
5:   padding: 0 16px;
6:   box-sizing: border-box;
7:   margin-top: 10px;
8:   display: flex;
9:   position: relative;
10:   justify-content: space-between;
11:   gap: 20px;
12:   .Left {
13:     width: 888px;
14:     display: grid;
15:     gap: 10px;
16:     height: 100%;
17:     .Top {
18:       background-color: var(--bgWhite);
19:       width: 100%;
20:       display: grid;
21:       box-shadow: var(--boxShadow);
22:       padding: 8px 8px 0;
23:       height: 120px;
24:       border-radius: 12px;
25:       gap: 0;
26:       .Title {
27:         font-size: 14px;
28:         color: var(--textDark);
29:       }
30:       .Price {
31:         display: flex;
32:         scroll-behavior: smooth;
33:         position: relative;
34:         gap: 10px;
35:         scroll-snap-type: x mandatory;
36:         margin: 0 45px;
37:         overflow-x: auto;
38:         overflow-y: hidden;
39:         height: fit-content;
40:         padding-bottom: 12px;
41:         .Cards {
42:           display: grid;
43:           grid-template-columns: 1fr;
44:           flex: 0 0 120px;
45:           text-align: center;
46:           transition: 0.3s;
47:           border-radius: 12px;
48:           padding: 0 8px;
49:           background: var(--bgLight);
50:           cursor: pointer;
51:           span {
52:             font-size: 12px;
53:             color: var(--textGray);
54:           }
55:           p {
56:             font-size: 14.5px;
57:             font-weight: bold;
58:             color: var(--textDark);
59:           }
60:           &:hover {
61:             background-color: var(--grayBgHover);
62:           }
63:         }
64:       }
65:     }
66:     .Bottom {
67:       display: grid;
68:       margin-top: 20px;
69:       gap: 10px;
70:       .Cards,
71:       .CardsOfline {
72:         display: flex;
73:         flex-wrap: wrap;
74:         background-color: var(--bgWhite);
75:         padding: 15px;
76:         border-radius: 12px;
77:         box-shadow: var(--boxShadow);
78:         overflow: hidden;
79:         transition: all 0.3s ease;
80:         width: 100%;
81:         box-sizing: border-box;
82:         margin-bottom: 20px;
83:         direction: rtl;
84: 
85:         &.CardsOfline {
86:           opacity: 0.7;
87:           filter: grayscale(0.5);
88:         }
89: 
90:         .RightCard {
91:           width: 70%;
92:           display: flex;
93:           flex-direction: column;
94:           justify-content: space-between;
95:           .About {
96:             display: flex;
97:             align-items: center;
98:             justify-content: space-around;
99:             .Icon {
100:               display: flex;
101:               flex-direction: column;
102:               align-items: center;
103:               width: 96px;
104: 
105:               img {
106:                 width: 45px;
107:                 height: auto;
108:               }
109:               span {
110:                 font-size: 13px;
111:                 color: var(--textGray);
112:               }
113:             }
114: 
115:             .Time {
116:               display: flex;
117:               align-items: center;
118:               gap: 15px;
119: 
120:               .Form {
121:                 text-align: center;
122:                 padding: 0;
123:                 gap: 0;
124:                 span {
125:                   font-size: 24px;
126:                   font-weight: bold;
127:                 }
128:                 p {
129:                   font-size: 14px;
130:                   color: var(--textGray);
131:                   margin: 0;
132:                 }
133:               }
134: 
135:               .i {
136:                 display: flex;
137:                 align-items: center;
138:                 gap: 5px;
139:                 opacity: 0.5;
140:                 hr {
141:                   width: 40px;
142:                   border: 0.5px solid var(--textGray);
143:                 }
144:               }
145:             }
146:           }
147: 
148:           .discriptions {
149:             display: flex;
150:             gap: 20px;
151:             align-items: center;
152: 
153:             .More {
154:               cursor: pointer;
155:               color: var(--goldDark);
156:               font-size: 14px;
157: 
158:               span {
159:                 display: flex;
160:                 width: max-content;
161:                 align-items: center;
162:                 gap: 5px;
163:               }
164:               i {
165:                 transition: transform 0.3s ease;
166:               }
167:               &.active i {
168:                 transform: rotate(180deg);
169:               }
170:             }
171: 
172:             .Avablity {
173:               display: flex;
174:               gap: 15px;
175:               width: 100%;
176:               justify-content: space-between;
177:               padding-left: 5px;
178:               span {
179:                 background: #f5f5f5;
180:                 padding: 2px 8px;
181:                 border-radius: 5px;
182:                 font-size: 12px;
183:               }
184:               p {
185:                 color: tomato;
186:                 font-size: 13px;
187:                 margin: 0;
188:                 font-weight: bold;
189:               }
190:             }
191:           }
192:         }
193: 
194:         .LeftCard {
195:           width: 30%;
196:           border-right: var(--borderLight);
197:           padding-right: 15px;
198:           display: flex;
199:           flex-direction: column;
200:           justify-content: space-between;
201:           height: fit-content;
202: 
203:           .Top {
204:             justify-content: end;
205:             box-shadow: none;
206:             height: fit-content;
207:             i {
208:               color: var(--gold);
209:               font-size: 21px;
210:               cursor: pointer;
211: 
212:               &:hover {
213:                 color: var(--goldDark);
214:               }
215:             }
216:           }
217: 
218:           .Bottom {
219:             text-align: center;
220:             width: 100%;
221:             justify-content: center;
222:             p {
223:               font-size: 18px;
224:               width: 100%;
225:               span {
226:                 color: var(--goldDark);
227:                 font-weight: bold;
228:               }
229:             }
230:             button {
231:               background: var(--gold);
232:               border: none;
233:               padding: 12px;
234:               border-radius: 8px;
235:               width: 100%;
236:               font-weight: bold;
237:               font-family: var(--Font);
238:               cursor: pointer;
239:               &:hover {
240:                 background: var(--goldDark);
241:               }
242:             }
243:           }
244:         }
245: 
246:         .FlightDetails {
247:           flex-basis: 100%;
248:           max-height: 0;
249:           opacity: 0;
250:           overflow: hidden;
251:           transition: all 0.4s ease;
252: 
253:           &.active {
254:             max-height: max-content;
255:             opacity: 1;
256:           }
257: 
258:           .DetailsContent {
259:             display: flex;
260:             justify-content: space-between;
261:             padding: 10px;
262:             background: #fcfcfc;
263:             border-radius: 8px;
264:             .row {
265:               background: var(--bgLight);
266:               padding: px;
267:               display: flex;
268:               flex-direction: column;
269:               border-radius: 9px;
270:               font-size: 13px;
271:               width: calc(100% - 30%);
272:               .title {
273:                 background: var(--grayBgHover);
274:                 padding: 8px 12px;
275:                 border-radius: 8px;
276:                 p {
277:                   font-size: 14px;
278:                 }
279:                 span {
280:                   border-right: var(--borderLight);
281:                   margin: 0 8px;
282:                 }
283:               }
284:               .contet {
285:                 padding: 20px 0;
286:                 display: flex;
287:                 gap: 40px;
288:                 .right {
289:                   background: none;
290:                   box-shadow: none;
291:                   width: fit-content;
292:                   p {
293:                     font-size: 14px;
294:                     font-weight: bold;
295:                     color: var(--textDark);
296:                   }
297:                   span {
298:                     font-size: 14px;
299:                     font-weight: 100;
300:                     color: var(--textGray);
301:                   }
302:                 }
303:                 .left {
304:                   p {
305:                     font-size: 14px;
306:                     font-weight: bold;
307:                     color: var(--textDark);
308:                   }
309:                   span {
310:                     font-size: 14px;
311:                     font-weight: 100;
312:                     color: var(--textGray);
313:                   }
314:                 }
315:               }
316:             }
317:             .orw {
318:               border-right: var(--borderLight);
319:               padding: 15px;
320:               display: flex;
321:               flex-direction: column;
322:               width: 30%;
323:               justify-content: space-between;
324:               .top {
325:                 display: grid;
326:                 gap: 5px;
327:                 p {
328:                   display: flex;
329:                   justify-content: space-between;
330:                   font-size: 14px;
331:                   font-weight: 100;
332:                   color: var(--textGray);
333:                   span {
334:                     font-size: 14px;
335:                     font-weight: bold;
336:                     color: var(--goldText);
337:                   }
338:                 }
339:               }
340:               .bottom {
341:                 display: grid;
342:                 gap: 5px;
343: 
344:                 button {
345:                   display: flex;
346:                   justify-content: center;
347:                   align-items: center;
348:                   background: none;
349:                   border: none;
350:                   font-family: var(--Font);
351:                   font-size: 12px;
352:                   color: var(--goldText);
353:                   width: 100%;
354:                   height: 30px;
355:                   transition: 0.3s;
356:                   cursor: pointer;
357:                   &:hover {
358:                     background-color: var(--grayBgHover);
359:                     border-radius: 8px;
360:                   }
361:                 }
362:               }
363:             }
364:           }
365:         }
366: 
367:         .FlightRules {
368:           flex-basis: 100%;
369:           max-height: 0;
370:           opacity: 0;
371:           overflow: hidden;
372:           transition: all 0.4s ease;
373: 
374:           &.active {
375:             max-height: max-content;
376:             opacity: 1;
377:             padding-top: 10px;
378:           }
379: 
380:           .RulesContent {
381:             display: flex;
382:             flex-direction: column;
383:             gap: 8px;
384:             padding: 10px;
385:             background: #fcfcfc;
386:             border-radius: 8px;
387: 
388:             .RuleItem {
389:               background: var(--bgLight);
390:               border-radius: 8px;
391:               overflow: hidden;
392: 
393:               .RuleHeader {
394:                 display: flex;
395:                 justify-content: space-between;
396:                 align-items: center;
397:                 padding: 10px 12px;
398:                 cursor: pointer;
399:                 font-size: 13px;
400:                 font-weight: bold;
401:                 color: var(--textDark);
402:                 transition: 0.3s;
403:                 user-select: none;
404: 
405:                 svg {
406:                   transition: transform 0.3s ease;
407:                   font-size: 12px;
408:                 }
409: 
410:                 &.active svg {
411:                   transform: rotate(180deg);
412:                 }
413: 
414:                 &:hover {
415:                   background: var(--grayBgHover);
416:                 }
417:               }
418: 
419:               .RuleBody {
420:                 max-height: 0;
421:                 opacity: 0;
422:                 overflow: hidden;
423:                 transition: all 0.3s ease;
424: 
425:                 &.active {
426:                   max-height: max-content;
427:                   opacity: 1;
428:                   padding: 0 12px 10px;
429:                 }
430: 
431:                 p {
432:                   font-size: 12px;
433:                   color: var(--textGray);
434:                   line-height: 1.8;
435:                   margin: 0;
436:                 }
437:               }
438:             }
439:           }
440:         }
441:       }
442:     }
443:   }
444:   .Right {
445:     position: -webkit-sticky;
446:     align-self: flex-start;
447:     position: sticky;
448:     width: 300px;
449:     min-width: 280px;
450:     display: flex;
451:     flex-direction: column;
452:     gap: 10px;
453:     /* ... other nested rules ... */
454:     .Title {
455:       display: flex;
456:       flex-direction: column;
457:       width: 100%;
458:       background: var(--bgWhite);
459:       height: max-content;
460:       padding: 16px;
461:       border-radius: 12px;
462:       box-shadow: var(--boxShadow);
463:       align-items: center;
464:       overflow: hidden;
465:       position: relative;
466:       justify-content: center;
467:       span {
468:         color: var(--goldText);
469:         font-size: var(--fontSize);
470:         font-weight: bold;
471:         cursor: pointer;
472:         padding: 10px;
473:       }
474:     }
475:     .NotifMe {
476:       display: flex;
477:       width: 100%;
478:       background-color: var(--bgWhite);
479:       height: max-content;
480:       padding: 16px;
481:       border-radius: 12px;
482:       box-shadow: var(--boxShadow);
483:       align-items: center;
484:       justify-content: space-between;
485:       .Bell {
486:         display: flex;
487:         gap: 5px;
488:         span {
489:           font-size: 14px;
490:           font-weight: bold;
491:           color: var(--goldDark);
492:         }
493:         i {
494:           color: var(--goldDark);
495:         }
496:       }
497:       .switch {
498:         position: relative;
499:         display: inline-block;
500:         width: 44px;
501:         height: 24px;
502:         input {
503:           opacity: 0;
504:           width: 0;
505:           height: 0;
506:         }
507:         .slider {
508:           position: absolute;
509:           cursor: pointer;
510:           top: 0;
511:           left: 0;
512:           right: 0;
513:           bottom: 0;
514:           background-color: #ccc;
515:           transition: 0.4s;
516:           border-radius: 34px;
517:           &::before {
518:             position: absolute;
519:             content: "";
520:             height: 20px;
521:             width: 20px;
522:             left: 2px;
523:             bottom: 2px;
524:             background-color: white;
525:             transition: 0.4s;
526:             border-radius: 50%;
527:           }
528:         }
529:         input:checked + .slider {
530:           background-color: var(--gold);
531:         }
532:         input:checked + .slider:before {
533:           transform: translateX(20px);
534:         }
535:       }
536:     }
537:     .Sort {
538:       display: grid;
539:       width: 100%;
540:       background-color: var(--bgWhite);
541:       height: max-content;
542:       padding: 12px 16px;
543:       border-radius: 12px;
544:       box-shadow: var(--boxShadow);
545:       gap: 10px;
546:       .Choosen {
547:         display: grid;
548:         gap: 2px;
549:         label {
550:           text-align: center;
551:           display: flex;
552:           align-items: center;
553:           color: var(--goldDark);
554:           gap: 5px;
555:           font-size: 14px;
556:           input[type="radio"] {
557:             appearance: none;
558:             width: 16px;
559:             height: 16px;
560:             border: 2px solid #555;
561:             border-radius: 50%;
562:             cursor: pointer;
563:             transition: 0.2s;
564:             width: 15px;
565:             &:hover {
566:               border-color: #000;
567:               background-color: #e6b8005e;
568:               transition: 0.5s;
569:             }
570:             &:checked {
571:               background-color: var(--gold);
572:               border: 2px solid #555;
573:               transition: 0.8s;
574:             }
575:           }
576:         }
577:       }
578:     }
579:     .sidebarFilters {
580:       background: #fff;
581:       border-radius: 12px;
582:       padding: 16px;
583:       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
584:       direction: rtl;
585:       height: max-content;
586:       .filterHeader {
587:         border-bottom: 1px solid #f0f0f0;
588:         padding-bottom: 10px;
589:         margin-bottom: 15px;
590:         font-weight: bold;
591:       }
592:       .filterContentArea {
593:         .resultsCount {
594:           display: block;
595:           font-size: 12px;
596:           color: #757575;
597:           margin-bottom: 15px;
598:         }
599:         .filterDropdown {
600:           padding: 0;
601:           .dropdownTrigger {
602:             display: flex;
603:             height: fit-content;
604:             justify-content: space-between;
605:             align-items: center;
606:             cursor: pointer;
607:             padding: 10px 0 20px 0;
608:             font-size: 14px;
609:             font-weight: bold;
610:             border-bottom: var(--borderLight);
611:             i {
612:               transition: 0.3s;
613:             }
614:             &.active i {
615:               transform: rotate(180deg);
616:             }
617:           }
618:           .dropdownPanel {
619:             max-height: 0;
620:             overflow: hidden;
621:             transition: 0.3s ease-in-out;
622:             &.open {
623:               max-height: 1000px;
624:               padding: 10px 0;
625:             }
626:             .priceSliderBox {
627:               padding-top: 10px;
628:               .priceLabels {
629:                 display: flex;
630:                 justify-content: space-between;
631:                 align-items: center;
632:                 font-size: 12px;
633:                 margin-bottom: 25px;
634:                 .labelGroup {
635:                   display: flex;
636:                   align-items: center;
637:                   gap: 4px;
638:                 }
639:                 .labelSeparator {
640:                   color: #ddd;
641:                 }
642:               }
643:               .rangeSliderContainer {
644:                 position: relative;
645:                 width: 100%;
646:                 height: 5px;
647:                 .sliderTrack {
648:                   position: absolute;
649:                   width: 100%;
650:                   height: 5px;
651:                   background: #ddd;
652:                   border-radius: 5px;
653:                 }
654:                 .sliderProgress {
655:                   position: absolute;
656:                   height: 5px;
657:                   background: #ffcb11;
658:                   border-radius: 5px;
659:                 }
660:                 .rangeInputs {
661:                   position: relative;
662:                   direction: ltr;
663: 
664:                   input {
665:                     position: absolute;
666:                     width: 100%;
667:                     height: 5px;
668:                     top: 50%;
669:                     transform: translateY(-50%);
670:                     background: none;
671:                     pointer-events: none;
672:                     -webkit-appearance: none;
673:                     -moz-appearance: none;
674:                     &[type="range"] {
675:                       &::-webkit-slider-thumb {
676:                         height: 18px;
677:                         width: 18px;
678:                         border-radius: 50%;
679:                         background: #fff;
680:                         border: 2px solid #ffcb11;
681:                         pointer-events: auto;
682:                         -webkit-appearance: none;
683:                         cursor: pointer;
684:                         box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
685:                         margin-top: 0;
686:                         position: relative;
687:                         z-index: 2;
688:                       }
689:                       &::-moz-range-thumb {
690:                         height: 16px;
691:                         width: 16px;
692:                         border-radius: 50%;
693:                         background: #fff;
694:                         border: 2px solid #ffcb11;
695:                         pointer-events: auto;
696:                         cursor: pointer;
697:                         border: 2px solid #ffcb11;
698:                         box-sizing: border-box;
699:                       }
700:                     }
701:                   }
702:                 }
703:               }
704:             }
705:           }
706:         }
707:       }
708:     }
709:   }
710: }
711: .sidebarFilters
712:   .filterContentArea
713:   .filterDropdown
714:   .dropdownPanel
715:   .checkboxGroup {
716:   display: flex;
717:   flex-direction: column;
718:   gap: 12px;
719:   padding: 10px 5px;
720: }
721: .sidebarFilters
722:   .filterContentArea
723:   .filterDropdown
724:   .dropdownPanel
725:   .checkboxGroup
726:   .checkboxItem {
727:   display: flex;
728:   align-items: center;
729:   gap: 10px;
730:   cursor: pointer;
731:   font-size: 13px;
732:   color: #333;
733: }
734: .sidebarFilters
735:   .filterContentArea
736:   .filterDropdown
737:   .dropdownPanel
738:   .checkboxGroup
739:   .checkboxItem
740:   input[type="checkbox"] {
741:   width: 17px;
742:   height: 17px;
743:   cursor: pointer;
744:   accent-color: var(--gold);
745: }
746: .sidebarFilters .filterContentArea .filterDropdown {
747:   border-bottom: 1px solid #f9f9f9;
748: }
749: .sidebarFilters .filterContentArea .filterDropdown:last-child {
750:   border-bottom: none;
751: }
752: .sidebarFilters
753:   .filterContentArea
754:   .filterDropdown
755:   .dropdownPanel#airlineContent.open {
756:   max-height: 500px;
757:   overflow-y: auto;
758: }
759: .GetLater {
760:   width: 100%;
761:   height: fit-content;
762:   background-color: var(--goldDark);
763:   padding: 15px 25px;
764:   border-radius: 12px;
765:   box-shadow: var(--boxShadow);
766:   i {
767:     opacity: 1;
768:   }
769:   .Titel {
770:     width: 100%;
771:     height: fit-content;
772:     display: flex;
773:     justify-content: space-between;
774:     align-items: center;
775:     .About {
776:       width: fit-content;
777:       height: 100%;
778:       display: flex;
779:       gap: 12px;
780:       p {
781:         font-size: 17px;
782:         font-weight: bold;
783:         span {
784:           font-size: 12px;
785:           font-weight: normal;
786:         }
787:         &:last-of-type {
788:           font-size: 15px;
789:           font-weight: normal;
790:         }
791:       }
792:     }
793:     .Button {
794:       Button {
795:         width: 200px;
796:         text-align: center;
797:         padding: 15px;
798:         background: var(--gold);
799:         border: none;
800:         border-radius: 8px;
801:         font-size: 15px;
802:         font-weight: bold;
803:         cursor: pointer;
804:         color: var(--textDark);
805:         font-family: var(--Font);
806:         transition: 0.3s;
807:         &:hover {
808:           background: var(--grayBgHover);
809:         }
810:       }
811:     }
812:   }
813: }
814: /* ============ پاپ‌آپ مدرن ============ */
815: .popup-overlay {
816:   position: fixed;
817:   inset: 0;
818:   background: rgba(15, 23, 42, 0.6);
819:   backdrop-filter: blur(8px);
820:   -webkit-backdrop-filter: blur(8px);
821:   display: none;
822:   justify-content: center;
823:   align-items: center;
824:   z-index: 9999;
825:   padding: 20px;
826:   opacity: 0;
827:   transition: opacity 0.3s ease;
828: }
829: 
830: .popup-overlay.show {
831:   display: flex;
832:   opacity: 1;
833:   animation: overlayFadeIn 0.3s ease forwards;
834: }
835: 
836: @keyframes overlayFadeIn {
837:   from {
838:     opacity: 0;
839:   }
840:   to {
841:     opacity: 1;
842:   }
843: }
844: 
845: .popup-modal {
846:   position: relative;
847:   background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
848:   width: 560px;
849:   max-width: 100%;
850:   max-height: 92vh;
851:   overflow-y: auto;
852:   overflow-x: hidden;
853:   border-radius: 24px;
854:   box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
855:   padding: 0;
856:   direction: rtl;
857:   transform: scale(0.9);
858:   opacity: 0;
859:   animation: modalPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
860: }
861: 
862: @keyframes modalPopIn {
863:   to {
864:     transform: scale(1);
865:     opacity: 1;
866:   }
867: }
868: 
869: /* ============ اسکرول‌بار مدرن و زیبا ============ */
870: .popup-modal::-webkit-scrollbar {
871:   width: 10px;
872: }
873: 
874: .popup-modal::-webkit-scrollbar-track {
875:   background: rgba(241, 245, 249, 0.5);
876:   border-radius: 24px;
877:   margin: 16px 0;
878: }
879: 
880: .popup-modal::-webkit-scrollbar-thumb {
881:   background: linear-gradient(180deg, #ffc800 0%, #f59e0b 100%);
882:   border-radius: 24px;
883:   border: 2px solid rgba(241, 245, 249, 0.5);
884:   background-clip: padding-box;
885:   transition: all 0.3s ease;
886: }
887: 
888: .popup-modal::-webkit-scrollbar-thumb:hover {
889:   background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
890:   background-clip: padding-box;
891:   border: 1px solid rgba(241, 245, 249, 0.5);
892: }
893: 
894: /* فایرفاکس */
895: .popup-modal {
896:   scrollbar-width: thin;
897:   scrollbar-color: #ffc800 rgba(241, 245, 249, 0.5);
898: }
899: 
900: /* دکوراسیون پس‌زمینه */
901: .popup-bg-decor {
902:   position: absolute;
903:   border-radius: 50%;
904:   filter: blur(80px);
905:   opacity: 0.4;
906:   pointer-events: none;
907:   z-index: 0;
908: }
909: .popup-bg-decor.decor-1 {
910:   width: 200px;
911:   height: 200px;
912:   background: #ffc800;
913:   top: -50px;
914:   right: -50px;
915: }
916: .popup-bg-decor.decor-2 {
917:   width: 180px;
918:   height: 180px;
919:   background: #fbbf24;
920:   bottom: 50px;
921:   left: -60px;
922: }
923: 
924: /* هدر */
925: .popup-header {
926:   position: sticky;
927:   top: 0;
928:   padding: 32px 32px 24px;
929:   background: linear-gradient(
930:     135deg,
931:     rgba(255, 200, 0, 0.08) 0%,
932:     rgba(251, 191, 36, 0.04) 100%
933:   );
934:   backdrop-filter: blur(10px);
935:   border-bottom: 1px solid rgba(0, 0, 0, 0.04);
936:   z-index: 10;
937: }
938: 
939: .close-btn {
940:   position: absolute;
941:   top: 20px;
942:   left: 20px;
943:   width: 36px;
944:   height: 36px;
945:   border-radius: 50%;
946:   background: rgba(0, 0, 0, 0.05);
947:   border: none;
948:   color: #64748b;
949:   cursor: pointer;
950:   display: flex;
951:   align-items: center;
952:   justify-content: center;
953:   font-size: 16px;
954:   transition: all 0.3s ease;
955: }
956: .close-btn:hover {
957:   background: rgba(0, 0, 0, 0.1);
958:   color: #0f172a;
959:   transform: rotate(90deg);
960: }
961: 
962: .header-content {
963:   display: flex;
964:   flex-direction: column;
965:   align-items: center;
966:   gap: 8px;
967:   text-align: center;
968: }
969: 
970: .icon-wrapper {
971:   width: 64px;
972:   height: 64px;
973:   border-radius: 20px;
974:   background: linear-gradient(135deg, #ffc800 0%, #f59e0b 100%);
975:   display: flex;
976:   align-items: center;
977:   justify-content: center;
978:   color: white;
979:   font-size: 28px;
980:   box-shadow: 0 10px 25px rgba(255, 200, 0, 0.35);
981:   margin-bottom: 8px;
982:   animation: iconBounce 0.6s ease-out;
983: }
984: 
985: @keyframes iconBounce {
986:   0% {
987:     transform: scale(0) rotate(-30deg);
988:   }
989:   60% {
990:     transform: scale(1.1) rotate(10deg);
991:   }
992:   100% {
993:     transform: scale(1) rotate(0);
994:   }
995: }
996: 
997: .header-content h2 {
998:   font-size: 22px;
999:   font-weight: 800;
1000:   color: #0f172a;
1001:   margin: 0;
1002: }
1003: 
1004: .subtitle {
1005:   font-size: 14px;
1006:   color: #64748b;
1007:   margin: 0;
1008: }
1009: 
1010: /* خلاصه پرواز */
1011: .flight-summary {
1012:   margin: 20px 24px;
1013:   padding: 20px;
1014:   background: white;
1015:   border-radius: 16px;
1016:   border: 1px solid #f1f5f9;
1017:   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
1018:   position: relative;
1019:   z-index: 1;
1020: }
1021: 
1022: .flight-route {
1023:   display: flex;
1024:   align-items: center;
1025:   justify-content: space-between;
1026:   margin-bottom: 16px;
1027: }
1028: 
1029: .route-point {
1030:   display: flex;
1031:   flex-direction: column;
1032:   align-items: center;
1033:   gap: 2px;
1034: }
1035: .route-point .city {
1036:   font-size: 18px;
1037:   font-weight: 700;
1038:   color: #0f172a;
1039: }
1040: .route-point .code {
1041:   font-size: 13px;
1042:   color: #94a3b8;
1043:   font-weight: 500;
1044: }
1045: 
1046: .route-line {
1047:   flex: 1;
1048:   display: flex;
1049:   align-items: center;
1050:   justify-content: center;
1051:   gap: 8px;
1052:   margin: 0 16px;
1053: }
1054: 
1055: .route-dash {
1056:   flex: 1;
1057:   height: 2px;
1058:   background: repeating-linear-gradient(
1059:     90deg,
1060:     #cbd5e1 0,
1061:     #cbd5e1 6px,
1062:     transparent 6px,
1063:     transparent 12px
1064:   );
1065: }
1066: 
1067: .route-plane {
1068:   width: 40px;
1069:   height: 40px;
1070:   border-radius: 50%;
1071:   background: linear-gradient(135deg, #ffc800 0%, #f59e0b 100%);
1072:   display: flex;
1073:   align-items: center;
1074:   justify-content: center;
1075:   color: white;
1076:   font-size: 16px;
1077:   transform: rotate(-45deg);
1078:   box-shadow: 0 4px 10px rgba(255, 200, 0, 0.4);
1079:   animation: planeMove 2s ease-in-out infinite;
1080: }
1081: @keyframes planeMove {
1082:   0%,
1083:   100% {
1084:     transform: rotate(-45deg) translateX(0);
1085:   }
1086:   50% {
1087:     transform: rotate(-45deg) translateX(4px);
1088:   }
1089: }
1090: 
1091: .flight-date {
1092:   display: flex;
1093:   align-items: center;
1094:   justify-content: center;
1095:   gap: 8px;
1096:   padding-top: 12px;
1097:   border-top: 1px dashed #e2e8f0;
1098:   font-size: 13px;
1099:   color: #64748b;
1100: }
1101: .flight-date i,
1102: .flight-date svg {
1103:   color: #ffc800;
1104: }
1105: 
1106: /* مراحل */
1107: .steps-section {
1108:   padding: 8px 24px 20px;
1109:   position: relative;
1110:   z-index: 1;
1111: }
1112: 
1113: .section-title {
1114:   font-size: 15px;
1115:   font-weight: 700;
1116:   color: #0f172a;
1117:   margin: 0 0 14px;
1118:   display: flex;
1119:   align-items: center;
1120:   gap: 8px;
1121: }
1122: .section-title::before {
1123:   content: "";
1124:   width: 4px;
1125:   height: 18px;
1126:   background: linear-gradient(180deg, #ffc800 0%, #f59e0b 100%);
1127:   border-radius: 2px;
1128: }
1129: 
1130: .steps-grid {
1131:   display: grid;
1132:   grid-template-columns: 1fr 1fr;
1133:   gap: 12px;
1134: }
1135: 
1136: .step-card {
1137:   display: flex;
1138:   gap: 12px;
1139:   padding: 14px;
1140:   background: white;
1141:   border: 1px solid #f1f5f9;
1142:   border-radius: 12px;
1143:   transition: all 0.3s ease;
1144:   opacity: 0;
1145:   animation: stepFadeIn 0.5s ease forwards;
1146: }
1147: .step-card:nth-child(1) {
1148:   animation-delay: 0.1s;
1149: }
1150: .step-card:nth-child(2) {
1151:   animation-delay: 0.2s;
1152: }
1153: .step-card:nth-child(3) {
1154:   animation-delay: 0.3s;
1155: }
1156: .step-card:nth-child(4) {
1157:   animation-delay: 0.4s;
1158: }
1159: 
1160: @keyframes stepFadeIn {
1161:   from {
1162:     opacity: 0;
1163:     transform: translateY(10px);
1164:   }
1165:   to {
1166:     opacity: 1;
1167:     transform: translateY(0);
1168:   }
1169: }
1170: 
1171: .step-card:hover {
1172:   border-color: #fde68a;
1173:   box-shadow: 0 4px 12px rgba(255, 200, 0, 0.12);
1174:   transform: translateY(-2px);
1175: }
1176: 
1177: .step-icon {
1178:   flex-shrink: 0;
1179:   width: 38px;
1180:   height: 38px;
1181:   border-radius: 10px;
1182:   background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
1183:   color: #b45309;
1184:   display: flex;
1185:   align-items: center;
1186:   justify-content: center;
1187:   font-size: 15px;
1188: }
1189: 
1190: .step-content h4 {
1191:   font-size: 13px;
1192:   font-weight: 700;
1193:   color: #0f172a;
1194:   margin: 0 0 4px;
1195: }
1196: .step-content p {
1197:   font-size: 11.5px;
1198:   color: #64748b;
1199:   margin: 0;
1200:   line-height: 1.6;
1201: }
1202: 
1203: /* Smart Chance Indicator */
1204: .chance-section {
1205:   margin: 0 24px 20px;
1206:   padding: 20px;
1207:   background: white;
1208:   border-radius: 16px;
1209:   border: 1px solid #f1f5f9;
1210:   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
1211:   position: relative;
1212:   z-index: 1;
1213: }
1214: 
1215: .chance-header {
1216:   display: flex;
1217:   justify-content: space-between;
1218:   align-items: center;
1219:   margin-bottom: 18px;
1220: }
1221: 
1222: .chance-title {
1223:   display: flex;
1224:   align-items: center;
1225:   gap: 8px;
1226:   font-size: 14px;
1227:   font-weight: 600;
1228:   color: #0f172a;
1229: }
1230: .chance-title svg {
1231:   color: #ffc800;
1232: }
1233: 
1234: .chance-value {
1235:   display: flex;
1236:   align-items: baseline;
1237:   gap: 2px;
1238: }
1239: .chance-value .percent {
1240:   font-size: 28px;
1241:   font-weight: 800;
1242:   background: linear-gradient(135deg, #f59e0b 0%, #16a34a 100%);
1243:   -webkit-background-clip: text;
1244:   -webkit-text-fill-color: transparent;
1245:   background-clip: text;
1246: }
1247: .chance-value .symbol {
1248:   font-size: 16px;
1249:   color: #64748b;
1250:   font-weight: 600;
1251: }
1252: 
1253: .chance-bar {
1254:   position: relative;
1255:   height: 14px;
1256:   border-radius: 10px;
1257:   background: linear-gradient(90deg, #fecaca 0%, #fde68a 50%, #bbf7d0 100%);
1258:   overflow: visible;
1259:   margin-bottom: 8px;
1260: }
1261: 
1262: .chance-fill {
1263:   position: absolute;
1264:   top: 0;
1265:   right: 0;
1266:   height: 100%;
1267:   border-radius: 10px;
1268:   background: linear-gradient(90deg, #f59e0b 0%, #16a34a 100%);
1269:   transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
1270:   box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
1271:   position: relative;
1272: }
1273: 
1274: .chance-dot {
1275:   position: absolute;
1276:   left: -8px;
1277:   top: 50%;
1278:   transform: translateY(-50%);
1279:   width: 22px;
1280:   height: 22px;
1281:   border-radius: 50%;
1282:   background: white;
1283:   border: 3px solid #16a34a;
1284:   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
1285: }
1286: .chance-dot::after {
1287:   content: "";
1288:   position: absolute;
1289:   inset: 3px;
1290:   border-radius: 50%;
1291:   background: #16a34a;
1292:   animation: pulseDot 2s ease-in-out infinite;
1293: }
1294: 
1295: @keyframes pulseDot {
1296:   0%,
1297:   100% {
1298:     transform: scale(1);
1299:     opacity: 1;
1300:   }
1301:   50% {
1302:     transform: scale(1.2);
1303:     opacity: 0.7;
1304:   }
1305: }
1306: 
1307: .chance-labels {
1308:   display: flex;
1309:   justify-content: space-between;
1310:   font-size: 11px;
1311:   color: #94a3b8;
1312:   font-weight: 500;
1313:   margin-bottom: 14px;
1314: }
1315: 
1316: .chance-message {
1317:   display: flex;
1318:   align-items: center;
1319:   gap: 10px;
1320:   padding: 12px 14px;
1321:   border-radius: 10px;
1322:   font-size: 13px;
1323:   font-weight: 500;
1324:   line-height: 1.5;
1325:   animation: messageSlide 0.4s ease;
1326: }
1327: @keyframes messageSlide {
1328:   from {
1329:     opacity: 0;
1330:     transform: translateY(5px);
1331:   }
1332:   to {
1333:     opacity: 1;
1334:     transform: translateY(0);
1335:   }
1336: }
1337: 
1338: .chance-message-high {
1339:   background: #f0fdf4;
1340:   color: #166534;
1341:   border: 1px solid #bbf7d0;
1342: }
1343: .chance-message-mid {
1344:   background: #fefce8;
1345:   color: #a16207;
1346:   border: 1px solid #fde68a;
1347: }
1348: .chance-message-low {
1349:   background: #fef2f2;
1350:   color: #991b1b;
1351:   border: 1px solid #fecaca;
1352: }
1353: 
1354: /* فوتر */
1355: .popup-footer {
1356:   padding: 0 24px 24px;
1357:   position: relative;
1358:   z-index: 1;
1359: }
1360: 
1361: .terms {
1362:   font-size: 12px;
1363:   color: #64748b;
1364:   text-align: center;
1365:   margin-bottom: 14px;
1366: }
1367: .terms a {
1368:   color: #b45309;
1369:   font-weight: 600;
1370:   text-decoration: none;
1371:   border-bottom: 1px dashed #b45309;
1372: }
1373: .terms a:hover {
1374:   color: #92400e;
1375: }
1376: 
1377: .cta-button {
1378:   display: flex;
1379:   align-items: center;
1380:   gap: 14px;
1381:   width: 100%;
1382:   padding: 16px 20px;
1383:   background: linear-gradient(135deg, #ffc800 0%, #f59e0b 100%);
1384:   border-radius: 14px;
1385:   text-decoration: none;
1386:   color: #0f172a;
1387:   transition: all 0.3s ease;
1388:   box-shadow: 0 8px 20px rgba(255, 200, 0, 0.35);
1389:   position: relative;
1390:   overflow: hidden;
1391: }
1392: .cta-button::before {
1393:   content: "";
1394:   position: absolute;
1395:   top: 0;
1396:   right: -100%;
1397:   width: 100%;
1398:   height: 100%;
1399:   background: linear-gradient(
1400:     90deg,
1401:     transparent,
1402:     rgba(255, 255, 255, 0.4),
1403:     transparent
1404:   );
1405:   transition: right 0.6s ease;
1406: }
1407: .cta-button:hover::before {
1408:   right: 100%;
1409: }
1410: .cta-button:hover {
1411:   transform: translateY(-2px);
1412:   box-shadow: 0 12px 28px rgba(255, 200, 0, 0.5);
1413: }
1414: 
1415: .cta-icon {
1416:   width: 44px;
1417:   height: 44px;
1418:   border-radius: 12px;
1419:   background: rgba(255, 255, 255, 0.3);
1420:   display: flex;
1421:   align-items: center;
1422:   justify-content: center;
1423:   font-size: 18px;
1424:   flex-shrink: 0;
1425: }
1426: 
1427: .cta-text {
1428:   flex: 1;
1429:   display: flex;
1430:   flex-direction: column;
1431:   gap: 2px;
1432:   text-align: right;
1433: }
1434: .cta-main {
1435:   font-size: 15px;
1436:   font-weight: 800;
1437: }
1438: .cta-sub {
1439:   font-size: 12px;
1440:   font-weight: 500;
1441:   opacity: 0.85;
1442: }
1443: 
1444: .cta-arrow {
1445:   width: 32px;
1446:   height: 32px;
1447:   border-radius: 50%;
1448:   background: rgba(255, 255, 255, 0.3);
1449:   display: flex;
1450:   align-items: center;
1451:   justify-content: center;
1452:   font-size: 14px;
1453:   transition: transform 0.3s ease;
1454: }
1455: .cta-button:hover .cta-arrow {
1456:   transform: translateX(-4px);
1457: }
1458: 
1459: /* ============ دکمه رزرو خودکار برای پروازهای ناموجود ============ */
1460: .BtnAuto {
1461:   background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
1462:   border: none;
1463:   padding: 12px;
1464:   border-radius: 8px;
1465:   width: 100%;
1466:   font-weight: bold;
1467:   font-family: var(--Font);
1468:   cursor: pointer;
1469:   color: white;
1470:   display: flex;
1471:   align-items: center;
1472:   justify-content: center;
1473:   gap: 6px;
1474:   font-size: 14px;
1475:   transition: all 0.3s ease;
1476:   box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
1477: }
1478: .BtnAuto:hover {
1479:   background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
1480:   transform: translateY(-1px);
1481:   box-shadow: 0 6px 14px rgba(245, 158, 11, 0.4);
1482: }
1483: 
1484: .CardsOfline {
1485:   opacity: 0.85;
1486:   background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
1487:   position: relative;
1488: }
1489: 
1490: /* ============ پروازهای ناموجود داخل باکس زرد ============ */
1491: .UnAvailableFlights {
1492:   margin-top: 16px;
1493:   padding-top: 16px;
1494:   border-top: 1px dashed rgba(255, 255, 255, 0.3);
1495:   display: grid;
1496:   gap: 12px;
1497: }
1498: 
1499: .UnAvailableFlights .Cards {
1500:   margin-bottom: 0;
1501:   background: rgba(255, 255, 255, 0.95);
1502:   backdrop-filter: blur(10px);
1503:   border: 1px solid rgba(255, 200, 0, 0.2);
1504: }
1505: 
1506: /* ریسپانسیو */
1507: @media (max-width: 640px) {
1508:   .steps-grid {
1509:     grid-template-columns: 1fr;
1510:   }
1511:   .popup-header {
1512:     padding: 24px 20px 20px;
1513:   }
1514:   .flight-summary,
1515:   .chance-section {
1516:     margin: 16px 16px;
1517:   }
1518:   .steps-section {
1519:     padding: 8px 16px 16px;
1520:   }
1521:   .popup-footer {
1522:     padding: 0 16px 20px;
1523:   }
1524:   .header-content h2 {
1525:     font-size: 19px;
1526:   }
1527:   .popup-modal {
1528:     border-radius: 20px;
1529:   }
1530:   .popup-modal::-webkit-scrollbar-track {
1531:     border-radius: 20px;
1532:   }
1533:   .popup-modal::-webkit-scrollbar-thumb {
1534:     border-radius: 20px;
1535:   }
1536: }

(End of file - total 1536 lines)
</content>
```

---

## Assistant (Build · Glm 5.2 · 1.9s)

---

## User

continue

---

## Assistant (Build · Glm 5.2 · 1.7s)

---

## User

continue

---

## Assistant (Build · Glm 5.2 · 1.7s)

---

