<template>
  <div class="login-page">
    <login-form @proceed="onProceed" />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: { LoginForm },
  methods: {
    onProceed(email) {
      localStorage.setItem('currentUser', email);
      this.$router.push({ name: `Home` });
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  min-height: 100vh;
}
</style>
