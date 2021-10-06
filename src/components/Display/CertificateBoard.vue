<template>
  <!-- <div v-for="slide in 9" :key="slide">
    <img class="image" :src="state.images[slide]" :key="slide" />
  </div> -->
  <div class="background"></div>
  <div v-for="imageIndex in 8" :key="imageIndex">
    <div class="background frame" :style="state.stylesFrame[imageIndex]"></div>

    <div class="image" :style="state.styles[imageIndex]">
      <img
        class="image display click"
        :style="state.styles[imageIndex]"
        :src="state.images[imageIndex]"
        v-if="state.images[imageIndex]"
        v-on:click="choosing(imageIndex)"
      />
    </div>
  </div>
  <button class="navButton previous" v-on:click="dummy()">&#62;</button>
  <button class="navButton" v-on:click="dummy()">&#60;</button>
  <div class="image selected">
    <img class="image selected display" :src="state.imageSelected" />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'CertificateBoard',
  setup() {
    // const balances = 0;

    const state = reactive({
      imageSelected: 'https://placekitten.com/801/800',
      images: [
        'https://placekitten.com/801/800',
        'https://placekitten.com/802/800',
        'https://placekitten.com/803/800',
        'https://placekitten.com/801/800',
        'https://placekitten.com/802/800',
        'https://placekitten.com/803/800',
        'https://placekitten.com/801/800',
        'https://placekitten.com/802/800',
        'https://placekitten.com/803/800',
        'https://placekitten.com/803/800',
      ],
      styles: [
        {},
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
        {},
        {
          left: '9.4vw',
          top: '25.9vw',
        },
        {
          left: '21.379vw',
          top: '25.9vw',
        },
        {
          left: '33.358vw',
          top: '25.9vw',
        },
        {
          left: '45.337vw',
          top: '25.9vw',
        },
        {
          left: '9.4vw',
          top: '37.515vw',
        },
        {
          left: '21.379vw',
          top: '37.515vw',
        },
        {
          left: '33.358vw',
          top: '37.515vw',
        },
        {
          left: '45.337vw',
          top: '37.515vw',
        },
      ],
    });
    function dummy() {}
    function choosing(imageIdx) {
      state.imageSelected = state.images[imageIdx];
    }
    return {
      state,
      dummy,
      choosing,
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
    &:hover{
      opacity: 0.89;
    }
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
  }
}
.navButton {
  display: flex;
  cursor: pointer;

  width: 5.171vw;
  height: 2.727vw;
  left: 7.292vw;
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
    left: 50.885vw;
  }

  &:hover {
    background: $danger-hover;
  }
}
</style>
