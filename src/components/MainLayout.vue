<template>
  <div>
    <h2 class="main-title">
      <slot name="title"></slot>
    </h2>
    <main class="main-content">
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped lang="scss">
.main-title {
  color: #ffffff;
}

.main-content {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  max-height: 75vh;
  width: 70%;
  margin: 15px auto;
  padding-top: 20px;
  border-radius: 15px;
  background: #ffffff;
  overflow: auto;
}

</style>