import { createApp, App as Vue } from 'vue'
import VueApp from './App.vue'
import router from './router'

import './sass/main.scss';

export default new class App {
    protected vue: Vue;

    constructor() {
        this.vue = createApp(VueApp);

        this.init();
    }

    protected init() {
        this.vue.use(router);
        this.vue.mount('#app');
    }
}