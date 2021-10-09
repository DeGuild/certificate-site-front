import { createRouter, createWebHistory } from 'vue-router';
import Tester from '../views/_Sandbox.vue';
import CertificateSite from '../views/CertificateSite.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CertificateSite,
  },
  {
    path: '/testing',
    name: 'testing',
    component: Tester,
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
