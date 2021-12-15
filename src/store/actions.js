export default {
  /**
 *@param {object} context vuex context
 *@param {object} payload user's setup send througout the page game setup
 *@returns {void} It calls updateSetup mutation
 */
  updateSetup(context, payload) {
    context.commit('updateSetup', payload);
  },
};
