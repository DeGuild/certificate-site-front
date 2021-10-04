<template>
  <div v-for="slide in 9" :key="slide">
    <img class="image" :src="state.images[slide]" :key="slide" />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Autoplay',
  setup() {
    const state = reactive({
      images: [
        'https://placekitten.com/801/800',
        'https://placekitten.com/802/800',
        'https://placekitten.com/803/800',
        'https://placekitten.com/804/800',
        'https://placekitten.com/805/800',
        'https://placekitten.com/806/800',
        'https://placekitten.com/807/800',
        'https://placekitten.com/808/800',
        'https://placekitten.com/809/800',
        'https://placekitten.com/810/800',
      ],
    });
    return {
      state,
    };
  },
});
</script>

<style scoped lang="scss">
.image {
  width: 16vw;
  height: 9vw;
}
</style>
