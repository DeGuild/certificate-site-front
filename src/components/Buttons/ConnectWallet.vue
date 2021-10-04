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
