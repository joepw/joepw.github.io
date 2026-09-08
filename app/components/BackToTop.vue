<template>
  <button v-show="isVisible" class="back-to-top" @click="scrollToTop">
    <img
      src="/arrow-down.svg"
      alt="Back to top"
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
  background-color: #191a1d;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  z-index: 3;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.back-to-top:hover {
  background-color: #333;
}
</style>