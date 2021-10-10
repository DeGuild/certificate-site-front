<template>
  <Dialog />
  <connect-wallet />
  <div v-if="user !== null">
    <social-button />
    <certificate-board />
  </div>
  <no-wallet v-if="user === null" />
  <footer></footer>

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
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: 'description',
          content: computed(() => siteData.description),
        },
      ],
    });

    // console.log(store.state.User.user);
    // console.log(user);
    return { user };
  },
};
</script>

<style>
body {
  background-image: url('../assets/cert_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #464646;
}
footer {
  /* background-color: #202020; */
  opacity: 0%;
  color: white;
  position: absolute;
  width: 100%;
  height: 10%;
  bottom: -5vw;
}
</style>
