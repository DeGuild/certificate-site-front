import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Tester from '../views/_Sandbox.vue';
import ConnectWallet from '../views/CertificateSite.vue';
import Gallery from '../views/Gallery.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ConnectWallet,
  },
  {
    path: '/testing',
    name: 'testing',
    component: Tester,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/connectWallet',
    name: 'connect',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
