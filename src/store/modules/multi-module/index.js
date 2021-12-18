
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default{
  namespaced: true,
  state: () => ({
    players: [],
    turn: 1
  }),
  getters,
  mutations,
  actions,
};
