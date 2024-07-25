import Vue from 'vue';
import Router from 'vue-router';
import ItemsList from '../components/ItemsList.vue';
import EditItem from '../components/EditItem.vue';
import Login from '../components/Login.vue';
import store from '../store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ItemsList',
      component: ItemsList,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/edit/:id',
      name: 'EditItem',
      component: EditItem,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});

export default router;
