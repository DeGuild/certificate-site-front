<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/buttons">Buttons</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
@import '@/styles/_base.scss';
</style>
