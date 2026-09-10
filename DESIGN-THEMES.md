# Portfolio Redesign — Four Theme Directions (branch experiments)

> **Goal:** Explore **four** distinct visual identities for the redesigned
> `joepw.github.io`, each built on its own git branch so they can be reviewed side
> by side and switched with a single `git checkout`.
>
> **Base branch:** `redesign-nuxt4` (clean tip `062368f`, working tree clean).
> **Status:** In progress — documentation created first, then branches built in order.

---

## Context

The Phase 3 redesign finalized a Nuxt 4 + hand-written CSS token system (dark-first
theme with a dark/light toggle). Rather than committing to a single look up front,
we agreed to prototype **four** candidate design directions on separate branches,
each branching from `redesign-nuxt4`. After evaluation, the chosen direction is
merged back into `redesign-nuxt4` and the other branches are **kept** (not deleted)
so any direction can be revisited later.

**Inspiration site (structural reference, not a clone):** `https://brittanychiang.com/`
— the sticky numbered left-nav rail + confident hero + two-column information-dense
sections pattern. Each branch *keeps* that structure but applies a distinct palette /
typography / mood so no direction is a literal copy.

---

## Architecture decision — separate structure from theme

To make the four branches easy to compare and to keep each diff small and reviewable,
the redesigned UI is split into two layers:

- **Shared structural layer** (identical across every branch):
  - Redesigned layout: sticky left nav rail with numbered section links + scroll-spy
    (collapses to a top bar on mobile/tablet).
  - New hero (eyebrow + name + tagline + intro + CTA).
  - About (text + quick-facts aside), two-column Experience, grouped Skillsets,
    Selected Projects feature cards.
  - Portfolio-detail theming (header, back button, captions, PhotoSwipe caption bar).
  - Footer signature, BackToTop, mobile behavior.
  - Content/data, routes, lightbox logic: **untouched**.
- **Per-branch theme layer** (`app/themes/<name>.css`):
  - Color + typography tokens **plus per-direction presentation overrides**
    (spacing, scale, borders, treatment) so each branch reads as a genuinely
    distinct design, not just a recolour.
  - Lightbox / ThemeToggle / icons keep working automatically because they read the
    same CSS custom properties.

> A single `app/themes/<name>.css` per branch keeps the "what's different between
> direction 1 and direction 4?" review to a small diff, and keeps branching cheap.
> Structural templates/components are created once on the first theme branch and
> carried through the rest (same files, no conflicts).
>
> **Note (2026-09-10):** the theme layer is *not* token-only. Earlier on, the four
> branches differed almost entirely by palette + typeface (identical structure),
> which read as reskins rather than distinct directions. Decided: each theme file
> carries real structural overrides so warm-minimal (airy editorial), color-block
> (loud geometry) and brittany-vibe (code-kit) each get their own personality.

---

## The four branches (from `redesign-nuxt4`)

| Branch | Direction | Default theme | Starting identity (finalized while building) |
| --- | --- | --- | --- |
| `design/editorial-mono` | **Editorial-mono / workstation** — near-black warm ink, one coral/amber accent | dark | Space Grotesk display + JetBrains Mono labels + system body; numbered left nav rail + scroll-spy |
| `design/warm-minimal` | **Warm & minimal** — warm paper light default, deep ink, terracotta accent | light | calm editorial type, generous whitespace; dark = warm "dim" mode |
| `design/color-block` | **High-contrast color-block** — bold, geometric accent-driven blocks | dark | louder personality; mono/bold display, colored cards |
| `design/brittany-vibe` | **Modernized brittanychiang** — near-black + mint/green accent | dark | single clean sans (Inter-style) + mono eyebrows, code-like headers, left nav rail |

---

## Sequence

All branches are created from the same clean `redesign-nuxt4` tip and do **not** touch
`redesign-nuxt4` itself:

```text
git switch redesign-nuxt4
git checkout -b design/editorial-mono   # build shared skeleton + editorial theme -> commit
git switch redesign-nuxt4
git checkout -b design/warm-minimal     # reuse shared skeleton + warm-minimal theme -> commit
git switch redesign-nuxt4
git checkout -b design/color-block      # shared skeleton + color-block theme -> commit
git switch redesign-nuxt4
git checkout -b design/brittany-vibe    # shared skeleton + brittany-vibe theme -> commit
```

`redesign-nuxt4` stays untouched as the integration base until a winner is chosen.

---

## Verification (required on every branch)

- `npm run lint` — 0 errors.
- `npm run generate` — clean SSG build; serve `.output/public`, confirm `/`, `/404`,
  and all four portfolio routes return `200`, the theme `<head>` script is intact,
  and both dark/light token sets exist in compiled CSS.

---

## How to compare & pick

- `git switch design/<name> && npm run dev` — eyeball each look locally.
- (Or `npm run generate` + `npm run preview` for the built static site.)
- When a winner is chosen:
  1. Merge it into `redesign-nuxt4`.
  2. Record the decision in `PLAN.md`.
  3. **Keep all four branches** (including the "losers") so any direction can be
     revisited later.

---

## Progress log

- **Setup date:** 2026-09-10
- Documented the four-branch approach (this file) before building.
- Branch build order: `editorial-mono` -> `warm-minimal` -> `color-block` -> `brittany-vibe`.

### ✅ `design/editorial-mono` — DONE (commits on branch)

Shared structure + theme built and verified (`lint` clean, `generate` prerenders 14 routes, routes 200 via `serve`).

- `8cd6dab` — **shared UI structure** (identical across all four branches):
  - Sticky left `SiteNav` rail with numbered section links (`01–04`) + `IntersectionObserver` scroll-spy; collapses to a top bar + menu on `≤900px`.
  - New hero (eyebrow + name + role + intro + primary/secondary CTAs + social icons).
  - About (copy + quick-facts aside w/ photo), two-column Experience rows, 3-col Skills cards, Selected Work cards.
  - Portfolio detail page re-themed (back button, headings, captions, PhotoSwipe caption bar).
  - Footer reverted to "name • year".
  - **Portfolio entry points fixed**: cover image is now a link + persistent "See More →" button (was hover-only overlay, undiscoverable on touch).
  - **mymovo** (no cover / privacy): cover + "See More" hidden; card goes full-width; no infinite shimmer.
  - `app/utils/scroll.ts` — JS-driven smooth scroll (`scrollIntoView`) used by hero buttons + nav links, so global `scroll-behavior` is NOT set → back-navigation restores scroll position instantly. Respects `prefers-reduced-motion`.
  - ThemeToggle moved down on mobile so it doesn't overlap the top nav.
- `163c3b7` — **editorial-mono theme** (`app/assets/themes/editorial-mono.css`):
  - Fonts: Space Grotesk (display) + JetBrains Mono (labels/meta) via Google Fonts `@import`; system sans for body.
  - Dark (default): near-black warm ink `#0c0b0a`, coral accent `#ff8a3c`.
  - Light: warm paper `#f6f3ee`, terracotta accent `#ef7a2e`, `--color-on-accent` for button text contrast.
  - Light-mode fixes: `.tech-chip img` inverted (tech SVGs are white-filled), tightened `--color-on-accent`, `.button--primary` weight `600`.
  - `nuxt.config.ts` `css` loads `main.css` then the theme file.

### ✅ `design/warm-minimal` — DONE (commits on branch)

- Branch created from `redesign-nuxt4`; shared structure cherry-picked (`273b466`); doc update committed (`ccea51c`).
- `6123557` — doc update: warm-minimal theme (light-first, Fraunces/IBM Plex Mono), icon-filter bug fix, per-direction overrides decision.
- `99847d7` — **warm-minimal theme** (`app/assets/themes/warm-minimal.css`):
  - Fonts: **Fraunces** (warm editorial serif, display+body) + **IBM Plex Mono** (meta) via Google Fonts `@import`.
  - **Light-first default**: `nuxt.config.ts` pre-paint script fallback flipped to light (OS dark preference still respected); light = warm paper `#f6f1e8`, deep ink, terracotta accent `#c8672e`; dark = warm "dim" `#1c1a17`.
  - `nuxt.config.ts` `css` loads `main.css` + `warm-minimal.css`.
  - Airy editorial presentation overrides (generous whitespace, wider leading, hairlines, serif-led voice).
- **Bug fixed:** tech icons invisible in light mode — `--icon-filter` values were swapped (light had `none`). Correct contract is shared rule `html[data-theme='light'] … { filter: var(--icon-filter) }`, so **light = `invert(1)`, dark = `none`**.

### ✅ `design/color-block` — DONE (commits on branch)

- Branch created from `redesign-nuxt4`; shared structure carried over (`11ddbe9`).
- `65e1c96` — **color-block theme** (`app/assets/themes/color-block.css`):
  - Fonts: **Archivo** heavy display + **Space Mono** via Google Fonts `@import`.
  - Bold geometry: accent index tiles on section headings, thick frames on cards, loud personality.
  - `nuxt.config.ts` `css` loads `main.css` + `color-block.css`; doc updated in same commit.
  - Verified: `lint` clean, `generate` clean.

### 🔄 `design/brittany-vibe` — IN PROGRESS

- Branch created from `redesign-nuxt4`; shared structure cherry-picked (`5337e32`); stale doc update staged (architecture note + editorial-mono log).
- Theme written (`app/assets/themes/brittany-vibe.css`):
  - Fonts: **Inter** (clean sans, display+body) + **JetBrains Mono** (meta) via Google Fonts `@import`.
  - Dark (default): near-black `#0d0f14`, mint accent `#6ee7a0`; light: pale slate `#f5f7fa`, green accent `#24b866`.
  - Code-kit presentation overrides (tabular section indexes, hairline rules, calm spacing, hover-tint experience rows, mono footer signature).
  - `nuxt.config.ts` `css` loads `main.css` + `brittany-vibe.css`.
- **Bug found & fixed:** `.work-link` had `color: var(--color-accent)` on a `button--primary` (whose background is already the accent) → mint-on-mint, invisible in both themes. Removed the color override so it inherits `--color-on-accent`.
- Verified: `lint` clean, `generate` prerenders 14 routes; routes `/`, `/portfolios/topads|mymovo|blinkgoo|sikomo|sikomo-dashboard/` return 200, theme pre-paint script intact, Inter reachable (HTTP 200).
- **Remaining:** update this doc, commit theme + config + doc.