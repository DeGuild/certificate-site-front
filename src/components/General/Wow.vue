<template>
  <div class="wojak"></div>
  <div class="dialog">
    <div class="dialog-text" v-bind:class="{ smaller: state.dialogStyle }">
      {{ state.dialog }}
    </div>
  </div>
  <button class="btn" v-on:click="this.$router.push('/')">back to home</button>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import {
  defineComponent, reactive, onBeforeMount, computed,
} from 'vue';

const Web3 = require('web3');

const {
  abi,
} = require('../../../../DeGuild-MG-CS-Token-contracts/artifacts/contracts/SkillCertificates/V2/ISkillCertificate+.sol/ISkillCertificatePlus.json');

export default defineComponent({
  name: 'Wow',
  setup() {
    const store = useStore();
    const route = useRoute();

    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

    async function getName(address) {
      const certificateManager = new web3.eth.Contract(abi, address);
      const caller = await certificateManager.methods.name().call();
      return caller;
    }
    /**
     * Returns the url of the certificate address
     *
     * @param {address} address The certificate's address
     * @return {string} certificate's url.
     */
    async function getTitle(address, tokenType) {
      const imageUrl = await fetch(
        `https://us-central1-deguild-2021.cloudfunctions.net/app/readCertificate/${address}/${tokenType}`,
        { mode: 'cors' },
      );

      const dataUrl = await imageUrl.json();
      // console.log(dataUrl.url);
      return dataUrl.title;
    }
    const state = reactive({
      name: null,
      title: null,
      dialog: computed(() => store.state.User.dialog),
      dialogStyle: computed(() => store.state.User.dialog.length > 45),
    });
    onBeforeMount(async () => {
      state.name = await getName(route.params.certificate);
      state.title = await getTitle(
        route.params.certificate,
        route.params.tokenType,
      );
      store.dispatch('User/setDialog', `${state.title} by ${state.name}`);
    });

    return {
      state,
    };
  },
});
</script>
<style lang="scss" scoped>
.wojak {
  width: 100vw;
  height: 100vh;
  bottom: 0vh;
  left: 0vw;
  position: absolute;
  background: #c4c4c4;
  background: url('../../assets/wojaks.png') no-repeat center;
}
.dialog {
  position: absolute;
  width: 67.552vw;
  height: 13.1vw;
  left: 16.198vw;
  top: 2vw;

  background: url('../../assets/dialogue.png');
  background-size: cover;
}
.dialog-text {
  position: absolute;
  width: 60vw;
  height: 3vw;
  left: 5vw;
  top: 5.5vw;
  font-family: Secular One;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5vw;
  line-height: 3vw;
  color: #ffffff;
  background: '';
  background-size: cover;
  overflow: hidden;
  text-overflow: ellipsis;
  &.smaller {
    font-size: 1.55vw;
  }
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: 10vw;
  height: 3vw;
  left: 45.052vw;
  top: 45vw;

  background: #db2c00;
  border-radius: 4px;

  font-family: Secular One;
  font-style: normal;
  font-weight: normal;
  font-size: 1vw;
  display: flex;
  align-items: center;
  letter-spacing: 0.00892857em;
  text-transform: uppercase;

  color: #ffffff;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;

  &:hover {
    background: #86250d;
  }
  &.connected {
    &:hover {
      background: #ff5252;
    }
    cursor: cursor;
  }
}
</style>
