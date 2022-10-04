import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';

const router = createRouter({
  history: createWebHistory(), // Digunakan untuk membuat suatu history didalam web browser, sehingga nantinya ngga akan ngereload lagi ketika dia mau diback or di forward.
  routes: [
    {
      path: '/teams',
      component: TeamsList,
    },
    {
      path: '/users',
      component: UsersList,
    },
    {
      name: 'TeamDetail',
      path: '/teams/:teamId',
      component: TeamMembers,
    },
  ],
  // linkActiveClass: 'active', // Digunakan untuk aliasing active class. Kan awalnya nama dari link active classnya itu "router-link-active" tapi kalo mau ngubah bisa disini misalnya kayak "active".WW
});

const app = createApp(App);

app.use(router); // method use digunakan untuk menyuruh vue menggunakan third-party library

app.mount('#app');
