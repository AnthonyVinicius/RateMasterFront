import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePageView.vue'

/*
Empresa poder responder o comentario do usuario

*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'homepage', component: Home },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/registerUser', name: 'registerUser', meta: {requireAuth : true}, component: () => import('../views/RegisterUserView.vue') },
    { path: '/teste', name: 'teste', meta: {requireAuth : true}, component: () => import('../views/Teste.vue') },
    { path: '/reviews', name: 'reviews', meta: {requireAuth : true}, component: () => import('../views/ProductReviewsView.vue') },
    { path: '/registerProduct', name: 'registerProduct', meta: {requireAuth : true}, component: () => import('../views/RegisterProductView.vue') },
    { path: '/brand', name: 'brands', meta: {requireAuth : true}, component: () => import('../views/BrandView.vue') },
    { path: '/updateProducts/:id', name: 'updateProducts', meta: {requireAuth : true}, component: () => import('../views/UpdateProductsView.vue') },
    { path: '/product/:id', name: 'productDetail', meta: {requireAuth : true}, component: () => import('../views/ProductDetailsView.vue') },
    { path: '/myProfile', name: 'myProfile', meta: {requireAuth : true}, component: () => import('../views/MyProfileView.vue')},
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    if (AuthService.isAuthenticated.value) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


export default router
