import { createStore } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const store = createStore({
  state() {
    return {
      setup: {
        theme: '',
        playerNumber: '',
        gridSize: '', /* 'sixTimesSix' */
      },
    };
  },
  getters,
  mutations,
  actions,
});

export default store;
