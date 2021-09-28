<template>
    <connect-wallet/>
</template>

<script>
// @ is an alias to /src
import ConnectWallet from '@/components/Buttons/ConnectWallet.vue';

export default {
  name: 'Buttons',
  components: {
    ConnectWallet,
  },
};
</script>
