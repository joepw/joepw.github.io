# Jonathan Prasetya — Personal Portfolio Website

[joepw.github.io](https://joepw.github.io) — a personal website and portfolio, rebuilt with **Nuxt 4**.

## Stack

- [Nuxt 4](https://nuxt.com) (Vue 3, Composition API)
- Static site generation for GitHub Pages (via `nuxt generate`)
- Hand-written, organized CSS in `app/assets/css/main.css`
- Type-safe portfolio content in `app/data/portfolios.ts`

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# lint
$ npm run lint

# build the static site (output to .output/public)
$ npm run generate

# preview the built site locally
$ npm run preview
```

## Deploy

The site is deployed to GitHub Pages from the `gh-pages` branch.

```bash
# build then push .output/public to the gh-pages branch
$ npm run deploy
```

## Project Structure

```
app/
  app.vue                  # root app component
  assets/css/main.css      # global CSS (design tokens + base styles)
  components/              # BackToTop, ImageWithPlaceholder
  data/portfolios.ts       # typed portfolio content (migrated from Nuxt 2 data.js)
  layouts/default.vue      # default layout + footer
  pages/index.vue          # About, Skillsets, Experience, Portfolio
  pages/portfolios/[name].vue  # portfolio detail + lightbox
public/                    # static assets (images, tech icons, favicons)
nuxt.config.ts
```

> Notes for future maintenance:
> - Photoswipe upgraded from v4 to v5 (`PhotoSwipeLightbox`, `dataSource`, `uiRegister`) — see `PLAN.md`.
> - All asset paths are URL-root-relative (`/portfolio/...`) since the site is served at the repo root.
