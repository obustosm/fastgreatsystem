<template>
    <div>
      <h1>Add New Item</h1>
      <form @submit.prevent="addItem">
        <div>
          <label for="name">Name:</label>
          <input v-model="newItem.name" id="name" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <input v-model="newItem.description" id="description" required>
        </div>
        <div>
          <label for="quantity">Quantity:</label>
          <input v-model="newItem.quantity" id="quantity" type="number" required>
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newItem: {
          name: '',
          description: '',
          quantity: 1
        }
      };
    },
    methods: {
      addItem() {
        axios.post('http://172.22.88.139:3000/items', this.newItem)  // Usa la IP de WSL
          .then(response => {
            console.log('Item added:', response.data);
            this.$emit('item-added');
            this.newItem = { name: '', description: '', quantity: 1 };
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
  