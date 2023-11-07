<template>
  <div>
    <header-info />
    <main-layout>
      <template v-slot:title>
        {{ lesson.title }}
      </template>
      <template v-slot:main>
        <p class="lesson-content">{{ lesson.content }}</p>
        <button class="quiz-button" @click="startQuiz">Start Quiz</button>
      </template>
    </main-layout>
  </div>
</template>

<script>
import HeaderInfo from '@/components/HeaderInfo';
import MainLayout from "@/components/MainLayout";

export default {
  name: 'LessonPage',
  components: { MainLayout, HeaderInfo },
  methods: {
    startQuiz() {
      this.$router.push({ name: 'Quiz', params: { id: this.$route.params.id }});
    }
  },
  computed: {
    lesson() {
      return this.$store.state.lessons.find(lesson => lesson.id == this.$route.params.id);
    }
  },
}
</script>

<style scoped lang="scss">
.lesson-content {
  padding: 0 20px;
  line-height: 25px;
}

.quiz-button {
  @include basic-button;

  margin: auto auto 10px;
}

</style>