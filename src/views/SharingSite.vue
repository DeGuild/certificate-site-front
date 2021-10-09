<template>
  <Dialog />
  <sharing-frame></sharing-frame>
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
    console.log(store.state.User.user);
    console.log(user);
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
