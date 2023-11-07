<template>
  <div>
    <header-info />
    <main-layout>
      <template v-slot:title>
        Answer the {{ lesson.title }} questions:
      </template>
      <template v-slot:main>
        <div class="counter-container" v-show="!quizFinished">
          <count-timer
            ref="countTimer"
            @result="result => resultTime = result"
          />
        </div>
        <ul class="lesson-question-list">
          <li v-for="question in lesson.quiz" :key="question.id" class="question__item">
            <h2 class="question__item__title">
              {{ question.question }}
            </h2>
            <div
              v-for="(answer, index) in question.answers"
              :key="index"
              class="answer__item"
            >
              <input
                class="answer-radio"
                type="radio"
                :disabled="quizFinished"
                :id="`${question.id}_answer_${index}`"
                :value="answer"
                v-model="userAnswers.find(answer => answer.id == question.id).answer"
              >
              <label :for="`${question.id}_answer_${index}`" class="answer-label">
                {{ answer }}
              </label>
            </div>
            <p v-if="userAnswers.find(answer => answer.id == question.id).isError" class="answer-error-message">
              Incorrect answer
            </p>
          </li>
        </ul>
        <button
          v-if="!quizFinished"
          :disabled="!allCompleted"
          class="finish-quiz-button"
          @click="finishQuiz"
        >
          Finish Quiz
        </button>
        <template v-else>
          <h3 class="stat__item">Your result is: {{ resultTime }}</h3>
          <h3 class="stat__item">Your score is: {{ score }}%</h3>
          <button class="go-home-button" @click="navigateHome">
            Go Home
          </button>
        </template>
      </template>
    </main-layout>
  </div>
</template>

<script>
import HeaderInfo from '@/components/HeaderInfo';
import CountTimer from '@/components/CountTimer';
import MainLayout from "@/components/MainLayout";

export default {
  name: 'QuizPage',
  components: { MainLayout, HeaderInfo, CountTimer },
  data() {
    return {
      userAnswers: [],
      resultTime: '',
      quizFinished: false,
      currentUser: '',
      score: null
    }
  },
  created() {
    this.currentUser = localStorage.getItem('currentUser') || 'unknown';
  },
  computed: {
    lesson() {
      const lesson = this.$store.state.lessons.find(lesson => lesson.id == this.$route.params.id);

      if (!this.userAnswers.length) {
        lesson.quiz.forEach(question => {
          this.userAnswers.push({ id: question.id, answer: null, isError: null })
        });
      }

      return lesson;
    },
    allCompleted() {
      return this.userAnswers.every(answer => answer.answer !== null);
    }
  },
  methods: {
    finishQuiz() {
      this.$refs.countTimer.stopTimer();
      this.quizFinished = true;
      this.validateResults();
      this.calculateScore();
      this.saveResults();
    },
    navigateHome() {
      this.$router.push({ name: 'Home' });
    },
    validateResults() {
      this.userAnswers.forEach(answer => {
        if (answer.answer !== this.lesson.quiz.find(question => question.id == answer.id).correctAnswer) {
          answer.isError = true;
        }
      });
    },
    calculateScore() {
      const errorsCount = this.userAnswers.map(answer => answer = answer.isError).reduce((acc, cur) => {
        if (cur) acc += 1;
        return acc;
      });
      this.score = Math.abs(errorsCount / this.lesson.quiz.length * 100 - 100);
    },
    saveResults() {
      if (!localStorage.getItem('usersTries')) {
        localStorage.setItem('usersTries', JSON.stringify({}));
      }

      const date = new Date();
      const lastStat = {
        lastTime: this.resultTime,
        lastDate: date.getUTCFullYear() + ' ' + date.getMonth() + ' ' + date.getDate(),
        lastScore: this.score
      }

      const usersTries = JSON.parse(localStorage.getItem('usersTries'));
      const currentUserStat = usersTries[this.currentUser] || [];
      let currentLessonStat = currentUserStat.find(lesson => lesson.title === this.lesson.title);

      if (currentLessonStat) {
        currentLessonStat.triesCount = Number(currentLessonStat.triesCount) + 1;
        currentLessonStat.stat = lastStat;
      } else {
        currentLessonStat = {
          title: this.lesson.title,
          triesCount: 1,
          stat: lastStat
        }
      }

      if (currentUserStat.length && currentUserStat.find(lesson => lesson.title === this.lesson.title)) {
        const index = currentUserStat.findIndex(lesson => lesson.title === this.lesson.title);
        usersTries[this.currentUser].splice(index, 1);
      }

      if (usersTries[this.currentUser]) {
        usersTries[this.currentUser].push(currentLessonStat);
      } else {
        usersTries[this.currentUser] = [currentLessonStat];
      }

      localStorage.setItem('usersTries', JSON.stringify(usersTries));
    }
  },
  mounted() {
    this.$refs.countTimer.startTimer();
  }
}
</script>

<style scoped lang="scss">
.counter-container {
  position: sticky;
  top: 10px;
  background-color: #ffffff;
}

.lesson-question-list {
  list-style-type: none;
  padding: 0;

  .answer-error-message {
    margin: 0;
    color: #DC143C;
  }

  .answer__item {
    display: flex;
    align-items: baseline;
    width: 50px;
    margin: 0 auto;

    .answer-label {
      margin-left: 5px;
    }
    .answer-radio:not([disabled]),.answer-label:not([disabled]) {
      cursor: pointer;
    }
  }
}

.stat__item {
  margin: 5px;
}

.finish-quiz-button, .go-home-button {
  @include basic-button;

  margin: auto auto 10px;
}
</style>