export default {
  updatePlayers(context, payload) {
    context.commit('updatePlayers', { players: payload.players })
  },
  updateTwoLastPicks(context, payload) {
    context.commit('updateTwoLastPicks', payload.twoLastPicks)
  },
  updateCurrentPick(context, payload) {
    const twoLastPicks = context.getters.twoLastPicks;
    if (context.getters.currentPick == null) {
      context.commit('updateCurrentPick', { currentPick: payload.currentPick });
      context.commit('updateTwoLastPicks', { twoLastPicks: [...twoLastPicks, payload.currentPick.value] });
      return;
    }

    if (context.getters.currentPick.value === payload.currentPick.value &&
      context.getters.currentPick.index !== payload.currentPick.index) {

      context.dispatch('updateMatches', { matches: [...context.getters.matches, payload.currentPick.value] });
      context.commit('updateCurrentPick', { currentPick: null });
      context.dispatch('emptyTwoLastPicks');
      context.dispatch('updatePlayerPoints');
      return;
    }
    context.commit('updateCurrentPick', { currentPick: null });
    context.commit('updateTwoLastPicks', { twoLastPicks: [...twoLastPicks, payload.currentPick.value] });
    context.dispatch('updateCurrentTurn');
  },
  updateCurrentTurn(context) {
    const currentTurn = context.getters.currentTurn;
    const players = context.getters.players;

    switch (currentTurn) {
      case 1:
        context.commit('updateCurrentTurn', { currentTurn: 2 });
        break;
      case 2:
        if (players.length === 2) {
          context.commit('updateCurrentTurn', { currentTurn: 1 });
        } else {
          context.commit('updateCurrentTurn', { currentTurn: 3 });
        }
        break;
      case 3:
        if (players.length === 3) {
          context.commit('updateCurrentTurn', { currentTurn: 1 });
        } else {
          context.commit('updateCurrentTurn', { currentTurn: 4 });
        }
        break;
      case 4:
        context.commit('updateCurrentTurn', { currentTurn: 1 });
        break;
    }
  },
  updateAttempts(context, payload) {
    const attempts = context.getters.attempts;
    if (attempts <= 1) {
      context.commit('updateAttempts', { attempts: payload.attempt + attempts });
      return;
    }
    context.commit('updateAttempts', { attempts: 1 });
  },
  updateMatches(context, payload) {
    context.commit('updateMatches', { matches: payload.matches });
  },
  emptyTwoLastPicks(context) {
    context.commit('emptyTwoLastPicks');
  },
  updatePlayerPoints(context) {
    context.commit('updatePlayerPoints');
  }
};
