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
    async function getImageUrl(address, tokenType) {
      const imageUrl = await fetch(
        `https://us-central1-deguild-2021.cloudfunctions.net/app/readCertificate/${address}/${tokenType}`,
        { mode: 'cors' },
      );

      const dataUrl = await imageUrl.json();
      // console.log(dataUrl.url);
      return dataUrl.url;
    }
    const siteData = reactive({
      title: 'Certificate Showcase',
      description:
        'Best site to share your hard-earned certificates from Dapp!',
      imageUrl: getImageUrl(route.params.certificate, route.params.tokenType),
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
  background-image: url('../assets/bg.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #464646;
}
</style>
