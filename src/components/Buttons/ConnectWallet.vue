<template>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
    crossorigin="anonymous"
  />
  <h4>Buttons animations</h4>
  <font-awesome-icon icon="coffee" />
  <div id="app">
    <div class="wrapper half">
      <div class="half">
        <button
          class="btn"
          @click="finishTask(primary)"
          v-html="primary"
        ></button>
      </div>
      <div class="half">
        <button
          @click="progressTask"
          class="btn btn-1"
          v-html="success"
          :style="btn1style"
        ></button>
      </div>
    </div>

    <div class="wrapper half">
      <div class="half">
        <button
          @click="failTask"
          class="btn btn-danger"
          v-html="danger"
        ></button>
      </div>
      <div class="half">
        <button
          class="btn btn-4"
          v-html="info"
          @click="infoTask"
          :style="btn4style"
        ></button>
      </div>
    </div>
  </div>
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
@import '@/styles/Buttons/_connectWallet.scss';
</style>
