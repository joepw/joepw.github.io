<template>
  <button v-show="isVisible" class="back-to-top" @click="scrollToTop">
    <img
      src="~/static/arrow-down.svg"
      alt="Back to top"
      style="transform: rotate(180deg);"
    >
  </button>
</template>

<script>
export default {
  data () {
    return {
      isVisible: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.isVisible = window.scrollY > 100
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
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
  font-family: Inherit;
  display: flex;
  align-items: center;
}

.back-to-top:hover {
  background-color: #333;
}
</style>
