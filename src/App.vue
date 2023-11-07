<template>
  <div id="app">
    <router-view></router-view>
    <loader-spinner v-if="isLoading" />
  </div>
</template>

<script>

import LoaderSpinner from "@/components/LoaderSpinner";
export default {
  name: 'App',
  components: { LoaderSpinner },
  computed: {
    isLoading() {
      return this.$store.state.loadInProcess;
    }
  }
}
</script>

<style>

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  padding-bottom: 15px;
  background: radial-gradient(
    86.38% 86.38% at 53.41% 100%,
    #5dbf9f 0%,
    #1f966e 100%
  );
}
</style>
