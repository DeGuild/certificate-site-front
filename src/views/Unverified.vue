<template>
  <no-certificate></no-certificate>
  <sad></sad>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';

import Sad from '../components/General/Sad.vue';
import NoCertificate from '../components/Display/NoCertificate.vue';
// @ is an alias to /src

export default {
  name: 'ConnectWalletSite',
  components: {
    Sad,
    NoCertificate,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);
    const siteData = reactive({
      title: 'Unverified',
      description: 'This certificate is not verified for this owner.',
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
</style>
