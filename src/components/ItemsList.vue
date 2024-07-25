<template>
  <div>
    <h1>Items List</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <router-link :to="`/edit/${item.id}`">Edit</router-link>
        <button @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    fetchItems() {
      axios.get('http://172.22.88.139:3000/items')
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
    deleteItem(id) {
      axios.delete(`http://172.22.88.139:3000/items/${id}`)
        .then(() => {
          this.fetchItems();
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
