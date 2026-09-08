# Personal Website Redesign + Nuxt Upgrade Plan

> **Goal:** Rebuild `joepw.github.io` from scratch on the latest Nuxt, redesigning the look while keeping the existing site deployable until the new version is verified.
>
> **Approach:** Fresh scaffold → port content → redesign → verify → deploy.
>
> **Current state (for reference):** Nuxt `^2.15.8` (Vue 2, Options API), `target: 'static'`, deployed via `nuxt generate` → `gh-pages -d dist`. Pages: `index.vue` (About / Skillsets / Experience / Portfolio) + `portfolios/_name.vue` (detail + PhotoSwipe 4). Content lives in a single `data.js` (~433 lines). Components: `ImageWithPlaceholder`, `BackToTop`. Dark theme (`#191a1d`), hand-written CSS in `assets/main.css`.

---

## Styling decision (recommendation)

For a portfolio site, the best fit is **plain, well-organized CSS** (no framework). Rationale:

| Option | Verdict | Why |
| --- | --- | --- |
| **Plain / organized CSS** | ✅ **Recommended** | Zero new dependency, no build complexity, full control over a distinctive personal design. Fits this small, mostly-static, ~4-page site perfectly. Keeps performance and load fast. |
| Tailwind v4 (utility-first) | Acceptable fallback | Great for very fast design iteration and design tokens, but adds a build dependency. Pick this only if you want to iterate on visuals extremely quickly during the redesign. |
| Component library (Vuetify v3 / Naive UI) | ❌ Not recommended | Heavy dependency, generic look, hard to theme around custom branding — wrong trade-off for a personal portfolio. |

**Decision to record:** plain CSS, organized as design tokens/variables + scoped component styles.

---

## Phase 1 — Foundations (upgrade / migration)

1. **Scaffold a fresh Nuxt 4 project** in this repo alongside the old code:
   - TypeScript + Vite, `target: 'static'` (SSG preserved — required for GitHub Pages).
   - `npm run generate` produces static output for `gh-pages`.
   - ESLint via `@nuxt/eslint` (flat config). Drop `@nuxtjs/eslint-module`, `babel-eslint`, legacy ESLint 7 plugins.
2. **Consolidate static assets:** Nuxt 3/4 uses a single `public/` dir. Merge the old `static/` + `public/` → new `public/`. Update every `~static/...` and root-relative path.
3. **Typed content layer:** port the 433-line `data.js` into a typed module (e.g. `composables/usePortfolios.ts`). For a small hard-coded dataset, typed TS data is simplest — no `@nuxt/content` needed yet (add later if desired).
4. **Migrate components to Composition API (`<script setup>`):** the new standard for Nuxt 3/4.
5. **Verify a clean `nuxt generate` build locally** before touching content.

## Phase 2 — Content & pages (port + refresh)

6. **Pages:**
   - `app.vue` + `layouts/` (default layout, header/nav, footer).
   - `index.vue`: About, Skillsets, Experience, Portfolio.
   - `pages/portfolios/[name].vue`: portfolio detail + image gallery (replace the old `_name.vue`).
7. **SEO via `useHead()`:** title, description, Open Graph, favicon, per-portfolio meta. (Replaces Nuxt 2 `head` config.)
8. **Port & refresh components; clean up** `ImageWithPlaceholder`, `BackToTop`.

## Phase 3 — Redesign (the "new look")

- New theme / branding: typography, spacing, color, section layout, responsive/mobile behavior.
- Use design skills during implementation:
  - `anthropics/skills@frontend-design` (~865K) — redesign guidance.
  - `vercel-labs/agent-skills/web-design-guidelines` (~616K) — visual/UX guidelines.
- **Lightbox decision (TBD):** keep PhotoSwipe (upgrade to v5 — note v4 → v5 API changed) *or* replace with a lighter custom lightbox. Simpler `<img>` + link is an option if screenshots are the priority over fancy zoom UX.
- **Images:** prefer `@nuxt/image` (`<NuxtImg>`) for responsive formats, or keep the existing shimmer-placeholder pattern.

## Phase 4 — Deploy & ship

- Verify `nuxt generate` output locally (static files load, routes correct).
- Update the `gh-pages` deploy flow (extend `package.json` scripts or add a GitHub Actions workflow) pushing to the `gh-pages` branch.
- Check the GitHub Pages custom-domain / CNAME handling and `.nojekyll`.
- Confirm old site remains live on `gh-pages` until the new build is confirmed; then swap.

---

## Migration watch-outs (learned from the current repo)

- [ ] `static/` → `public/` move and all path updates (`~static/...` images/arrows).
- [ ] Nuxt 2 `head` config → `useHead()` component/composable.
- [ ] `@nuxtjs/eslint-module` → `@nuxt/eslint` flat config.
- [ ] PhotoSwipe 4 → v5 API changes (or replacement) in the gallery/detail page.
- [ ] `target: 'static'` semantics — stay consistent via `nuxi generate` for GH Pages SSG.
- [ ] TypeScript enablement — decide if the whole content module is TS-typed.

## Open questions / decisions to confirm

1. Lightbox: PhotoSwipe v5 vs. custom lightbox vs. simple image links.
2. CSS color/design direction for the redesign (dark stays? add accent/typography direction?).
3. Content-driven (`@nuxt/content`) vs. typed TS data for portfolios (type data recommended).
4. Keep the whole thing as a single-page scroller (current) or multipage layout?

---

## Suggested execution checklist

- [ ] Scaffold fresh Nuxt 4 project & nuke legacy Nuxt 2 files
- [ ] Wire ESLint flat config + editorconfig
- [ ] Merge assets into `public/`
- [ ] Port `data.js` → typed module
- [ ] Build `app.vue`, layout, index + portfolio pages in `<script setup>`
- [ ] Add `useHead()` SEO
- [ ] Redesign styling (tokens + components)
- [ ] Choose + integrate lightbox & image handling
- [ ] `nuxt generate` verify locally
- [ ] Update deploy flow + cut over `gh-pages`

---

## Progress Log & Plan Changes

**2026-09-08 — Phase 1 (Foundations) + content migration: DONE & verified**

Approach updated to keep the old site deployable until cutover:
- Work is happening on a dedicated branch **`redesign-nuxt4`** (branched from `master`). `master` + the live `gh-pages` site remain untouched until the new build is verified and deployed.
- Nuxt 2 source was removed from the branch working tree; Nuxt **4.5.2** scaffolded (Vue 3.5.42, Nitro 2.13.4). Old code remains recoverable from git history on `master`.

What was built / verified:
- [x] Fresh Nuxt 4 project (TypeScript, Vite, `app/` srcDir, `nuxi generate` for static output).
- [x] ESLint via `@nuxt/eslint` (flat config, `eslint.config.mjs` → `./.nuxt/eslint.config.mjs`). `npm run lint` passes with 0 errors.
- [x] All 77 static assets consolidated from Nuxt 2 `static/` → `public/` (portfolio images, tech icons, profile photo, favicons, arrows, `.nojekyll`). Boilerplate `static/README.md` dropped (expected).
- [x] Content migrated 1:1:
  - `data.js` → **`app/data/portfolios.ts`** (typed: 5 portfolios, all screenshots, captions, dimensions, tech stack preserved).
  - Home page (`app/pages/index.vue`): headline, about, skillsets, experience (5 roles), portfolio list, links, "go to about" scroll — all ported to Composition API (`<script setup>`).
  - Detail page (`app/pages/portfolios/[name].vue`) with route validation (4 linked portfolios).
- [x] `nuxt generate` builds successfully; 12 routes prerendered (`/`, `/404`, `/200`, and 4 portfolio pages). Verified key content present in static HTML.

**Plan changes (documented as required):**
1. **PhotoSwipe 4 removed** → replaced with a lightweight, self-contained custom lightbox (prev/next, caption counter, Esc/arrow keyboard, backdrop close) in the detail page. No heavy third-party gallery dependency. Lazy-load via placeholder shimmering retained (Nuxt 2 `ImageWithPlaceholder` ported as `app/components/ImageWithPlaceholder.vue`).
2. **ESLint tooling** uses `@nuxt/eslint` (flat config) instead of the legacy `@nuxtjs/eslint-module`/`babel-eslint` stack.
3. **Images/SEO**: global `<head>` via `nuxt.config app.head` + `useHead()` per page; asset paths are URL-root-relative since the site is served at the repo root.
4. **Static path move** `static/` → `public/` (Nuxt 3/4 convention).

**Pending (later phases):**
- Phase 3 — Redesign (visual/typography/layout refresh; design-token CSS polish).
- Phase 4 — Deploy cutover: run `npm run deploy` (gh-pages from `.output/public`), sync `gh-pages` branch, confirm custom domain / `.nojekyll`.