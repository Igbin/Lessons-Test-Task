import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lessons: [],
    loadInProcess: false,
  },

  mutations: {
    setLessons(state, payload) {
      this.state.lessons = payload.lessons;
    }
  },

  actions: {
    fetchLessons({ commit }) {
      this.state.loadInProcess = true;

      fetch('/mocks.json')
        .then(response => response.json())
        .then(json => commit('setLessons', json))
        .finally(() => this.state.loadInProcess = false);
    }
  }
});
