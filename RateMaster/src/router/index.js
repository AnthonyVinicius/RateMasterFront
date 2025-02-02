import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePageView.vue';
import { userData, isAuthenticated } from "@/services/AuthService";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'homepage', component: Home },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/reviews', name: 'reviews', component: () => import('../views/ProductReviewsView.vue') },
    { path: '/registerUser', name: 'registerUser', component: () => import('../views/RegisterUserView.vue') },
    { path: '/registerProduct', name: 'registerProduct', meta: { requireAuth: true, restrictedTo: ['shop'] }, component: () => import('../views/RegisterProductView.vue') },
    { path: '/brand', name: 'brands', meta: { requireAuth: true, restrictedTo: ['shop'] }, component: () => import('../views/BrandView.vue') },
    { path: '/updateProducts/:id', name: 'updateProducts', meta: { requireAuth: true }, component: () => import('../views/UpdateProductsView.vue') },
    { path: '/product/:id', name: 'productDetail', meta: { requireAuth: true }, component: () => import('../views/ProductDetailsView.vue') },
    { path: '/myProfile', name: 'myProfile', meta: { requireAuth: true }, component: () => import('../views/MyProfileView.vue') },
    { path: '/unauthorized', name: 'unauthorized', meta: { requireAuth: true }, component: () => import('../views/UnauthorizedView.vue') },
  ],
});


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth);
  const allowedUserTypes = to.meta.restrictedTo;

  if (requiresAuth) {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      if (allowedUserTypes) {
        if (userData.value && allowedUserTypes.includes(userData.value.userType)) {
          next();
        } else {
          next('/unauthorized')
        }
      } else {
        next();
      }
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


export default router;
