import { createRouter, createWebHistory } from 'vue-router';

const Web3 = require('web3');

const {
  abi,
} = require('../../../DeGuild-MG-CS-Token-contracts/artifacts/contracts/SkillCertificates/V2/ISkillCertificate+.sol/ISkillCertificatePlus.json');

async function hasCertificate(address, user) {
  const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

  try {
    const certificateManager = new web3.eth.Contract(abi, address);

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
    path: '/backhome',
    beforeEnter() {
      window.location.href = window.location.origin;
    },
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
      try {
        //  Rinkeby chain id
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }],
        });
        const { address } = to.params;
        const { certificate } = to.params;
        const hasCertificateResult = await hasCertificate(certificate, address);
        if (hasCertificateResult) {
          next();
        }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        next('/no-provider');
        // handle other "switch" errors
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
