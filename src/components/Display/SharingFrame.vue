<template>
  <div class="image selected">
    <img class="image selected display" :src="state.imageSelected" />
  </div>
  <div class="image info">
    <div class="text">Certificate Address: </div>
    <div class="text">Owner Address: </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
// import { useStore } from 'vuex';

export default defineComponent({
  name: 'SharingFrame',
  setup() {
    // const balances = 0;
    // const store = useStore();

    const state = reactive({
      imageSelected:
        'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.6435-9/45878479_10161252279455323_4524037980867788800_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3qP054lxacHUTWUgD6a5ILhIcwnXvjKcuEhzCde-Mpwlx2bJEHDA6W5oYEfz_zXrVgxHWB5adV4sAYYhH046V&_nc_ohc=ZAx1Vp_EQ2QAX-E_p1H&_nc_ht=scontent.fbkk22-1.fna&oh=700344b7dc01257b7542f7bd7e54fda7&oe=6187B66D',
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
    height: 5vw;
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
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 0.00892857em;
  text-transform: uppercase;

  color: #ffffff;
}
</style>
