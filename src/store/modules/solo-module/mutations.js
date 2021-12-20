export default {
  /**
*@param {number} payload An bject that contains number of moves
ex: { moves: 13 }
@returns {void}
*/
  updateMoves(state) {
    state.moves = state.moves + 1;
  },

  /**
*@param {Array} payload An array of user's matches
ex: [1,1,5,5]
@returns {void}
*/
  updateMatches(state, payload) {
    state.matches = payload.matches;
  },
  updateCurrentPick(state, payload) {
    state.currentPick = payload.currentPick;
  },
  updateAttempts(state, payload) {
    state.attempts = payload.attempts;
  },
  updateTwoLastPicks(state, payload) {
    state.twoLastPicks = payload.twoLastPicks;
  },
  emptyTwoLastPicks(state) {
    state.twoLastPicks = [];
  },
  updateTimer(state, payload) {
    state.timer = payload.timer;
  }
};
