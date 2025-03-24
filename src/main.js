import { createApp } from 'vue'
import App from './App.vue'
import router from './router/route'
import store from './store'
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@fortawesome/fontawesome-free/js/all.js';
import "@fortawesome/fontawesome-free/js/all.min.js"; 


createApp(App).use(router).use(store).mount('#app')
