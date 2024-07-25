import Vue from 'vue';
import Router from 'vue-router';
import ItemsList from '../components/ItemsList.vue';
import EditItem from '../components/EditItem.vue';
import Login from '../components/Login.vue';  // Asegúrate de tener este componente

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ItemsList',
      component: ItemsList,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/:id',
      name: 'EditItem',
      component: EditItem,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');  // Verifica si el token existe en localStorage
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado
    next('/login');  // Redirige al login
  } else {
    next();  // Continúa a la ruta deseada
  }
});

export default router;
