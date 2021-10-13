<template>
  <div class="image selected">
    <img class="image selected display" :src="state.imageSelected" />
  </div>
  <div class="image info">
    <div class="text">Certificate Address:</div>
    <div class="text address">
      {{
        this.$route.params.certificate ? this.$route.params.certificate : '-'
      }}
    </div>
    <div class="text">Owner Address:</div>
    <div class="text address">
      {{ this.$route.params.address ? this.$route.params.address : '-' }}
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SharingFrame',
  setup() {
    const route = useRoute();

    /**
     * Returns the url of the certificate address
     *
     * @param {address} address The certificate's address
     * @return {string} certificate's url.
     */
    async function getImageUrl(address) {
      const imageUrl = await fetch(
        `https://us-central1-deguild-2021.cloudfunctions.net/app/readCertificate/${address}`,
        { mode: 'cors' },
      );

      const dataUrl = await imageUrl.json();
      return dataUrl.imageUrl;
    }

    const state = reactive({
      imageSelected:
        '',
    });

    onBeforeMount(async () => {
      state.imageSelected = await getImageUrl(route.params.certificate);
    });

    return {
      state,
    };
  },
});
</script>

<style scoped lang="scss">
.image {
  width: 7.5vw;
  height: 7.5vw;
  position: absolute;
  background: #c4c4c4;

  &.display {
    position: static;
  }

  &.click {
    cursor: pointer;
    &:hover {
      opacity: 0.89;
    }
  }

  &.selected {
    width: 19.583vw;
    height: 19.583vw;
    left: 40.208vw;
    top: 15.5vw;
  }

  &.info {
    position: absolute;
    width: 19.583vw;
    height: 6vw;
    left: 40.208vw;
    top: 35.5vw;
    background: rgba(196, 196, 196, 0.42);
  }
}
.text {
  top: 5.5vw;

  font-family: Secular One;
  font-style: normal;
  font-weight: normal;
  font-size: 1.1vw;
  line-height: 0.1vw;
  text-align: center;
  letter-spacing: 0.00892857em;
  text-transform: uppercase;
  padding-top: 1.2vw;
  color: #ffffff;

  &.address {
    font-size: 0.7vw;
    cursor: pointer;
  }
}
</style>
