<template>
  <div id="app">
    <button class="btn" @click="ethEnabled" v-html="state.primary"></button>
  </div>
</template>

<script>
/* eslint-disable no-await-in-loop */

import { useStore } from 'vuex';
import { reactive, onBeforeMount } from 'vue';

const Web3 = require('web3');

const {
  abi,
} = require('../../../../DeGuild-MG-CS-Token-contracts/artifacts/contracts/SkillCertificates/ISkillCertificate.sol/ISkillCertificate.json');

export default {
  name: 'ConnectWallet',
  setup() {
    const store = useStore();
    const state = reactive({
      primary: 'SOMETHING WENT WRONG',
      btn1style: {},
      network: '',
      certificateSet: null,
    });
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

    async function fetchAllCertificates(nextToFetch) {
      let response = null;
      if (nextToFetch) {
        // console.log(`https://us-central1-deguild-2021.cloudfunctions.net/app/allCertificates/${nextToFetch}/next`);
        response = await fetch(
          `https://us-central1-deguild-2021.cloudfunctions.net/app/allCertificates/${nextToFetch}/next`,
          { mode: 'cors' },
        );
      } else {
        response = await fetch(
          'https://us-central1-deguild-2021.cloudfunctions.net/app/allCertificatesOnce',
          { mode: 'cors' },
        );
      }

      // waits until the request completes...
      state.certificateSet = await response.json();
      // console.log(state.certificateSet.result[state.certificateSet.result.length - 1]);
      store.dispatch(
        'User/setCertificateToFetch',
        state.certificateSet.result[state.certificateSet.result.length - 1],
      );
    }
    async function getName(address) {
      const certificateManager = new web3.eth.Contract(abi, address);
      const caller = await certificateManager.methods.name().call();
      return caller;
    }

    async function hasCertificate(address) {
      const certificateManager = new web3.eth.Contract(abi, address);
      // console.log(store.state.User.user);

      const caller = await certificateManager.methods
        .verify(store.state.User.user)
        .call();
      return caller;
    }

    // console.log(certificateManager.methods);

    async function verifyNetwork() {
      state.network = await web3.eth.net.getNetworkType();

      if (state.network !== 'rinkeby') {
        // console.log('Please change to rinkeby testnet');
        state.primary = 'CHANGE TO RINKEBY';
        return false;
      }
      return true;
    }
    async function connectToRinkeby() {
      try {
        //  Rinkeby chain id
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          console.error(switchError);
        }
        // handle other "switch" errors
      }
    }

    function disconnected() {
      state.primary = 'CONNECT WALLET';
      store.dispatch('User/setUser', null);
    }

    async function userCertificateChecker(address) {
      const hasCertificateResult = await hasCertificate(address);
      const certificateArray = store.state.User.certificates
        ? store.state.User.certificates
        : [];
      if (hasCertificateResult) {
        const name = await getName(address);
        const imageUrl = await fetch(
          `https://us-central1-deguild-2021.cloudfunctions.net/app/readCertificate/${address}`,
          { mode: 'cors' },
        );

        const dataUrl = await imageUrl.json();
        certificateArray.push([name, dataUrl, address]);
        // [name, imageUrl, element]
      }
      store.dispatch('User/setCertificates', certificateArray);
    }

    async function connectWallet() {
        
      store.dispatch('User/reset');

      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.send('eth_requestAccounts');
          // console.log(accounts.result[0]);
          const accountLength = accounts.result[0].length;
          const connectedAddress = `${accounts.result[0].substring(
            0,
            5,
          )}...${accounts.result[0].substring(
            accountLength - 4,
            accountLength,
          )}`;
          state.primary = connectedAddress;
          store.dispatch('User/setUser', accounts.result[0]);

          while (
            state.certificateSet.result.length > 0
            && store.state.User.certificates
              ? store.state.User.certificates.length === 8
              : true
          ) {
            // console.log("Let's fetch them with web3");
            state.certificateSet.result.forEach(async (element) => {
              await userCertificateChecker(element);
            });
            await fetchAllCertificates(store.state.User.certificateToFetch);
          }

          return true;
        } catch (error) {
          // console.error(error);
          state.primary = 'CONNECT WALLET';
        }
      }
      return false;
    }

    function handleChainChanged() {
      // We recommend reloading the page, unless you must do otherwise
      window.location.reload();
    }

    // For now, 'eth_accounts' will continue to always return an array
    function handleAccountsChanged(accounts) {
      // console.log(accounts[0]);
      // console.log(store.state.User.user);
      const current = accounts[0];
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        disconnected();
      } else if (current !== store.state.User.user) {
        connectWallet();
        // Do any other work!
      }
    }

    onBeforeMount(async () => {
      if (!store.state.User.user && window.ethereum) {
        state.primary = 'CONNECT WALLET';
      }
      await verifyNetwork();
      await fetchAllCertificates();

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    });

    async function ethEnabled() {
      state.primary = "<i class='fas fa-spinner fa-spin'></i>";
      if (state.network !== 'rinkeby') {
        await connectToRinkeby();
        return false;
      }
      await connectWallet();
      // console.log(data);
      // console.log('we', caller);
      return true;
    }

    return {
      state,
      ethEnabled,
    };
  },
};
</script>

<style scoped lang="scss">
.btn {
  /* Small button */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: 10vw;
  height: 3vw;
  left: 88vw;
  top: 20px;

  /* standart theme/error */
  background: #ff5252;
  border-radius: 4px;

  font-family: Secular One;
  font-style: normal;
  font-weight: normal;
  font-size: 0.7vw;
  display: flex;
  align-items: center;
  letter-spacing: 0.00892857em;
  text-transform: uppercase;

  /* shades/white */
  color: #ffffff;

  /* Inside Auto Layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  cursor: pointer;

  &:hover {
    background: #cc3b3b;
  }
}
</style>
