import { createStore } from 'vuex';

export default createStore({
  state: {
    authModalShow: false,
  },
  mutations: {
    toogleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
  },
  getters: {
    authModalShow: (state) => state.authModalShow,
  },
  // getters: {
  // },
  // actions: {
  // },
  // modules: {
  // },
});
