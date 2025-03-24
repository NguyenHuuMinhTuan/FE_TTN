<template>
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__content">
          <!-- Phần bên trái -->
          <div class="footer__left">
            <div class="footer__logo">TTN SHOP</div>
            <p class="footer__description">
              Hãy đến với chúng tôi để có sự trải nghiệm tốt nhất từ các dịch vụ của chúng tôi.
            </p>
            <div class="footer__socials">
              <a href="#" class="footer__socials__icon"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="footer__socials__icon"><i class="fab fa-twitter"></i></a>
              <a href="#" class="footer__socials__icon"><i class="fab fa-instagram"></i></a>
              <a href="#" class="footer__socials__icon"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="footer__socials__icon"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <!-- Phần bên phải -->
          <div class="footer__right">
            <div class="footer__column">
              <h3 class="footer__title">Đường dẫn nhanh</h3>
              <p><a href="#">Về chúng tôi</a></p>
              <p><a href="#">Trang chủ</a></p>
              <p><a href="#">Sản phẩm</a></p>
              <p><a href="#">Mã sản phẩm</a></p>
              <p><a href="#">Dịch vụ</a></p>
            </div>
            <div class="footer__column">
              <h3 class="footer__title">Hỗ trợ</h3>
              <p><a href="#">Chính sách bảo mật</a></p>
              <p><a href="#">Điều khoản và điều kiện</a></p>
              <p><a href="#">Câu hỏi về sản phẩm</a></p>
              <p><a href="#">Công ty hỗ trợ</a></p>
              <p><a href="#">Quản lý tài khoản</a></p>
            </div>
            <div class="footer__column">
              <h3 class="footer__title">Cộng đồng</h3>
              <p><a href="#">Trở thành người giới thiệu</a></p>
              <p><a href="#">Trung tâm hỗ trợ</a></p>
              <p><a href="#">Diễn đàn của chúng tôi</a></p>
              <p><a href="#">Chợ API</a></p>
            </div>
          </div>
        </div>
        <p class="footer__copyright">Tạo bởi TTN team 2025 | K16 CNTT ĐHGĐ</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterComponent",
  };
  </script>
  
  <style scoped>
  .footer {
    background: linear-gradient(135deg, #1c1c1c, #292929);
    color: #fff;
    padding: 40px 0;
    text-align: center;
  }
  
  .footer__container {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 30px;
    flex-wrap: wrap;
  }
  
  .footer__left {
    flex: 1;
    text-align: left;
    min-width: 280px;
  }
  
  .footer__logo {
    font-size: 28px;
    font-weight: bold;
    color: #00A8FF;
    text-transform: uppercase;
  }
  
  .footer__description {
    font-size: 14px;
    margin-top: 10px;
    line-height: 1.6;
  }
  
  .footer__socials {
    margin-top: 15px;
  }
  
  .footer__socials__icon {
    margin-right: 10px;
    color: #00A8FF;
    font-size: 18px;
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  .footer__socials__icon:hover {
    transform: scale(1.2);
    color: #ffffff;
  }
  
  /* Footer phải */
  .footer__right {
    display: flex;
    flex: 2;
    justify-content: space-around;
    flex-wrap: wrap;
    min-width: 300px;
  }
  
  .footer__column {
    text-align: left;
    min-width: 150px;
  }
  
  .footer__title {
    font-size: 18px;
    font-weight: bold;
    color: #00A8FF;
    margin-bottom: 10px;
    position: relative;
  }
  
  /* Hiệu ứng gạch dưới tiêu đề */
  .footer__title::after {
    content: "";
    display: block;
    width: 40px;
    height: 3px;
    background: #00A8FF;
    margin-top: 5px;
  }
  
  .footer__column p {
    margin: 8px 0;
  }
  
  .footer__column a {
    color: #bbb;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease, transform 0.2s ease;
  }
  
  .footer__column a:hover {
    color: #00A8FF;
    transform: translateX(5px);
  }
  
  /* Copyright */
  .footer__copyright {
    margin-top: 30px;
    font-size: 14px;
    color: #aaa;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .footer__content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .footer__right {
      flex-direction: column;
      align-items: center;
    }
  
    .footer__column {
      margin-bottom: 20px;
    }
  
    .footer__title::after {
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  </style>
  