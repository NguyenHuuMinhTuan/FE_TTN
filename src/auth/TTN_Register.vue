<template>
  <div class="container">
    <div class="form-box">
      <h2>Đăng Ký</h2>

      <!-- Ô nhập Username -->
      <input type="text" placeholder="Username" v-model="registerData.username" required />
      <p v-if="usernameInvalid" class="error-text">Username phải từ 8 - 20 ký tự!</p>

      <!-- Ô nhập Email -->
      <input type="email" placeholder="Email" v-model="registerData.email" required />
      <p v-if="emailInvalid" class="error-text">Email không hợp lệ!</p>

      <!-- Ô nhập Password -->
      <input type="password" placeholder="Password" v-model="registerData.password" required />
      <p v-if="passwordInvalid" class="error-text">
        Mật khẩu phải từ 8-20 ký tự, có chữ, số và ký tự đặc biệt!
      </p>

      <!-- Thanh chỉ báo độ mạnh của mật khẩu -->
      <div class="password-strength" style="margin-bottom:20px">
        <div class="strength-bar" :class="passwordStrengthClass"></div>
        <p class="strength-text">{{ passwordStrengthText }}</p>
      </div>

      <!-- Ô nhập Confirm Password -->
      <input type="password" placeholder="Confirm Password" v-model="registerData.confirmPassword" required />
      <p v-if="passwordMismatch" class="error-text">Mật khẩu không khớp!</p>

      <!-- Xác thực Captcha -->
      <div class="captcha-box" @click="verifyCaptcha">
        <div class="captcha-content">
          <div class="checkmark-container">
            <div v-if="captchaLoading" class="spinner"></div>
            <div v-else-if="captchaChecked" class="checkmark"></div>
            <div v-else class="checkbox"></div>
          </div>
          <span class="captcha-text">{{ captchaText }}</span>
        </div>
        <img src="https://th.bing.com/th/id/OIP.rCO9Coj1TBsvQLaUjhOYLQHaHa?rs=1&pid=ImgDetMain" class="captcha-logo" />
      </div>

      <!-- Nút Đăng ký -->
      <button @click="register" :disabled="!formValid">Đăng Ký</button>

      <p>
        Đã có tài khoản?
        <a href="/auth/login" class="btn btn-light">Đăng nhập</a>
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      registerData: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      captchaChecked: false,
      captchaLoading: false,
      captchaText: "Tôi không phải là người máy",
    };
  },
  computed: {
    passwordMismatch() {
      return this.registerData.password && this.registerData.confirmPassword && this.registerData.password !== this.registerData.confirmPassword;
    },
    emailInvalid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.registerData.email && !emailPattern.test(this.registerData.email);
    },
    usernameInvalid() {
      return this.registerData.username.length < 8 || this.registerData.username.length > 20;
    },
    passwordInvalid() {
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      return this.registerData.password && !passwordPattern.test(this.registerData.password);
    },
    passwordStrength() {
      const pass = this.registerData.password;
      if (!pass) return 0;
      if (pass.length < 8) return 1;
      if (pass.match(/[A-Za-z]/) && pass.match(/\d/)) return 2;
      if (pass.match(/[A-Za-z]/) && pass.match(/\d/) && pass.match(/[@$!%*?&]/)) return 3;
      return 0;
    },
    passwordStrengthText() {
      return ["Yếu", "Trung Bình", "Khá", "Mạnh"][this.passwordStrength];
    },
    passwordStrengthClass() {
      return ["weak", "medium", "strong"][this.passwordStrength - 1] || "";
    },
    formValid() {
      return (
        this.registerData.username &&
        this.registerData.email &&
        this.registerData.password &&
        this.registerData.confirmPassword &&
        !this.passwordMismatch &&
        !this.emailInvalid &&
        !this.usernameInvalid &&
        !this.passwordInvalid &&
        this.captchaChecked
      );
    },
  },
  methods: {
    ...mapActions(["addAccount"]),
    async register() {
      if (!this.formValid) {
        Swal.fire("Lỗi", "Vui lòng điền đầy đủ thông tin!", "error");
        return;
      }
      try {
        await this.addAccount({
          username: this.registerData.username,
          email: this.registerData.email,
          password: this.registerData.password,
        });
        Swal.fire("Thành công", "Đăng ký tài khoản thành công!", "success").then(() => {
          this.$router.push("/auth/login");
        });
      } catch (error) {
        Swal.fire("Lỗi", "Đăng ký thất bại. Vui lòng thử lại!", "error");
      }
    },
    verifyCaptcha() {
      if (this.captchaChecked || this.captchaLoading) return;
      this.captchaLoading = true;
      this.captchaText = "Đang xác thực...";
      setTimeout(() => {
        this.captchaChecked = true;
        this.captchaLoading = false;
        this.captchaText = "Đã xác thực thành công";
      }, 3000);
    },
  },
};
</script>


<style scoped>
/* Tổng thể */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Form Box */
.form-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
}

/* Định dạng input */
input {
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Định dạng button */
button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background: #764ba2;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 5px;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #5a3e8b;
}

/* Captcha Box */
/* Captcha Box */
.captcha-box {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Cố định khoảng cách */
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  width: 100%;
  cursor: pointer;
}

/* Captcha Nội Dung */
.captcha-content {
  display: flex;
  align-items: center;
  flex-grow: 1; /* Giữ text không làm dịch chuyển icon */
  gap: 10px;
}

/* Captcha Logo */
.captcha-logo {
  width: 50px;
  height: 50px;
  flex-shrink: 0; /* Không bị co lại khi text thay đổi */
}

/* Captcha Text */
.captcha-text {
  white-space: nowrap; /* Giữ text không xuống dòng */
  flex-grow: 1; /* Đẩy logo về bên phải */
}


/* Container cho icon */
.checkmark-container {
  width: 20px;
  height: 20px;
  position: relative;
}

/* Checkbox chưa tick */
.checkbox {
  width: 20px;
  height: 20px;
  background-color: white;
  border: 2px solid #ccc;
  display: inline-block;
}

/* Icon loading (xoay tròn) */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Icon dấu tích */
.checkmark {
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  border-color: #4caf50;
  position: relative;
}

.checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Captcha text */
.captcha-text {
  font-size: 14px;
  color: #333;
}
/* Hiển thị thông báo lỗi */
.error-text {
  color: red;
  font-size: 12px;
  text-align: left;
}

/* Thanh hiển thị độ mạnh mật khẩu */
.password-strength {
  width: 100%;
  height: 8px;
  margin: 5px 0;
  border-radius: 4px;
  background: #ddd;
}

.strength-bar {
  height: 100%;
  transition: width 0.3s ease-in-out;
}

.weak {
  width: 33%;
  background: red;
}

.medium {
  width: 66%;
  background: orange;
}

.strong {
  width: 100%;
  background: green;
}

.strength-text {
  font-size: 12px;
  text-align: left;
  margin-top: 5px;
}


/* Animation xoay */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
