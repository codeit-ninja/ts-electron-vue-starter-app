import { createApp, App as Vue } from 'vue'
import VueApp from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import './sass/main.scss';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default new class App {
    protected vue: Vue;

    constructor() {
        this.vue = createApp(VueApp);

        this.init();
    }

    protected init() {
        this.vue.use(router);
        this.vue.use(PrimeVue);
        this.vue.mount('#app');
    }
}