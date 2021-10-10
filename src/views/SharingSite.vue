<template>
  <Dialog />
  <sharing-frame></sharing-frame>
  <teleport to="head">
    <link
      rel="icon"
      href="https://certificate-manager.web.app/certificate-icon.png"
    />
    <title>Certificate Showcase</title>

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
import Dialog from '../components/General/Wow.vue';
import SharingFrame from '../components/Display/SharingFrame.vue';
// @ is an alias to /src

export default {
  name: 'ConnectWalletSite',
  components: {
    Dialog,
    SharingFrame,
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
  background-image: url('../assets/wojaks.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #464646;
}
</style>
