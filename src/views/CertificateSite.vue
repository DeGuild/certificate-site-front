<template>
  <connect-wallet />
  <div v-if="user !== null">
      <Dialog />

    <social-button />
    <certificate-board />
  </div>
  <no-wallet v-if="user === null" />

</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';
import ConnectWallet from '../components/Buttons/ConnectWallet.vue';
import Dialog from '../components/General/Dialog.vue';
import NoWallet from '../components/General/NoWallet.vue';
import SocialButton from '../components/Buttons/SocialButtons.vue';
import CertificateBoard from '../components/Display/CertificateBoard.vue';
// @ is an alias to /src

export default {
  name: 'ConnectWalletSite',
  components: {
    ConnectWallet,
    Dialog,
    NoWallet,
    SocialButton,
    CertificateBoard,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);
    const siteData = reactive({
      title: 'Certificate Sharing Site by DeGuild',
      description: 'Best site to share your hard-earned certificates from Dapp!',
    });
    useHead({
      title: computed(() => siteData.title),
      meta: [
        {
          name: 'description',
          content: computed(() => siteData.description),
        },
      ],
    });

    return { user };
  },
};
</script>
