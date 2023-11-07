<template>
  <div class="login-form">
    <form @submit.prevent="onProceed">
      <input
        class="login-input"
        v-model.trim="email"
        type="email"
        placeholder="Enter email:"
      >
      <button
        class="proceed-button"
        type="submit"
        :disabled="!email"
      >
        Proceed
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    onProceed() {
      this.$emit('proceed', this.email);
    },
  }
}

</script>

<style scoped lang="scss">
.login-form {
  min-width: 300px;
  padding: 50px 50px 38px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 2px 2px 48px #1b6f53;
  border-radius: 24px;
  @media screen and (max-width: 575px) {
    padding: 32px 15px;
  }

  form {
    display: flex;
    flex-direction: column;

    .login-input, .proceed-button {
      height: 40px;
      padding: 0 10px;
      margin-bottom: 20px;
      border: 1px solid gray;
      border-radius: 10px;
      font-family: "Open Sans", sans-serif;
      font-size: 15px;
      line-height: 20px;
      color: gray;
    }

    .proceed-button {
       border-radius: 20px;
       margin: 20px 0 0;

       &:not([disabled]) {
         cursor: pointer;
       }
     }
  }
}


</style>