import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['.output', '.data', 'dist', 'public']
})