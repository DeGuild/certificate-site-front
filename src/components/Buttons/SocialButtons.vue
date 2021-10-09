<template>
  <div v-if="$store.state.User.certificateSelected">
    <ShareNetwork network="facebook" :url="sharingUrl" hashtags="DeGuild,Skill">
      <div class="facebook"></div>
    </ShareNetwork>
    <ShareNetwork
      network="twitter"
      :url="sharingUrl"
      title="Best site to share your hard-earned certificates from Dapp"
      twitter-user="DeGuild"
      hashtags="DeGuild,Skill"
    >
      <div class="twitter"></div>
    </ShareNetwork>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';

export default {
  name: 'SocialButtons',
  setup() {
    const store = useStore();
    const state = reactive({
      primary: 'SOMETHING WENT WRONG',
      btn1style: {},
      network: '',
      sharingUrl: computed(
        () => `${window.location.origin}/${store.state.User.user}/${
          store.state.User.certificateSelected
            ? store.state.User.certificateSelected[1]
            : null
        }`,
      ),
    });

    return {
      state,
    };
  },
};
</script>

<style scoped lang="scss">
.twitter {
  position: absolute;
  width: 6.979vw;
  height: 6.979vw;
  left: 71.927vw;
  top: 45.302vw;

  background: url('../../assets/twitter.png');
  background-size: cover;
}

.facebook {
  position: absolute;
  width: 6.979vw;
  height: 6.979vw;
  left: 80.651vw;
  top: 45.302vw;

  background: url('../../assets/facebook.png');
  background-size: cover;
}
</style>
