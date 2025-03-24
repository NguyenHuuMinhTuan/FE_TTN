<template>
  <div class="container-fluid">
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary fixed-top"
      v-if="currentUser && currentUser.role === 'ROLE_ADMIN'"
    >
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
              Xin chào, {{ currentUser.username }}
            </span>
            <button
              v-if="currentUser"
              class="btn btn-outline-danger"
              @click="logout"
            >
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
              <router-link
                :to="{ name: 'TTN_Cart', params: { id: currentUser.id } }"
                class="nav-link"
              >
                Cart
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/service" class="nav-link">Service</router-link>
            </li>
            <li class="nav-item" v-if="currentUser">
              <router-link
                :to="{ name: 'TTN_Bill', params: { id: currentUser.id } }"
                class="nav-link"
              >
                Bill
              </router-link>
            </li>
          </ul>

          <div class="ms-auto">
            <span v-if="currentUser" class="navbar-text me-2">
              Xin chào, {{ currentUser.username }}
            </span>
            <button
              v-if="currentUser"
              class="btn btn-outline-danger"
              @click="logout"
            >
              Đăng xuất
            </button>
            <router-link v-else to="/auth/login">
              <button class="btn btn-outline-success">Đăng nhập</button>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="content">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import eventBus from "@/router/eventBus";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("currentUser")) || null,
    };
  },
  computed: {
    currentUser() {
      return this.user
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("currentUser");
      this.currentUser = null;
      eventBus.emit("logout");
      this.$router.push("/auth/login");
    },
  },
  created() {
    eventBus.on("loginSuccess", (user) => {
      this.user = user || null;
    });
    eventBus.on("logout", () => {
      this.user = null;
    });
  },
  beforeUnmount() {
    eventBus.off("loginSuccess");
  },
};
</script>

<style>
/* Navbar chính */
.navbar {
  background: rgba(0, 0, 0, 0.85) !important; /* Màu nền tối với độ trong suốt */
  backdrop-filter: blur(10px); /* Hiệu ứng mờ nền */
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
}
.content {
  flex: 1;
  display: flex;
  margin-top: 90px;
  flex-direction: column;
  min-height: calc(100vh - 56px); /* 56px là chiều cao navbar */
}
/* Logo */
.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: #00A8FF !important;
  transition: color 0.3s ease-in-out;
}

.navbar-brand:hover {
  color: #ffffff !important;
}

/* Navbar Items */
.navbar-nav .nav-link {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}

.navbar-nav .nav-link:hover {
  color: #00A8FF !important;
  transform: translateY(-2px);
}

/* Hiệu ứng khi active */
.navbar-nav .router-link-active {
  color: #00A8FF !important;
  font-weight: bold;
  border-bottom: 2px solid #00A8FF;
}

/* Hiệu ứng cho dropdown */
.navbar-toggler {
  border: none !important;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px;
  transition: background 0.3s ease;
}

.navbar-toggler:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Nút đăng nhập/đăng xuất */
.btn-outline-danger, .btn-outline-success {
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-outline-danger:hover {
  background: #FF4B2B;
  color: white;
}

.btn-outline-success:hover {
  background: #00A8FF;
  color: white;
}

/* Hiển thị tên user */
.navbar-text {
  font-size: 14px;
  color: #ddd;
}

/* Responsive cho mobile */
@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
  }

  .navbar-nav .nav-item {
    padding: 5px 0;
  }

  .navbar-text {
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
  
}

</style>
