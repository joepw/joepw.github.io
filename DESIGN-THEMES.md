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
  - Color + typography tokens **only**, plus any direction-specific quirks.
  - Lightbox / ThemeToggle / icons keep working automatically because they read the
    same CSS custom properties.

> A single `app/themes/<name>.css` per branch keeps the "what's different between
> direction 1 and direction 4?" review to a small diff, and keeps branching cheap.
> Structural templates/components are created once on the first theme branch and
> carried through the rest (same files, no conflicts).

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

### To be updated per branch as each is built & verified.