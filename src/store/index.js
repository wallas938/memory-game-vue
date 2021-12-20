import { createStore } from 'vuex';

/** Modules */
import soloModule from './modules/solo-module/index';
import multiModule from './modules/multi-module/index';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const store = createStore({
  modules: {
    solo: soloModule,
    multi: multiModule
  },
  state: {
    theme: 'numbers',
    playerNumber: 'one', /* one, two, three, four */
    gridSize: 'fourTimesFour', /* 'sixTimesSix' */
    endGame: false,
  },
  getters,
  mutations,
  actions,
});

export default store;
