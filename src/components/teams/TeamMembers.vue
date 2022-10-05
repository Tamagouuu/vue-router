<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to page 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

// Oke sekarang kita akan passing paramater sebagai props, hal itu dilakukan karena kita akan membuat component ini lebih fleksibel karena jika kita hanya bergantung pada $router itu hanya akan bisa diakses ketika kita akan menggunakan routing saja, namun jika kita menggunakan props itu dapat digunakan juga sebagai component jika ingin digunakan pada suatu template dll. Cara untuk melakukan hal tersebut yaitu sebagai berikut, yang pertama tulis option props di routes dan buat menjadi true. Kemudian baru kita bisa menerima props pada component yang bersangkutan.

export default {
  components: {
    UserItem,
  },
  props: ['teamId'],
  inject: ['users', 'teams'],
  data() {
    return {
      teamName: '',
      members: [],
    };
  },

  // Oke disini kita akan melakukan proses melihat perubahan dari suatu parameter yang juga akan memengaruhi dari data yang dikirimkan oleh vue. Mengapa demikian, ya tentu karena kalo berubah parameter otomatis data itu pasti berubah dong ya. Tapi kok ribet banget harus diwatch segala perubahannya, itu karena emang cara kerja vue yang tidak mereload semua hal yang terjadi dalam satu komponen, misalnya ni kita sama sama menggunakan komponen A sebagai wadah dari suatu data yang ditampilkan. Nah data ini bergantung dengan parameter kita, ketika kita membuat berpindah tempat menggunakan router links hanya dengan mengganti parameter saja, otomatis hal tersebut tidak akan berubah, karena vue tidak mengetahui perubahan pada parameter yang terjadi dan otomatis tidak akan merubah data. Jadi kita harus membuat watchers, yang memaksa vue untuk melakukan suatu perubahan pada suatu data jika data yang di pantau di berubah.

  methods: {
    changeData(teamId) {
      const team = this.teams.find((team) => team.id == teamId);
      const members = [];
      for (const member in team.members) {
        const data = this.users.find((user) => user.id == team.members[member]);
        members.push(data);
      }
      this.teamName = team.name;
      this.members = members;
    },
  },

  // Ini fungsinya untuk melihat suatu route dari keadaan semula apakah berubah, misalnya dia tiba-tiba nambah parameter atau ganti paramater juga bisa dipantau sama nih function. Sama seperti function lainnya dia juga fungsi nyegat routing yang akan dijalankan kalo misalnya suatu rute di update.

  // beforeRouteUpdate(to, from, next) {
  //   console.log('Before Route Update');
  //   console.log(to, from);
  //   next();
  // },

  created() {
    this.changeData(this.teamId);
  },

  watch: {
    teamId(newId) {
      this.changeData(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
