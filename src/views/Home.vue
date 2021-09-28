<template>
  <div><connect-wallet /> <hello-world /></div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import ConnectWallet from '../components/ConnectWallet.vue';

export default {
  name: 'Home',

  components: {
    HelloWorld,
    ConnectWallet,
  },
};
</script>
