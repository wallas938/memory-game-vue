import { createRouter, createWebHistory } from 'vue-router';

import Starter from './pages/Starter.vue';
import Game from './pages/Game.vue';

import NotFound from './pages/NotFound.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/starter' },
        { path: '/starter', component: Starter},
        { path: '/game', component: Game},
        { path: '/:notFound(.*)', component: NotFound }
    ],
})