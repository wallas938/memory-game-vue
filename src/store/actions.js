import { setPlayers } from '../utils/index';

export default {
  /**
 *@param {object} context store context
 *@param {object} payload user's setup send througout the page game setup
 *@returns {void} It calls updateSetup mutation
 */
  updateSetup(context, payload) {
    context.commit('updateTheme', { theme: payload.setup.theme });
    context.commit('updatePlayerNumber', { playerNumber: payload.setup.playerNumber });
    context.commit('updateGridSize', { gridSize: payload.setup.gridSize });
    const players = setPlayers(payload.setup.playerNumber);
    context.commit('multi/updatePlayers', { players: players });
  },
  updateEndGame(context, payload) {
    context.commit('updateEndGame', { endGame: payload.endGame });
  },
  restart(context, payload) {
    context.commit('restart', { status: payload.status });
  }
};
