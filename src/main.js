import './assets/main.css'
import 'primeicons/primeicons.css';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';


import { createApp } from 'vue'
import App3 from './App3.vue'

const app = createApp(App3);
app.use(router);
app.use(Toast);

app.mount('#app');
