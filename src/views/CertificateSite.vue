<template>
  <background />
  <social-button />
  <connect-wallet />
  <no-wallet v-if="user === null" />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ConnectWallet from '../components/Buttons/ConnectWallet.vue';
import Background from '../components/General/Background.vue';
import NoWallet from '../components/General/NoWallet.vue';
import SocialButton from '../components/Buttons/SocialButtons.vue';
// @ is an alias to /src

export default {
  name: 'ConnectWalletSite',
  components: {
    ConnectWallet,
    Background,
    NoWallet,
    SocialButton,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);
    console.log(store.state.User.user);
    console.log(user);
    return { user };
  },
};
</script>
