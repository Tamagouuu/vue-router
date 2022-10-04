import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamFooter from './components/teams/TeamFooter.vue';
import UserFooter from './components/users/UserFooter.vue';

const router = createRouter({
  history: createWebHistory(), // Digunakan untuk membuat suatu history didalam web browser, sehingga nantinya ngga akan ngereload lagi ketika dia mau diback or di forward.
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamFooter }, // Kita menggunakan option components dikarenakan kita akan menggunkan lebih dari satu komponen
      // alias: '/', // Alias ini digunakan untuk mengalihkan tampilan ke komponen yang bersangkutan.
      // Children ini berfungsi sebagai nested route, yang dimana nested route ini bekerja dengan cara menjadikan suatu route merupakan anak dari suatu root route. Bingung?, yo sini tak jelasin. Kalo kita misalkan, salah satu route yang ada dichildren ini jadikan root route which is dia ngga ada di children, otomatis dia akan menampilkan view nya dari App.vue. Kalo misalnya children, itu router-view nya hanya bisa diakses oleh route yang menjadi parentnya gitu. Biar ngga bingung coba liat ke component team members deh.
      children: [
        {
          name: 'team-members',
          path: '/teams/:teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UserFooter },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  // linkActiveClass: 'active', // Digunakan untuk aliasing active class. Kan awalnya nama dari link active classnya itu "router-link-active" tapi kalo mau ngubah bisa disini misalnya kayak "active".
});

const app = createApp(App);

app.use(router); // method use digunakan untuk menyuruh vue menggunakan third-party library

app.mount('#app');
