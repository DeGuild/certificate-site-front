<template>
  <background />
</template>

<script>
// import { useStore } from 'vuex';
// import { computed } from 'vue';
import Background from '../components/General/Background.vue';
// @ is an alias to /src

export default {
  name: 'ConnectWalletSite',
  components: {
    Background,
  },
//   setup() {
//     // const store = useStore();
//     // const user = computed(() => store.state.User.user);
//     // console.log(store.state.User.user);
//     // console.log(user);
//     return { user };
//   },
};
</script>
