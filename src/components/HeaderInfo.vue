<template>
  <div class="header">
    <div class="header__inner">
      <h1 class="header__title">
        Hello {{ currentUser }} !
      </h1>
      <button
        class="statistic-button"
        @click="isShowTable = true"
      >
        Show statistic
      </button>
    </div>
    <button
      class="button button-logout"
      @click="logout"
    />
    <statistic-table
      v-if="isShowTable"
      :currentUser="currentUser"
      @closeModal="isShowTable = false"
    />
  </div>
</template>

<script>
import StatisticTable from '@/components/StatisticTable';
export default {
  name: 'HeaderInfo',
  components: { StatisticTable },
  data() {
    return {
      currentUser: '',
      isShowTable: false,
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: `Login` });
      localStorage.removeItem('currentUser');
    }
  },
  created() {
    this.currentUser = localStorage.getItem('currentUser') || 'unknown';
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: #ffffff;

  .header__title {
    margin: 0;
  }

  .statistic-button {
    @include basic-button;
  }

  .button-logout {
    width: 40px;
    height: 40px;
    background: url("../assets/icons/logout.svg"), #ffffff;
    background-size: contain;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>