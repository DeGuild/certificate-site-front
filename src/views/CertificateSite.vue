<template>
  <Dialog />
  <connect-wallet />
  <div v-if="user !== null">
    <social-button />
    <certificate-board />
  </div>
  <no-wallet v-if="user === null" />
  <footer></footer>
  <teleport to="head">
    <link
      rel="icon"
      href="https://certificate-manager.web.app/certificate-icon.png"
    />
    <title>Certificate Sharing Site by DeGuild</title>

    <!-- Facebook, Whatsapp -->
    <meta property="og:site_name" content="Certificate Sharing Site" />
    <meta property="og:title" content="Certificate Sharing Site by DeGuild" />
    <meta
      property="og:description"
      content="Best site to share your hard-earned certificates from Dapp"
    />
    <meta property="og:image" content="certificate-icon.png" />
    <meta property="og:url" content="https://certificate-manager.web.app/" />

    <!-- Twitter -->
    <meta name="twitter:title" content="Certificate Sharing Site" />
    <meta
      name="twitter:description"
      content="Certificate Sharing Site by DeGuild"
    />
    <meta name="twitter:image" content="certificate-icon.png" />
    <meta
      property="twitter:url"
      content="https://certificate-manager.web.app/"
    />
    <meta name="twitter:card" content="summary" />
  </teleport>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
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
