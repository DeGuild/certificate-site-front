<template>
  <div id="app">
    <button class="btn" @click="ethEnabled" v-html="state.primary"></button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive } from 'vue';

const Web3 = require('web3');

export default {
  name: 'ConnectWallet',
  setup() {
    const store = useStore();
    const state = reactive({
      primary: 'CONNECT WALLET',
      btn1style: {},
    });

    const ethEnabled = async () => {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
      web3.eth.net.getNetworkType().then(console.log);
      state.primary = "<i class='fas fa-spinner fa-spin'></i>";
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.send('eth_requestAccounts');
          window.web3 = new Web3(window.ethereum);
          console.log(accounts.result[0]);
          const accountLength = accounts.result[0].length;
          const connectedAddress = `${accounts.result[0].substring(
            0,
            5,
          )}...${accounts.result[0].substring(
            accountLength - 4,
            accountLength,
          )}`;
          state.primary = connectedAddress;
          store.dispatch(
            'User/setUser',
            `${accounts.result[0].substring(
              0,
              5,
            )}...${accounts.result[0].substring(
              accountLength - 4,
              accountLength,
            )}`,
          );
          return true;
        } catch (error) {
          console.error(error);
          state.primary = 'CONNECT WALLET';
        }
      }
      return false;
    };
    return {
      state,
      ethEnabled,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/Buttons/_connectWallet.scss';
</style>
