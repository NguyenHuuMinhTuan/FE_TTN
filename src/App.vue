<template>
  <div class="container-fluid">
    <TTN_Header/>
  </div>

</template>

<script>
import TTN_Header from './layout/TTN_Header.vue';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
  name: 'App',
  components: {
    TTN_Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
