<template>
  <div class="layout">
    <ThemeToggle />
    <slot />
    <footer class="footer">
      Jonathan Prasetya Wijaya • {{ year }}
    </footer>
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 50px 80px;
  text-align: center;
  font-weight: 700;
  color: var(--color-text-soft);
}
</style>