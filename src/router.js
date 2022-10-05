import { createRouter, createWebHistory } from 'vue-router';

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
      meta: { needAuth: true }, // Ini fungsinya untuk memberikan suatu data yang dibutuhkan nantinya mungkin dapat dijadikan sebagai validasi untuk suatu route
      components: { default: TeamsList, footer: TeamFooter }, // Kita menggunakan option components dikarenakan kita akan menggunkan lebih dari satu komponen
      // alias: '/', // Alias ini digunakan untuk mengalihkan tampilan ke komponen yang bersangkutan.
      // Children ini berfungsi sebagai nested route, yang dimana nested route ini bekerja dengan cara menjadikan suatu route merupakan anak dari suatu root route. Bingung?, yo sini tak jelasin. Kalo kita misalkan, salah satu route yang ada dichildren ini jadikan root route which is dia ngga ada di children, otomatis dia akan menampilkan view nya dari App.vue. Kalo misalnya children, itu router-view nya hanya bisa diakses oleh route yang menjadi parentnya gitu. Biar ngga bingung coba liat ke component team list deh.
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
      name: 'users',
      path: '/users',
      components: { default: UsersList, footer: UserFooter },
      // Ini sama juga sama beforeEach, cuma ini bedanya ini lebih spesifik dibanding beforeEach, kalo beforeEach itu kan dilakukan untuk semua rute, kalo ini dia spesifik kalo rute mau masuk kesini gitu.
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter');
        console.log(to, from);
        next();
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  // linkActiveClass: 'active', // Digunakan untuk aliasing active class. Kan awalnya nama dari link active classnya itu "router-link-active" tapi kalo mau ngubah bisa disini misalnya kayak "active".
  // scrollBehavior(to, from, savedPosition) {
  //   console.log(to, from, savedPosition);

  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return { top: 0, left: 0 };
  // }, digunakan untuk user experienced purpose yang dimana intinya scroll behavior ini memungkin kan kita untuk mengatur dimana posisi akhir ataupun awal seorang user dalam melihat suatu website gitchu
});

// beforeEach ini dijalankan sebelum kita menuju sebuah rute yang telah didaftarkan, misal kita mau ke /users ataupun /teams maka function ini akan dijalankan terlebih dahulu kemudian baru function ini memberi keputusan mau lanjut, redirect, ataupun distop begitu.

router.beforeEach((to, from, next) => {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needAuth) {
    console.log('Need Auth');
    next();
  } else {
    next();
  }
  // if (to.name == 'users') {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // } else {
  //   next();
  // }
  next();
});

// Sebenarnya afterEach ini ngga bisa mencegah seperti before sebelumnya, mengingat router after Each ini dilakukan setelah route ini telah dicapai gitu. Men fungsingnya apa kalo gitu, mungkin ini bisa aja dipakai analytical data, anjayy.... artinya apa, Mungkin fungsinya dapat mengirimkan data ke server sebagai analisis page apa yang sering dikunjungin.

router.afterEach((to, from) => {
  console.log('AfterEach');
  console.log(to, from);
});

export default router;
