<template>
  <button v-show="isVisible" class="back-to-top" @click="scrollToTop">
    <img
      src="/arrow-down.svg"
      alt="Back to top"
      width="16"
      height="16"
      style="transform: rotate(180deg);"
    >
  </button>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const isVisible = ref(false)

function handleScroll () {
  isVisible.value = window.scrollY > 100
}

function scrollToTop () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 8px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  cursor: pointer;
  z-index: 3;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.back-to-top:hover {
  background-color: var(--color-hover-bg);
  color: var(--color-accent);
}
</style>