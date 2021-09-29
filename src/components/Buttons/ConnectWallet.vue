<template>
  <div id="app">
    <button class="btn" @click="finishTask" v-html="state.primary"></button>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'ConnectWallet',
  setup() {
    const state = reactive({
      primary: 'CONNECT WALLET',
      btn1style: {},
    });

    function finishTask() {
      const duration = 2500;
      state.primary = "<i class='fas fa-spinner fa-spin'></i>";
      setTimeout(() => {
        state.primary = '';
      }, duration);
    }
    return {
      state,
      finishTask,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/Buttons/_connectWallet.scss';
</style>
