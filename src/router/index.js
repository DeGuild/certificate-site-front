import { createRouter, createWebHistory } from 'vue-router';

const Web3 = require('web3');
require('dotenv').config();

const {
  abi,
} = require('../../../DeGuild-MG-CS-Token-contracts/artifacts/contracts/SkillCertificates/V2/ISkillCertificate+.sol/ISkillCertificatePlus.json');

async function hasCertificate(certificate, address, tokenType) {
  // Use dotenv
  const web3 = new Web3(process.env.VUE_APP_ALCHEMY_API);
  const certificateManager = new web3.eth.Contract(abi, certificate);
  const caller = await certificateManager.methods.verify(address, tokenType).call();
  return caller;
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/CertificateSite.vue'),
  },
  {
    path: '/metamask',
    beforeEnter() {
      window.location.href = 'https://metamask.io/download';
    },
  },
  {
    path: '/unverified',
    name: 'unverified',
    component: () => import('@/views/Unverified.vue'),
  },
  {
    path: '/no-provider',
    name: 'noProvider',
    component: () => import('@/views/NoProvider.vue'),
  },
  {
    path: '/sharing/:certificate/:address/:tokenType',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SharingSite.vue'),
    beforeEnter: async (to, from, next) => {
      const { address } = to.params;
      const { tokenType } = to.params;
      const { certificate } = to.params;
      const hasCertificateResult = await hasCertificate(certificate, address, tokenType);
      if (hasCertificateResult) {
        next();
      }
      // ...

      next('/unverified');
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
