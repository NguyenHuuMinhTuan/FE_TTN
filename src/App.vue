<template>
  <div class="container-fluid">
    <TTN_Header />

    <TTN_Footer />

    <div class="scroll__to__top" v-if="showScroll" @click="scrollToTop">
      <i class="fas fa-arrow-up"></i>
    </div>
  </div>
</template>

<script>
import TTN_Header from './layout/TTN_Header.vue';
import TTN_Footer from './layout/TTN_Footer.vue'; 
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'App',
  components: {
    TTN_Header,
    TTN_Footer 
  },
  data() {
    return {
      showScroll: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScroll = window.scrollY > 300; 
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
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

.scroll__to__top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 20px;
  transition: opacity 0.3s ease-in-out;
}

.scroll__to__top:hover {
  background-color: #0056b3;
}
</style>
