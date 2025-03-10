<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 shadow-lg" style="width: 400px; border-radius: 10px">
        <h3 class="text-center text-success mb-4">Đăng ký tài khoản</h3>
        <form @submit.prevent="handleRegister">
          <div class="form-group mb-3">
            <label for="username" class="fw-bold">Tên đăng nhập</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input
                type="text"
                id="username"
                class="form-control"
                placeholder="Nhập tên đăng nhập"
                v-model="username"
                required
              />
            </div>
          </div>
  
          <div class="form-group mb-3">
            <label for="password" class="fw-bold">Mật khẩu</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input
                type="password"
                id="password"
                class="form-control"
                placeholder="Nhập mật khẩu"
                v-model="password"
                required
              />
            </div>
          </div>
  
          <div class="form-group mb-3">
            <label for="email" class="fw-bold">Email</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span>
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="Nhập email"
                v-model="email"
                required
              />
            </div>
          </div>
  
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-success w-50 me-2">Đăng ký</button>
            <button type="button" class="btn btn-secondary w-50" @click="handleCancel">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import 'bootstrap'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import "bootstrap-icons/font/bootstrap-icons.css";

  export default {
    data() {
      return {
        username: "",
        password: "",
        email: "",
      };
    },
    methods: {
      handleRegister() {
        if (this.username && this.password && this.email) {
          alert("Đăng ký thành công!");
        }
      },
      handleCancel() {
        this.username = "";
        this.password = "";
        this.email = "";
      },
    },
  };
  </script>
  
  <style>
  /* Hiệu ứng hover cho button */
  .btn-success:hover {
    background-color: #28a745;
    transform: scale(1.05);
    transition: 0.3s;
  }
  
  .btn-secondary:hover {
    background-color: #6c757d;
    transform: scale(1.05);
    transition: 0.3s;
  }
  </style>
  