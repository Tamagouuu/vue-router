import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router); // method use digunakan untuk menyuruh vue menggunakan third-party library

app.mount('#app');
