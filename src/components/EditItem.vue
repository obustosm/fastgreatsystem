<template>
    <div>
      <h1>Edit Item</h1>
      <form @submit.prevent="updateItem">
        <div>
          <label for="name">Name:</label>
          <input v-model="item.name" id="name" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <input v-model="item.description" id="description" required>
        </div>
        <div>
          <label for="quantity">Quantity:</label>
          <input v-model="item.quantity" id="quantity" type="number" required>
        </div>
        <button type="submit">Update Item</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        item: {
          id: this.$route.params.id,
          name: '',
          description: '',
          quantity: 1
        }
      };
    },
    created() {
      this.fetchItem();
    },
    methods: {
      fetchItem() {
        axios.get(`http://172.22.88.139:3000/items/${this.item.id}`)
          .then(response => {
            this.item = response.data;
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      },
      updateItem() {
        axios.put(`http://172.22.88.139:3000/items/${this.item.id}`, this.item)
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add some styles if needed */
  </style>
  