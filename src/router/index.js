import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/CertificateSite.vue'),
  },
  {
    path: '/testing',
    name: 'testing',
    component: () => import('../views/_Sandbox.vue'),
  },
  {
    path: '/backhome',
    beforeEnter() {
      window.location.href = 'http://localhost:8080/';
    },
  },
  {
    path: '/sharing/:address/:certificate',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SharingSite.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
