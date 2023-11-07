<template>
  <div>
    <header-info />
    <main-layout>
      <template v-slot:title>
        Available lessons:
      </template>
      <template v-slot:main>
        <ul class="lesson-link-list">
          <li v-for="lesson in lessons" :key="lesson.id">
            <router-link class="lesson-link__item" :to="{ name: 'Lesson', params: { id: lesson.id }}">
              {{ lesson.title }}
            </router-link>
          </li>
        </ul>
      </template>
    </main-layout>
  </div>
</template>

<script>
import HeaderInfo from '@/components/HeaderInfo';
import MainLayout from '@/components/MainLayout';

export default {
  name: 'HomePage',
  components: { HeaderInfo, MainLayout },
  computed: {
    lessons() {
      return this.$store.state.lessons;
    }
  },
}
</script>

<style scoped lang="scss">
.lesson-link-list {
  list-style-type: none;
  padding: 0;

  .lesson-link__item {
    display: block;
    margin-bottom: 15px;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    color: #1b6f53;
    transition: all 0.5s;

    &:hover {
      background: #5dbf9f;
      color: #ffffff;
    }
  }
}
</style>