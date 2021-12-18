import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: () => ({
    moves: 0,
    matches: [],
    currentPick: null,
    attempts: 0,
    twoLastPicks: [],
    timer: "2:00"
  }),
  getters,
  mutations,
  actions,
};
