<template>
  <div id="app">
    <ItemsList />
    <AddItem @item-added="refreshItems" />
  </div>
</template>

<script>
import ItemsList from './components/ItemsList.vue';
import AddItem from './components/AddItem.vue';

export default {
  components: {
    ItemsList,
    AddItem
  },
  methods: {
    refreshItems() {
      this.$refs.itemsList.fetchItems();
    }
  }
};
</script>

<style>
/* Add some styles if needed */
</style>
