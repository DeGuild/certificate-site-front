<template>
  <div class="image selected">
    <img class="image selected display" src="@/assets/cry.jpg" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NoCertificate',
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

  &.selected {
    width: 19.583vw;
    height: 19.583vw;
    left: 40.208vw;
    top: 15.5vw;
  }
}
</style>
