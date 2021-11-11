<template>
  <div class="image selected" v-show="state.imageSelected">
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
    <div class="text">Token Type Id:</div>
    <div class="text address">
      {{ this.$route.params.tokenType ? this.$route.params.tokenType : '-' }}
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
    async function getImageUrl(address, tokenType) {
      const imageUrl = await fetch(
        `https://us-central1-deguild-2021.cloudfunctions.net/app/readCertificate/${address}/${tokenType}`,
        { mode: 'cors' },
      );

      const dataUrl = await imageUrl.json();
      // console.log(dataUrl.url);
      return dataUrl.url;
    }

    const state = reactive({
      imageSelected:
        '',
    });

    onBeforeMount(async () => {
      state.imageSelected = await getImageUrl(route.params.certificate, route.params.tokenType);
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
  background: url('../../assets/Spinner-1s-200px.svg') no-repeat center;

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
    height: 8.5vw;
    left: 40.208vw;
    top: 35.5vw;
    background: rgba(19, 16, 16, 0.9);
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
