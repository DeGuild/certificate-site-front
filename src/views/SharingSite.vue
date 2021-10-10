<template>
  <Dialog />
  <sharing-frame></sharing-frame>
</template>

<script>
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';
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
    const siteData = reactive({
      title: 'Certificate Showcase',
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
