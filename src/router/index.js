import { createRouter, createWebHistory } from 'vue-router';

const Web3 = require('web3');

const {
  abi,
} = require('../../../DeGuild-MG-CS-Token-contracts/artifacts/contracts/SkillCertificates/ISkillCertificate.sol/ISkillCertificate.json');

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

async function hasCertificate(address, user) {
  try {
    const certificateManager = new web3.eth.Contract(abi, address);
    // console.log(store.state.User.user);

    const caller = await certificateManager.methods.verify(user).call();
    return caller;
  } catch (error) {
    console.log(error);
    return false;
  }
}
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
    path: '/unverified',
    name: 'unverified',
    component: () => import('@/views/Unverified.vue'),
  },
  {
    path: '/sharing/:address/:certificate',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SharingSite.vue'),
    beforeEnter: async (to, from, next) => {
      // ...
      const { address } = to.params;
      const { certificate } = to.params;
      const hasCertificateResult = await hasCertificate(certificate, address);
      if (hasCertificateResult) {
        next();
        console.log('verified');
      }
      next('/unverified');
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
