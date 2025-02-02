import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePageView.vue';
import { isAuthenticated, hasAccess } from "@/services/AuthService";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'homepage', component: Home },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/reviews', name: 'reviews', component: () => import('../views/ProductReviewsView.vue') },
    { path: '/registerUser', name: 'registerUser', component: () => import('../views/RegisterUserView.vue') },
    { 
      path: '/registerProduct', 
      name: 'registerProduct', 
      meta: { requireAuth: true, restrictedTo: ['shop'] }, 
      component: () => import('../views/RegisterProductView.vue') 
    },
    { 
      path: '/brand', 
      name: 'brands', 
      meta: { requireAuth: true, restrictedTo: ['shop'] }, 
      component: () => import('../views/BrandView.vue') 
    },
    { 
      path: '/updateProducts/:id', 
      name: 'updateProducts', 
      meta: { requireAuth: true, restrictedTo: ['shop'] }, 
      component: () => import('../views/UpdateProductsView.vue') 
    },
    { 
      path: '/product/:id', 
      name: 'productDetail', 
      meta: { requireAuth: true }, 
      component: () => import('../views/ProductDetailsView.vue') 
    },
    { 
      path: '/myProfile', 
      name: 'myProfile', 
      meta: { requireAuth: true }, 
      component: () => import('../views/MyProfileView.vue') 
    },
    { 
      path: '/unauthorized', 
      name: 'unauthorized', 
      component: () => import('../views/UnauthorizedView.vue') 
    },
  ],
});

router.beforeEach(async (to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requireAuth);

  const restrictedTo = to.matched.some(record => record.meta.restrictedTo)
    ? to.matched.find(record => record.meta.restrictedTo)?.meta.restrictedTo
    : null;


  if (!requiresAuth) {
    next();
    return;
  }


  const authenticated = await isAuthenticated();
  if (!authenticated) {
    next('/login');
    return;
  }

 
  if (restrictedTo) {
    const hasPermission = hasAccess(restrictedTo);
    if (!hasPermission) {
      next('/unauthorized');
      return;
    }
  }


  next();
});

export default router;