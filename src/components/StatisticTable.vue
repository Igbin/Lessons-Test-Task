<template>
  <basic-modal @close="$emit('closeModal')">
    <template v-slot:header>
      Statistic of tries for {{ currentUser }}:
    </template>
    <template v-slot:body>
      <template v-if="Object.keys(userTries).length">
        <div v-for="(lesson, index) in userTries" :key="index" class="lesson-stat__item">
          <h3>{{ lesson.title }}:</h3>
          <div class="stat-row">
            <span><b>Number of attempts:</b></span> <span>{{ lesson.triesCount }}</span>
          </div>
          <div class="stat-row">
            <span><b>Last attempt date:</b></span> <span>{{ lesson.stat.lastDate }}</span>
          </div>
          <div class="stat-row">
            <span><b>Last result:</b></span> <span>{{ lesson.stat.lastTime }}</span>
          </div>
          <div class="stat-row">
            <span><b>Last score:</b></span> <span>{{ lesson.stat.lastScore }}%</span>
          </div>
        </div>
      </template>
      <template v-else>
        <p>There is no attempts for this user yet</p>
      </template>
    </template>
  </basic-modal>
</template>

<script>
import BasicModal from '@/components/BasicModal';
export default {
  name: 'StatisticTable',
  props: {
    currentUser: String
  },
  data() {
    return {
      userTries: {},
    }
  },
  components: { BasicModal },
  created() {
    if (localStorage.getItem('usersTries')) {
      this.userTries = Object.assign({}, this.userTries, JSON.parse(localStorage.getItem('usersTries')))[this.currentUser];
    }
  }
}
</script>

<style scoped lang="scss">

.lesson-stat__item {
  .stat-row {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 10px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
}

</style>