<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="`Switch to ${isLight ? 'dark' : 'light'} theme`"
    :title="`Switch to ${isLight ? 'dark' : 'light'} theme`"
    @click="toggle"
  >
    <!-- Sun icon: shown when in light theme -->
    <svg
      v-if="isLight"
      class="theme-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" />
      <g
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        fill="none"
      >
        <path d="M18.5 12L22 12M16.6 8.6L19.8 5.4M12 5.5L12 2M7.4 8.6L4.2 5.4M5.5 12L2 12M7.4 15.4L4.2 18.6M12 18.5L12 22M16.6 15.4L19.8 18.6" />
      </g>
    </svg>
    <!-- Crescent moon icon: shown when in dark theme -->
    <svg
      v-else
      class="theme-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.25 8.515l-5.5 3.858-4.77-.01-3.059-3.936.027.857-3.984 3.094.088.902-7.7 1.076-1.135.013-.446 5.512-.888-2.822 2.743.314-.047-3.475 4.18-2.842-1.293.612-.69 4.805-2.464.026-6.904-.512-2.472.97-5.222-6.947 1.236-.745 5.2-1.094 1.023-2.504-.294-4.256.671-5.237-1.355 1.086-4.28-.403-1.803-4.78-.606-3.38 4.28.35-1.353 2.167.21-2.714 3.33l-2.21 2.997-3.052.392-6.43 5.25 4.337.446-5.08 1.452-2.282.82-6.968-.444-6.228-.033-8.542.66-4.894-1.226-4.96.701-5.05.96" />
    </svg>
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

.theme-icon {
  display: block;
}
</style>