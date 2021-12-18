export default {
  /**
*@returns {number} Number of moves currently done
*/
  moves(state) {
    return state.moves;
  },
  /**
*@returns {Array} Array of found pairs
*/
  matches(state) {
    return state.matches;
  },

  currentPick(state) {
    return state.currentPick;
  },
  attempts(state) {
    return state.attempts;
  },
  twoLastPicks(state) {
    return state.twoLastPicks;
  },
  timer(state) {
    return state.timer;
  }
};
