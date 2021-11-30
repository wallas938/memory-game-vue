import { createStore } from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const store = createStore({
    state() {
        return {
            setup: {
                theme: "numbers",
                playerNumber: "one",
                gridSize: "fourTimesFour",
            }
        };
    },
    getters,
    mutations,
    actions
});

export default store;