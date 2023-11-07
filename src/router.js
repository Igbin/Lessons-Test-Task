import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index.js';
import LoginPage from './pages/LoginPage.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('./pages/HomePage.vue')
  },
  {
    path: '/lesson/:id',
    name: 'Lesson',
    component: () => import('./pages/LessonPage.vue')
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: () => import('./pages/QuizPage.vue')
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach( (to, from, next) => {
  if (to.name !== 'Login') {
    if (!localStorage.getItem('currentUser')) {
      next({ name: 'Login' });
    }

    if (!store.state.lessons.length) {
      store.dispatch('fetchLessons');
    }
  }

  next();
});

export default router;
