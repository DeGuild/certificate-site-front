<template>
  <ShareNetwork
    network="facebook"
    url="https://blockchain-land.firebaseapp.com/login"
    :title="this.primary"
    description="fuck u"
    hashtags="NewSkillBetterMe"
  >
    <div class="facebook"></div>
  </ShareNetwork>
  <ShareNetwork
    network="twitter"
    url="https://blockchain-land.firebaseapp.com/login"
    :title="this.primary"
    quote="The hot reload is so fast it\'s near instant. - Evan You"
    hashtags="NewSkillBetterMe"
    twitterUser="youyuxi"
  >
    <!-- <i class="fab fah fa-lg fa-twitter"></i>
    <span>Share on Twitter</span> -->
    <div class="twitter"></div>
  </ShareNetwork>
</template>

<script>
export default {
  name: 'Buttons',
  data() {
    return {
      primary: 'Button 1',
      success: 'Success',
      btn1style: {},
      btn4style: {},
      danger: 'Button 3',
      info: '<i class="fas fa-info"></i> Info',
      colors: {
        success: '#1CA650',
      },
    };
  },
  methods: {
    finishTask() {
      this.primary = "<i class='fas fa-spinner fa-spin'></i>";
      setTimeout(() => {
        this.primary = 'Done!';
      }, 2500);
    },

    progressTask() {
      const duration = 2500;
      this.btn1style = {
        boxShadow: 'inset 120px 0px 0px 0px #1CA650',
        transitionDuration: `${duration}ms`,
      };
      setTimeout(() => {
        this.success = 'Finished';
      }, duration);
    },

    failTask() {
      this.danger = "<i class='fas fa-spinner fa-spin'></i>";
      setTimeout(() => {
        this.danger = "<i class='far fa-frown'></i> Failed!";
      }, 2500);
    },

    infoTask() {
      const duration = 1000;
      this.btn4style = {
        boxShadow: 'inset 0px 0px 300px 120px rgba(0,0,0,1)',
        transitionDuration: `${duration}ms`,
      };
    },
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
