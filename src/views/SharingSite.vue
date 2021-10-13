<template>
  <Dialog />
  <sharing-frame></sharing-frame>
</template>

<script>
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';

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
    const route = useRoute();
    async function getImageUrl(address) {
      const imageUrl = await fetch(
        `https://us-central1-deguild-2021.cloudfunctions.net/app/readCertificate/${address}`,
        { mode: 'cors' },
      );

      const dataUrl = await imageUrl.json();
      return dataUrl.imageUrl;
    }
    const siteData = reactive({
      title: 'Certificate Showcase',
      description:
        'Best site to share your hard-earned certificates from Dapp!',
      imageUrl: getImageUrl(route.params.certificate),
    });

    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: 'description',
          content: computed(() => siteData.description),
        },
        {
          name: 'og:description',
          content: computed(() => siteData.description),
        },
        {
          name: 'og:image',
          content: computed(() => siteData.imageUrl),
        },
        {
          name: 'twitter:image',
          content: computed(() => siteData.imageUrl),
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
