<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" v-if="currentUser && currentUser.role === 'ROLE_ADMIN'">
    <div class="container-fluid" style="border-bottom: 1px solid black">
      <a class="navbar-brand" href="#">TTN SHOP</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" class="nav-link">Product</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ADMINISTRATOR" class="nav-link"
              >Administrator</router-link
            >
          </li>
        </ul>

        
        <div class="ms-auto">
          <span v-if="currentUser" class="navbar-text me-2">
            Xin chào, {{ currentUser.username}}
          </span>
          <button v-if="currentUser" class="btn btn-outline-danger" @click="logout">
            Đăng xuất
          </button>
          <router-link v-else to="/auth/login">
            <button class="btn btn-outline-success">Đăng nhập</button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <!--User--> 
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" v-else>
    <div class="container-fluid" style="border-bottom: 1px solid black">
      <a class="navbar-brand" href="#">TTN SHOP</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" class="nav-link">Product</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/voucher" class="nav-link">Voucher</router-link>
          </li>
          <li class="nav-item" v-if="currentUser">
            <router-link :to="{name:'TTN_Cart', params:{id:currentUser.id}}" class="nav-link">
              Cart
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link">Service</router-link>
          </li>
          
        </ul>

      
        <div class="ms-auto">
          <span v-if="currentUser" class="navbar-text me-2">
            Xin chào, {{ currentUser.username}}
          </span>
          <button v-if="currentUser" class="btn btn-outline-danger" @click="logout">
            Đăng xuất
          </button>
          <router-link v-else to="/auth/login">
            <button class="btn btn-outline-success">Đăng nhập</button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  </div>
  
  <router-view name="main" />
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { eventBus } from "@/router/eventBus";

export default {
  computed: {
    currentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  },
  },
  methods: {
    logout() {
      localStorage.removeItem("currentUser");
      this.$forceUpdate();
      window.location.reload();
      this.$router.push("/auth/login");
    },
  },
  created() {
    eventBus.on("user-logged-in", () => {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    });
  },
  beforeUnmount() {
    eventBus.off("user-logged-in");
  }
};
</script>

<style></style>
