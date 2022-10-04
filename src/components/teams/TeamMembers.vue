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
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users', 'teams'],
  data() {
    return {
      teamName: '',
      members: [],
    };
  },

  created() {
    const params = this.$route.params.teamId;
    const team = this.teams.find((team) => team.id == params);
    const members = [];
    for (const member in team.members) {
      const data = this.users.find((user) => user.id == team.members[member]);
      members.push(data);
    }
    this.teamName = team.name;
    this.members = members;
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
