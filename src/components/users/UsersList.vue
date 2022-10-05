<template>
  <button @click="handleClick">Confirm</button>
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
