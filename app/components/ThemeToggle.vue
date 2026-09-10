<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="`Switch to ${isLight ? 'dark' : 'light'} theme`"
    :title="`Switch to ${isLight ? 'dark' : 'light'} theme`"
    @click="toggle"
  >
    <SunIcon v-if="isLight" />
    <MoonIcon v-else />
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const THEME_KEY = 'theme'

const isLight = ref(false)

function apply (theme: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(THEME_KEY, theme)
  }
  catch {
    /* localStorage unavailable — theme still applies for this visit */
  }
  isLight.value = theme === 'light'
}

function toggle () {
  apply(isLight.value ? 'dark' : 'light')
}

onMounted(() => {
  isLight.value = document.documentElement.getAttribute('data-theme') === 'light'
})
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 40;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.theme-toggle:hover {
  color: var(--color-accent);
}

/* On mobile the fixed top nav bar occupies the top-right corner;
   drop the toggle just below it to avoid overlap. */
@media (max-width: 900px) {
  .theme-toggle {
    top: 70px;
  }
}
</style>