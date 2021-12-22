export default {
  updatePlayers(state, payload) {
    state.players = payload.players;
  },
  updateTwoLastPicks(state, payload) {
    state.twoLastPicks = payload.twoLastPicks;
  },
  updateCurrentPick(state, payload) {
    state.currentPick = payload.currentPick;
  },
  updateCurrentTurn(state, payload) {
    state.currentTurn = payload.currentTurn;
  },
  updateAttempts(state, payload) {
    state.attempts = payload.attempts;
  },
  updateMatches(state, payload) {
    state.matches = payload.matches;
  },
  updatePlayerPoints(state) {
    const currentTurn = state.currentTurn;
    state.players = state.players.map((player) => {
      if (player.playerNumber === currentTurn) {
        player.points = player._points + 1;
      }
      return player;
    });
  },
  resetPlayerPoints(state) {
    state.players = state.players.map((player) => {
      player.points = 0;
      return player;
    });
  },
  emptyTwoLastPicks(state) {
    state.twoLastPicks = [];
  },
};
