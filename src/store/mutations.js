export default {
  updateTheme(state, payload) {
    state.theme = payload.theme;
  },
  updateGridSize(state, payload) {
    state.gridSize = payload.gridSize;
  },
  updatePlayerNumber(state, payload) {
    state.playerNumber = payload.playerNumber;
  },
  updateEndGame(state, payload) {
    state.endGame = payload.endGame;
  },
};
