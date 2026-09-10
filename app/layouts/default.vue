<template>
  <div class="layout">
    <ThemeToggle />
    <slot />
    <footer class="footer">
      <p class="footer-name">
        Jonathan Prasetya Wijaya • {{ year }}
      </p>
    </footer>
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 56px 24px 88px;
}

.footer-name {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-soft);
}
</style>