<template>
  <div class="dialog">
    <div class="dialog-text" v-bind:class="{ smaller: state.dialogStyle }">
      {{ state.name }}
    </div>
  </div>
  <button class="btn" v-on:click="this.$router.push('/backhome')">
    back to home
  </button>
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
} = require('../../../../DeGuild-MG-CS-Token-contracts/artifacts/contracts/SkillCertificates/ISkillCertificate.sol/ISkillCertificate.json');

export default defineComponent({
  name: 'Dialog',
  setup() {
    const store = useStore();
    const route = useRoute();

    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

    async function getName(address) {
      const certificateManager = new web3.eth.Contract(abi, address);
      const caller = await certificateManager.methods.name().call();
      return caller;
    }
    const state = reactive({
      name: null,
      dialog: computed(() => store.state.User.dialog),
      dialogStyle: computed(() => store.state.User.dialog.length > 45),
    });
    onBeforeMount(async () => {
      state.name = await getName(route.params.certificate);
    });

    return {
      state,
    };
  },
});
</script>
<style lang="scss" scoped>
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
  /* Share your certificate and show your skill! */
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
  /* Small button */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: 10vw;
  height: 3vw;
  left: 45.052vw;
  top: 43.458vw;

  /* standart theme/error */
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

  /* shades/white */
  color: #ffffff;

  /* Inside Auto Layout */
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
