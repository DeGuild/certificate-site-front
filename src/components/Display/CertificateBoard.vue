<template>
  <div class="position-board">
    <div class="background"></div>
    <div v-for="imageIndex in 8" :key="imageIndex">
      <div
        class="background frame"
        :style="state.stylesFrame[imageIndex - 1]"
      ></div>
      <div v-if="state.allCerts">
        <div
          v-if="imageIndex - 1 + state.pageIdx * 8 < state.allCerts.length"
          v-show="!state.loading"
        >
          <div class="image" :style="state.styles[imageIndex - 1]">
            <img
              class="image display"
              :style="state.styles[imageIndex - 1]"
              :src="state.allCerts[imageIndex - 1 + state.pageIdx * 8].url"
            />
          </div>
          <div
            class="background frame click"
            :style="state.stylesFrame[imageIndex - 1]"
            v-on:click="choosing(imageIndex - 1 + state.pageIdx * 8)"
          ></div>
        </div>
      </div>
      <div v-if="state.loading">
        <div class="image no-bg" :style="state.styles[imageIndex - 1]">
          <img
            class="image display no-bg"
            :style="state.styles[imageIndex - 1]"
            src="@/assets/Spinner-1s-200px.svg"
          />
        </div>
        <div
          class="background frame"
          :style="state.stylesFrame[imageIndex - 1]"
        ></div>
      </div>
    </div>

    <button
      class="navButton previous"
      v-on:click="navigate(state.pageIdx - 1)"
      v-if="state.pageIdx > 0"
    >
      &#60;
    </button>
    <button
      class="navButton"
      v-on:click="navigate(state.pageIdx + 1)"
      v-if="state.hasNext"
    >
      &#62;
    </button>
    <div class="image selected" v-if="state.imageSelected">
      <img class="image selected display" :src="state.imageSelected" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent, reactive, computed, onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CertificateBoard',
  setup() {
    const store = useStore();

    const state = reactive({
      imageSelected: computed(() => (store.state.User.certificateSelected
        ? store.state.User.certificateSelected.url
        : null)),
      loading: computed(() => store.state.User.fetching),
      allCerts: computed(() => (store.state.User.certificates
        ? store.state.User.certificates : [])),
      pageIdx: computed(() => store.state.User.certificatePage),
      hasNext: computed(() => store.state.User.certificateToFetch),
      styles: [
        {
          left: '10vw',
          top: '26.406vw',
        },
        {
          left: '21.979vw',
          top: '26.406vw',
        },
        {
          left: '33.958vw',
          top: '26.406vw',
        },
        {
          left: '45.938vw',
          top: '26.406vw',
        },
        {
          left: '10vw',
          top: '38.021vw',
        },
        {
          left: '21.979vw',
          top: '38.021vw',
        },
        {
          left: '33.958vw',
          top: '38.021vw',
        },
        {
          left: '45.938vw',
          top: '38.021vw',
        },
      ],
      stylesFrame: [
        {
          left: '9.5vw',
          top: '25.9vw',
        },
        {
          left: '21.5vw',
          top: '25.9vw',
        },
        {
          left: '33.5vw',
          top: '25.9vw',
        },
        {
          left: '45.45vw',
          top: '25.9vw',
        },
        {
          left: '9.5vw',
          top: '37.515vw',
        },
        {
          left: '21.5vw',
          top: '37.515vw',
        },
        {
          left: '33.5vw',
          top: '37.515vw',
        },
        {
          left: '45.45vw',
          top: '37.515vw',
        },
      ],
    });

    /**
     * Fetch certificates to be displayed in that page
     *
     * @param {int} pageIdx The page index chosen
     */
    async function fetchAllCertificates(pageIdx) {
      const response = await fetch(
        `https://us-central1-deguild-2021.cloudfunctions.net/app/certificates/${store.state.User.user}/${pageIdx}`,
        { mode: 'cors' },
      );
      const responseNext = await fetch(
        `https://us-central1-deguild-2021.cloudfunctions.net/app/certificates/${
          store.state.User.user
        }/${pageIdx + 1}`,
        { mode: 'cors' },
      );

      if (response.status === 200) {
        const certificateSet = await response.json();
        store.dispatch('User/setCertificates', certificateSet);
        // console.log(certificateSet);

        if (responseNext.status === 200) {
          store.dispatch('User/setCertificateToFetch', true);
        } else {
          store.dispatch('User/setCertificateToFetch', false);
        }
      } else {
        store.dispatch('User/setCertificates', []);
        store.dispatch('User/setCertificateToFetch', null);
      }
    }

    /**
     * Display the image chosen from the board
     *
     * @param {int} imageIdx The image index chosen
     */
    function choosing(imageIdx) {
      const displayText = `Amazing! You have learned ${state.allCerts[imageIdx].title}`;
      store.dispatch(
        'User/setSelectedCertificateName',
        state.allCerts[imageIdx].title,
      );
      store.dispatch('User/setChosenCertificate', state.allCerts[imageIdx]);
      store.dispatch(
        'User/setSharingCertificate',
        `${window.location.origin}/api/shareCertificate/${state.allCerts[imageIdx].address}/${store.state.User.user}/${state.allCerts[imageIdx].tokenId}`,
      );
      store.dispatch(
        'User/setSharingCertificateFB',
        `https://us-central1-deguild-2021.cloudfunctions.net/app/shareCertificate/${state.allCerts[imageIdx].address}/${store.state.User.user}/${state.allCerts[imageIdx].tokenId}`,
      );
      store.dispatch('User/setDialog', displayText);
    }

    /**
     * Display the page chosen from the board
     *
     * @param {int} pageIdx The page index chosen
     */
    async function navigate(pageIdx) {
      store.images = [];
      store.dispatch('User/setCertificatePage', pageIdx);
      store.dispatch('User/setFetching', true);
      await fetchAllCertificates(pageIdx);
      setTimeout(() => store.dispatch('User/setFetching', false), 10);

      return true;
    }

    onBeforeMount(async () => {
      store.dispatch('User/setFetching', true);
      await fetchAllCertificates(0);
      store.dispatch('User/setFetching', false);
    });

    return {
      state,
      navigate,
      choosing,
    };
  },
});
</script>

<style scoped lang="scss">
.position-board {
  position: absolute;
  top: -3vw;
}
.image {
  width: 7.6vw;
  height: 7.6vw;
  position: absolute;
  background: url('../../assets/Spinner-1s-200px.svg') no-repeat center;
  &.no-bg {
    background: unset;
  }
  &.display {
    position: static;
  }

  &.selected {
    width: 19.583vw;
    height: 19.583vw;
    left: 70.677vw;
    top: 24.115vw;
  }
}
.background {
  width: 52.031vw;
  height: 24.167vw;
  position: absolute;
  background: #585858;
  left: 5.625vw;
  top: 24.115vw;
  &.frame {
    width: 8.542vw;
    height: 8.542vw;
    background: url('../../assets/certificateFrame.png');
    background-size: cover;
    &.click {
      cursor: pointer;
    }
  }
}
.navButton {
  display: flex;
  cursor: pointer;

  width: 5.171vw;
  height: 2.727vw;
  left: 50.885vw;
  top: 49.635vw;
  position: absolute;

  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #ff027b;
  background-blend-mode: soft-light, normal;
  border-radius: 1.25vw;

  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 1.302vw;
  line-height: 1.927vw;

  align-items: center;
  text-align: center;
  justify-content: center;

  letter-spacing: -0.015em;
  color: #ffffff;

  text-shadow: 0px 2px 4px rgba(91, 26, 26, 0.14),
    0px 3px 4px rgba(123, 12, 12, 0.12), 0px 1px 5px rgba(136, 13, 13, 0.2);

  &.previous {
    left: 7.292vw;
  }

  &:hover {
    background: #c82333;
  }
}
</style>
