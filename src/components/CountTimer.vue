<template>
  <div>
    <b><span>{{ formattedMinutes }}</span>:<span>{{ formattedSeconds }}</span>:<span>{{ formattedMilliseconds }}</span></b>
  </div>
</template>

<script>
export default {
  name: 'CountTimer',
  data() {
    return  {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      timerInterval: null,
      timerRunning: false,
    }
  },
  computed: {
    formattedMilliseconds() {
      return String(this.milliseconds).padStart(2, '0');
    },
    formattedSeconds() {
      return String(this.seconds).padStart(2, '0');
    },
    formattedMinutes() {
      return String(this.minutes).padStart(2, '0');
    },
  },
  methods: {
    updateTimer() {
      this.milliseconds += 10;
      if (this.milliseconds === 1000) {
        this.milliseconds = 0;
        this.seconds += 1;
      }
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes += 1;
      }
    },
    startTimer() {
      this.timerInterval = setInterval(this.updateTimer, 10);
      this.timerRunning = true;
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      this.$emit(
        'result',
        `${this.formattedMinutes} minutes ${this.formattedSeconds} seconds ${this.formattedMilliseconds} milliseconds`
      );
    }
  },
  destroyed() {
    clearInterval(this.timerInterval);
  }
}
</script>

<style scoped>

span:last-child {
  display: inline-block;
  width: 25px;
}

</style>