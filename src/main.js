import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

import "@/sass/_reset.scss";
import "@/sass/_global.scss";

const app = createApp(App);

app.use(router);
app.use(store);


app.mount('#app');

