<template>
  <button @click="handleClick">Confirm</button>
  <button @click="isSaved = true">Confim Saved</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],

  data() {
    return {
      isSaved: false,
    };
  },

  methods: {
    handleClick() {
      this.$router.push('/teams');
    },
  },

  // Ini merupakan pengecekan terakhir lah bisa dibilang, karena ini dilakukan setelah, beforeEach, beforeEnter dan baru ini dilakukan, hal yang dilakukan sih sama dapat mencegah ataupun memperbolehkan eaaa.

  beforeRouteEnter(to, from, next) {
    console.log('Before Route Enter a Component');
    console.log(to, from);
    next();
  },

  // Ini berfungsi untuk melakukan pengecekan, sebelum kita meninggalkan suatu page gitu. Misalnya kita mau buat konfirmasi apakah yakin akan meninggalkan rute tersebut misalnya kyk form dll.

  beforeRouteLeave(to, from, next) {
    console.log('Before Route Leave');
    console.log(to, from);
    if (!this.isSaved) {
      const isConfirm = confirm('Yakin mau keluar ?');
      next(isConfirm);
    }
    next();
    next();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
