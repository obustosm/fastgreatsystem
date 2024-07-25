<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" id="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      ...mapActions(['login']),
      async login() {
        try {
          await this.login({ username: this.username, password: this.password });
          this.$router.push('/');
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add some styles if needed */
  </style>
  