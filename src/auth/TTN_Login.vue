<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="text-center mb-4">Đăng nhập</h2>
      <form @submit.prevent="login">
        <!-- Tên tài khoản -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
          <input
            type="text"
            class="form-control"
            placeholder="Tên tài khoản"
            v-model="username"
            required
          />
        </div>

        <!-- Mật khẩu -->
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input
            type="password"
            class="form-control"
            placeholder="Mật khẩu"
            v-model="password"
            required
          />
        </div>

        <!-- Nút đăng nhập -->
        <button type="submit" class="btn btn-success w-100">Đăng nhập</button>

        <!-- Đăng ký & Quên mật khẩu -->
        <div class="text-center mt-3">
          <router-link to="/register" class="btn btn-outline-primary me-2">
            Đăng ký
          </router-link>
          <a href="#" class="text-muted">Quên mật khẩu?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { eventBus } from "@/router/eventBus";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          username: this.username,
          password: this.password,
        });

        if (response.data.success) {
          const userData = {
            username: this.username,
            role: response.data.role,
            id: response.data.id,
          };
          localStorage.setItem("currentUser", JSON.stringify(userData));
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            text: "Chào mừng bạn!",
            timer: 2000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            this.$router.push("/");
            eventBus.emit("user-logged-in");
          }, 2000);
        } else {
          throw new Error("Tài khoản hoặc mật khẩu không đúng");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại!",
          text: "Tài khoản hoặc mật khẩu không đúng!",
        });
      }
    },
  },
};
</script>

<style>
/* Container chính */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://i.pinimg.com/originals/f0/2b/43/f02b43f505b174a67fd5a5c24aef8760.png");
  background-size: cover;
  background-position: center;
}

/* Hộp đăng nhập */
.login-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

/* Nút đăng nhập */
.btn-success {
  font-size: 18px;
  font-weight: bold;
}

/* Ô nhập liệu */
.input-group-text {
  background-color: #f1f1f1;
}
</style>
