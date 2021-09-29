<template>
  <background />
  <connect-wallet />
  <no-wallet/>
</template>

<script>
import ConnectWallet from '../components/Buttons/ConnectWallet.vue';
import Background from '../components/General/Background.vue';
import NoWallet from '../components/General/NoWallet.vue';
// @ is an alias to /src

export default {
  name: 'ConnectWalletSite',
  components: {
    ConnectWallet,
    Background,
    NoWallet,
  },
};
</script>
