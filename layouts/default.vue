<template>
  <div>
    <Nuxt />
    <footer class="footer">
      Jonathan Prasetya Wijaya • {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<style scoped>
.footer {
  padding: 50px 80px;
  text-align: center;
  font-weight: 700;
}
</style>
