<template>
  <div v-if="!user">
    <button class="btn" @click="ethEnabled" v-html="state.primary"></button>
  </div>
  <div v-if="user">
    <div class="btn connected" v-html="state.primary"></div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { reactive, onBeforeMount, computed } from 'vue';

const Web3 = require('web3');

export default {
  name: 'ConnectWallet',
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.state.User.user);

    function shortenedAddress(address) {
      if (!address) {
        return "<i class='fas fa-spinner fa-spin'></i>";
      }
      const accountLength = address.length;
      const connectedAddress = `${address.substring(
        0,
        5,
      )}...${address.substring(accountLength - 4, accountLength)}`;
      return connectedAddress;
    }

    const state = reactive({
      primary: computed(() => (store.state.User.fetching || store.state.User.user
        ? shortenedAddress(store.state.User.user)
        : 'CONNECT WALLET')),
      network: '',
      certificateSet: null,
    });
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

    /**
     * Returns all certificates in the DeGuild system.
     *
     * @param {address} nextToFetch The address we lastly fetched
     * @return {address[]} all certificates in the DeGuild system.
     */

    /**
     * Returns verification of the Rinkeby Network
     *
     * @param {address} address The address of any contract using the interface given
     * @return {bool} status of verification.
     */
    async function verifyNetwork() {
      state.network = await web3.eth.net.getNetworkType();

      if (state.network !== 'rinkeby') {
        state.primary = 'CHANGE TO RINKEBY';
        return false;
      }
      return true;
    }

    /**
     * Connect to the Rinkeby Network
     */
    async function connectToRinkeby() {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
    }

    /**
     * Disconnect user from the dapp
     */
    function disconnected() {
      state.primary = 'CONNECT WALLET';
      store.dispatch('User/setUser', null);
    }

    /**
     * Connect user to the dapp
     * @return {bool} status of connection.
     */
    async function connectWallet() {
      store.dispatch('User/reset');

      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          store.dispatch('User/setUser', accounts[0]);

          return true;
        } catch (error) {
          store.dispatch('User/setUser', null);
        }
      } else {
        router.push('/no-provider');
      }
      return false;
    }

    /**
     * Handle what we do when the user changed the network
     */
    function handleChainChanged() {
      // We recommend reloading the page, unless you must do otherwise
      window.location.reload();
    }

    /**
     * Returns the information of the certificate of this user
     * @dev For now, 'eth_accounts' will continue to always return an array
     *
     * @param {address} address The addresses of connect wallets
     */
    function handleAccountsChanged(accounts) {
      const current = accounts[0];
      if (accounts.length === 0) {
        disconnected();
      } else if (current !== store.state.User.user) {
        connectWallet();
      }
    }

    /**
     * Connect to the Ethereum network
     */
    async function ethEnabled() {
      state.primary = "<i class='fas fa-spinner fa-spin'></i>";
      if (state.network !== 'rinkeby') {
        await connectToRinkeby();
        return false;
      }
      await connectWallet();
      return true;
    }

    onBeforeMount(async () => {
      if (!store.state.User.user && window.ethereum) {
        state.primary = 'CONNECT WALLET';
      }
      await verifyNetwork();
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    });

    return {
      state,
      user,
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

  &:hover {
    background: #cc3b3b;
  }
  &.connected {
    &:hover {
      background: #ff5252;
    }
    cursor: cursor;
  }
}
</style>
