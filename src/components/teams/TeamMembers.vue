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
