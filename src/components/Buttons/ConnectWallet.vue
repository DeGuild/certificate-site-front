<template>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
    crossorigin="anonymous"
  />
  <div id="app">
    <button
      class="btn"
      @click="finishTask(primary)"
      v-html="state.primary"
    ></button>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'Buttons',
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

    function progressTask() {
      const duration = 2500;
      state.btn1style = {
        boxShadow: 'inset 120px 0px 0px 0px #1CA650',
        transitionDuration: `${duration}ms`,
      };
      setTimeout(() => {
        state.success = 'Finished';
      }, duration);
    }

    return {
      state,
      finishTask,
      progressTask,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/Buttons/_connectWallet.scss';
</style>
