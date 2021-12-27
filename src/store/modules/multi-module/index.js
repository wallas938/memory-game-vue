
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: () => ({
    players: [],
    twoLastPicks: [],
    currentPick: null,
    currentTurn: 1,
    attempts: 0,
    matches: [],
    winners: []
  }),
  getters,
  mutations,
  actions,
};
