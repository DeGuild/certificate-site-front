<template>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
    crossorigin="anonymous"
  />

  <router-view />

</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
body {
  background-image: url('assets/bg.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #464646;
}

footer {
  opacity: 0%;
  color: white;
  position: absolute;
  width: 100%;
  height: 10%;
  bottom: -5vw;
}
</style>
