// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // Tracks @nuxt/eslint — generates .nuxt/eslint.config.mjs for linting.
  modules: ['@nuxt/eslint'],

  // Global CSS loaded for every page
  css: ['~/assets/css/main.css', '~/assets/themes/brittany-vibe.css'],

  // GitHub Pages requires URLs to be served from the repo root.
  // No baseURL is set because the site is deployed at https://joepw.github.io.
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Jonathan Prasetya | Front-End Engineer',
      meta: [
        { name: 'description', content: 'Personal Website and Portfolios of Jonathan Prasetya Wijaya' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
      ],
      script: [
        // Set the theme before first paint to avoid a flash of the wrong theme.
        {
          innerHTML: [
            '(function () {',
            "  var t = null;",
            "  try { t = localStorage.getItem('theme'); } catch (e) {}",
            "  if (t !== 'dark' && t !== 'light') {",
            "    t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'",
            "  }",
            "  document.documentElement.setAttribute('data-theme', t)",
            '})()'
          ].join('\n')
        }
      ]
    }
  }
})