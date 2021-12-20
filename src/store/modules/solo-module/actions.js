export default {
  /**
 *@param {object} context store context
 *@param {object} payload user's setup send througout the page game setup
 *@returns {void} It calls updateSetup mutation
 */
  updateMoves(context) {
    context.commit('updateMoves');
  },
  updateMatches(context, payload) {
    context.commit('updateMatches', { matches: payload.matches });
  },
  updateCurrentPick(context, payload) {
    const twoLastPicks = context.getters.twoLastPicks;
    context.commit('updateMoves');
    if (context.getters.currentPick == null) {
      context.commit('updateCurrentPick', { currentPick: payload.currentPick });
      context.commit('updateTwoLastPicks', { twoLastPicks: [...twoLastPicks, payload.currentPick.value] });
      return;
    }

    if (context.getters.currentPick.value === payload.currentPick.value &&
      context.getters.currentPick.index !== payload.currentPick.index) {
      context.dispatch('updateMatches', { matches: [...context.getters.matches, payload.currentPick.value] });
      context.commit('updateCurrentPick', { currentPick: null });
      context.commit('updateTwoLastPicks', { twoLastPicks: [] });
      return;
    }

    context.commit('updateCurrentPick', { currentPick: null });
    context.commit('updateTwoLastPicks', { twoLastPicks: [...twoLastPicks, payload.currentPick.value] });
  },

  updateAttempts(context, payload) {
    const attempts = context.getters.attempts;
    if (attempts <= 1) {
      context.commit('updateAttempts', { attempts: payload.attempt + attempts });
      return;
    }
    context.commit('updateAttempts', { attempts: 1 });
  },
  updateTimer(context, payload) {
    context.commit('updateTimer', { timer: payload.timer });
  },
  emptyTwoLastPicks(context) {
    context.commit('emptyTwoLastPicks');
  },
};
