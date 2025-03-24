<template>
  <div class="page-container-fluid">
    <div class="carousel-section">
      <swiper
        v-if="isClient"
        :modules="[Pagination]"
        :slides-per-view="1"
        :pagination="{ clickable: true }"
        class="mySwiper"
        @mouseenter="clearRotationInterval"
        @mouseleave="startImageRotation"
        @swiper="onSwiperInit"
      >
        <swiper-slide v-for="(video, index) in videos" :key="index">
          <video class="video-background" autoplay loop muted playsinline>
            <source :src="video" type="video/mp4" />
          </video>
        </swiper-slide>
      </swiper>
    </div>
  </div>

  <div class="feature__container section_item" id="features">
    <div class="title__content__container">
      <div class="title__content__button">Dịch vụ</div>
      <h1 class="title__content__text__1">Chào mừng bạn đến với TTN SHOP!</h1>
    </div>

    <div class="feature__content">
      <div class="feature__content__item__box">
        <div class="feature__content__item" v-for="(service, index) in services" :key="index">
          <div class="feature__content__item__icon" :class="service.iconClass">
            <i class="fab fa-dropbox"></i>
          </div>
          <div class="feature__content__item__title">{{ service.title }}</div>
          <p class="feature__content__item__text">{{ service.description }}</p>
          <div class="feature__content__item__button" :class="service.buttonClass">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="faq__container section_item" id="faq">
    <div class="faq__content">
      <div class="faq__content__left hidden left">
        <div class="title__content__container title__content__container__faq__1">
          <h1 class="title__content__text__1">Các câu hỏi thường gặp</h1>
          <p class="title__content__text__2">
            Bạn đang có những thắc mắc? Hãy chọn những vấn đề ở phía bên dưới nó có thể giúp ích cho bạn
          </p>
        </div>

        <div class="faq__question__box">
          <div class="faq__question__title" v-for="(faq, index) in faqs" :key="index">
            <i class="fas fa-chevron-down"></i>
            {{ faq.question }}
          </div>
        </div>
      </div>

      <div class="faq__content__right hidden right">
        <div class="title__content__container title__content__container__faq__2">
          <h1 class="title__content__text__1">Không bao giờ bỏ lỡ bất kỳ cập nhật nào!</h1>
          <p class="title__content__text__2 title__content__text__2__faq">
            Đừng bỏ lỡ bất kì cập nhật nào của chúng tôi để có những thông tin khuyến mãi tốt nhất.
          </p>
        </div>
        <div class="faq__content__right__input">
          <input type="email" placeholder="Nhập địa chỉ email của bạn..." />
          <a href="#" class="order__btn"><span></span>
            <p>Gửi Ngay</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default {
  name: "ComHome",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      videos: Array.from({ length: 4 }, (_, i) => require(`@/assets/video/video-bg-header-${i + 1}.mp4`)),
      isClient: false,
      currentIndex: 0,
      imageRotationInterval: null,
      services: [
        { title: "Thu Cũ Đổi Mới", description: "Dịch vụ thu cũ đổi mới chỉ áp dụng cho Apple.", iconClass: "icon-red", buttonClass: "button-red" },
        { title: "Thay Màn Hình", description: "Dịch vụ thay màn hình, ép kính cho mọi dòng điện thoại.", iconClass: "icon-blue", buttonClass: "button-blue" },
        { title: "Phụ Kiện Theo Máy", description: "Chuyên bán phụ kiện: Case AirPods, ốp lưng, ...", iconClass: "icon-yellow", buttonClass: "button-yellow" },
        { title: "Sửa chữa & Bảo Hành", description: "Kiểm tra, sửa chữa, bảo hành sản phẩm.", iconClass: "icon-green", buttonClass: "button-green" }
      ],
      faqs: [
        { question: "Các địa điểm bán hàng?" },
        { question: "Các dịch vụ thanh toán trực tuyến?" },
        { question: "Các dịch vụ sửa chữa?" },
        { question: "Thông tin liên hệ với shop?" }
      ]
    };
  },
  mounted() {
    this.isClient = true;
    this.startImageRotation();
    this.observeFeatures();
    this.observeFAQ();
  },
  beforeUnmount() {
    this.clearRotationInterval();
  },
  methods: {
    onSwiperInit(swiper) {
      this.swiperInstance = swiper;
    },
    startImageRotation() {
      this.clearRotationInterval();
      this.imageRotationInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.videos.length;
        if (this.swiperInstance) {
          this.swiperInstance.slideTo(this.currentIndex);
        }
      }, 1500);
    },
    clearRotationInterval() {
      if (this.imageRotationInterval) {
        clearInterval(this.imageRotationInterval);
        this.imageRotationInterval = null;
      }
    },
    observeFeatures() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('.feature__content__item').forEach(el => observer.observe(el));
    },
    observeFAQ() {
      console.log("Observer FAQ chạy...");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("Phần tử hiển thị:", entry.target);
              entry.target.classList.add("show");
            }
          });
        },
        { threshold: 0.2 }
      );

      const faqLeft = document.querySelector(".faq__content__left");
      const faqRight = document.querySelector(".faq__content__right");

      if (faqLeft) observer.observe(faqLeft);
      if (faqRight) observer.observe(faqRight);
    }
  },
  setup() {
    return { Pagination };
  }
};
</script>


<style scoped>
.hidden {
  opacity: 0;
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.left {
  transform: translateX(-80px);
}

.right {
  transform: translateX(80px);
}

/* Khi xuất hiện */
.show {
  opacity: 1;
  transform: translateX(0);
}

.faq__container {
  padding: 50px 20px;
  background-color: #f9f9f9;
}

.faq__content {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 30px;
}

.faq__question__title {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq__question__title:hover {
  color: #007BFF; 
}

.video-background {
  width: 100%;
  height: 700px;
  object-fit: cover;
}

.title__content__container {
  text-align: center;
}

.title__content__button {
  font-size: 12px;
  padding: 10px 15px;
  font-weight: 600;
  background-color: rgba(71, 119, 244, 0.2);
  color: var(#0099e5);
}

.title__content__text__1 {
  font-size: 3vw;
  font-weight: 600;
}

.feature__content__item__box {
  display: flex;
  justify-content: space-between;
  padding: 50px 100px;
}

.feature__content__item {
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px 0 #80808030;
  padding: 20px 30px;
  border-radius: 5px;
  gap: 15px;
  transform: translateY(100px);
  opacity: 0;
  transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

.feature__content__item.show {
  transform: translateY(0);
  opacity: 1;
}

.feature__content__item__icon {
  width: 80px;
  height: 80px;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-red { background-color: rgba(255, 76, 76, 0.1); color: #ff4c4c; }
.icon-blue { background-color: rgba(0, 153, 229, 0.1); color: #0099e5; }
.icon-yellow { background-color: rgba(255, 221, 0, 0.1); color: #ffdd00; }
.icon-green { background-color: rgba(10, 191, 83, 0.1); color: #0abf53; }

.button-red:hover { background-color: #ff4c4c; color: #fff; }
.button-blue:hover { background-color: #0099e5; color: #fff; }
.button-yellow:hover { background-color: #ffdd00; color: #fff; }
.button-green:hover { background-color: #0abf53; color: #fff; }

/* FAQ STARTS */
#feature {
  margin-top: 100px;
}

.title__content__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title__content__button {
  font-size: 12px;
  display: inline-block;
  padding: 10px 15px;
  border-radius: 2px;
  font-weight: 600;
  margin-bottom: 15px;
  background-color: rgba(71, 119, 244, 0.2);
  color: var(#0099e5);
}

.title__content__button__samsung {
  background-color: #77777754;
  color: #111;
}

.title__content__button__apple {
  background-color: #ff00002e;
  color: red;
}

.title__content__button__xiaomi {
  background-color: rgba(71, 119, 244, 0.2);
  color: var(#0099e5);
}

.title__content__button__vivo {
  background-color: #c89ecc52;
  color: #bf44ca;
}

.title__content__button__oppo {
  background-color: #27f8ea2e;
  color: #58d1c9;
}

.title__content__button__vsmart {
  background-color: #77777754;
  color: #111;
}

.title__content__text__1 {
  font-size: 3vw;
  font-weight: 600;
  letter-spacing: -1.5px;
}

.feature__content {
  width: 100%;
}

.feature__content__item__box {
  width: 100%;
  padding: 50px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feature__content__item {
  flex-basis: 23%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px 0 #80808030;
  padding: 20px 30px;
  transition: 0.3s;
  border-radius: 5px;
  gap: 15px;
  transform: translateY(100px);
  opacity: 0;
}

.feature__content__item:hover {
  box-shadow: 0px 4px 10px 0 #808080c2;
  transform: translateY(-10px);
}

.feature__content__item__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 30%;
}

.feature__content__item__icon svg {
  font-size: 40px;
  line-height: 80px;
}

.feature__content__item__icon__1,
.feature__content__item__button__1 {
  background-color: rgba(255, 76, 76, 0.1);
  color: #ff4c4c;
  transition: 0.3s;
}

.feature__content__item__button__1:hover {
  background-color: #ff4c4c;
  color: #fff;
}

.feature__content__item__icon__2,
.feature__content__item__button__2 {
  background-color: rgba(0, 153, 229, 0.1);
  color: #0099e5;
  transition: 0.3s;
}

.feature__content__item__button__2:hover {
  background-color: #0099e5;
  color: #fff;
}

.feature__content__item__icon__3,
.feature__content__item__button__3 {
  background-color: rgba(255, 221, 0, 0.1);
  color: #ffdd00;
  transition: 0.3s;
}

.feature__content__item__button__3:hover {
  background-color: #ffdd00;
  color: #fff;
}

.feature__content__item__icon__4,
.feature__content__item__button__4 {
  background-color: rgba(10, 191, 83, 0.1);
  color: #0abf53;
  transition: 0.3s;
}

.feature__content__item__button__4:hover {
  background-color: #0abf53;
  color: #fff;
}

.feature__content__item__title {
  font-weight: 600;
  line-height: 1.7;
  color: #0f1d46;
  letter-spacing: -0.01em;
  font-size: 18px;
  white-space: nowrap;
}

.feature__content__item__text {
  text-align: center;
  color: #777;
  padding: 0 10px;
  font-size: 15px;
}

.feature__content__item__button {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
  cursor: pointer;
}
/* Feature ENDS */

/* About STARTS */
div#about {
  width: 100%;
  padding-bottom: 100px;
}

.about__content {
  width: 100%;
  padding: 0 100px;
  display: flex;
}

.about__content__left {
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title__content__container__samsung,
.title__content__container__xiaomi,
.title__content__container__apple,
.title__content__container__vivo,
.title__content__container__oppo,
.title__content__container__vsmart {
  align-items: flex-start;
}

.title__content__text__1__samsung,
.title__content__text__1__xiaomi,
.title__content__text__1__apple,
.title__content__text__1__vivo,
.title__content__text__1__oppo,
.title__content__text__1__vsmart {
  text-align: start;
}

.title__content__text__2 {
  text-align: start;
  margin: 30px 0;
}

.about__content__samsung {
  padding: 100px;
}

.about__content__xiaomi {
  flex-direction: row-reverse;
}

.about__content__vivo {
  flex-direction: row-reverse;
}

.about__content__vsmart {
  flex-direction: row-reverse;
}

.about__content__left__check {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.about__content__left__check__item {
  display: flex;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  align-items: center;
}

.about__content__left__check__icon {
  background-color: #111;
  color: #fff;
  font-size: 10px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  margin-right: 15px;
  font-size: 15px;
  min-width: 25px;
}

.about__content__left__check__text {
  font-size: 16px;
  color: #111;
  font-weight: 300;
}

.about__content__right {
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about__content__right__img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about__container__xiaomi,
.about__container__apple,
.about__container__vivo,
.about__container__oppo,
.about__container__vsmart {
  margin-bottom: 150px;
}

.about__content__left__check__icon__xiaomi {
  background-color: var(#0099e5);
}
.about__content__left__check__icon__apple {
  background-color: #ed1822;
}
.about__content__left__check__icon__vivo {
  background-color: #c89ecc;
}
.about__content__left__check__icon__oppo {
  background-color: #58d1c9;
}

@media (max-width: 1200px) {
  .feature__content__item__box {
    padding: 50px 50px;
  }
}

@media (max-width: 992px) {
  .feature__content__item__box {
    flex-wrap: wrap;
  }
  .feature__content__item {
    flex-basis: 48%;
    margin-bottom: 40px;
  }
  .title__content__text__1 {
    font-size: 30px;
  }
  .about__content {
    flex-wrap: wrap;
    padding: 0 50px;
  }
  .about__content__samsung {
    padding: 150px 50px;
  }
  .about__content__left,
  .about__content__right {
    flex-basis: 100%;
  }
  .about__content__right {
    margin-top: 50px;
    width: 100%;
  }
  #products {
    margin-top: -100px;
  }
  .about__content__right__img img {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .feature__content__item {
    flex-basis: 100%;
  }
  .about__content__right__img img {
    width: 90%;
    min-width: 270px;
  }
  .title__content__text__1 {
    font-size: 25px;
  }
  .about__content {
    padding: 0 20px;
  }
  .about__container__xiaomi,
  .about__container__apple,
  .about__container__vivo,
  .about__container__oppo,
  .about__container__vsmart {
    margin-bottom: 50px;
  }
  .about__content__samsung {
    padding: 50px 20px;
  }
}

@media (max-width: 400px) {
  .feature__content__item__box {
    padding: 50px 20px;
  }
  .title__content__text__2,
  .about__content__left__check__text {
    font-size: 14px;
  }
  .header__menu__logo {
    padding: 25px 20px;
  }
  .header__menu__logo.active,
  .header__content__left__right {
    padding: 20px;
  }
  .header__logo,
  .open__menu__sidebar {
    font-size: 25px;
  }
  .header__content__left h1 {
    font-size: 25px;
    margin-bottom: 0;
  }
  .title__content__text__1 {
    padding: 0 20px;
    font-size: 25px;
  }
}
/* About ENDS */

/* FAQ STARTS */
.faq__content {
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
  margin-bottom: 100px;
}

.title__content__container__faq__1 {
  align-items: flex-start;
}

.faq__content__left,
.faq__content__right {
  padding: 0 50px;
}

.faq__question__title {
  width: 100%;
  padding: 20px 0;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  color: #111;
  font-size: 17px;
  font-weight: 900;
  transition: 0.3s;
}

.faq__question__title.active {
  color: var(#0099e5);
}

.faq__question__title.active svg {
  transform: rotate(180deg);
}

.faq__question__title svg {
  position: absolute;
  left: 0;
  font-size: 12px;
  transition: 0.3s;
}

.faq__question__title:hover {
  color: var(#0099e5);
}

.faq__question__answer {
  width: 100%;
  height: 0px;
  font-size: 15px;
  color: #777;
  transition: 0.3s;
  overflow: hidden;
}

.faq__question__answer.active {
  height: 70px;
}

.title__content__container__faq__2 {
  align-items: flex-end;
}

.title__content__text__2__faq {
  text-align: end;
}

.faq__content__right__input {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(128 128 128 / 18%) 0px 0px 10px 0px;
  margin-top: 50px;
}

.faq__content__right__input input {
  width: 100%;
  height: 45px;
  border: none;
  padding: 0 20px;
  outline: none;
  border-right: 1px solid #80808075;
}

@media (max-width: 992px) {
  .faq__content {
    padding: 0 25px;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
  .faq__content__left,
  .faq__content__right {
    padding: 0 25px;
    flex-basis: 100%;
    margin-bottom: 50px;
  }
}

@media (max-width: 600px) {
  .faq__content {
    padding: 0 10px;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
  .faq__content__left,
  .faq__content__right {
    padding: 0 10px;
    flex-basis: 100%;
    margin-bottom: 50px;
  }
}

@media (max-width: 600px) {
  .faq__content__right__input {
    margin-top: 20px;
  }
  .faq__content__left,
  .faq__content__right {
    padding: 0 10px;
    flex-basis: 100%;
    margin-bottom: 50px;
  }
}

/* FAQ ENDS */

.scroll__to__top {
  background-color: var(#0099e5);
  width: 45px;
  height: 45px;
  text-align: center;
  font-size: 14px;
  border-radius: 50%;
  line-height: 45px;
  color: #fff;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
}

.scroll__to__top.active {
  visibility: visible;
  opacity: 1;
}

.order__btn {
  background-color: #fff;
  border-radius: 2px;
  text-transform: uppercase;
  width: 170px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  overflow: hidden;
  position: relative;
}

.order__btn p {
  color: #0f083a;
  font-size: 14px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0;
  transition: 0.3s;
}

.order__btn:hover p {
  color: #fff;
  z-index: 1000;
}

.order__btn span {
  position: absolute;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: #0f083a;
  top: var(--yhover);
  left: var(--xhover);
  transition: width 0.5s, height 0.5s;
  transform: translate(-50%, -50%);
}

.order__btn:hover span,
.order__btn.active:hover span {
  width: 100vw;
  height: 100vh;
  z-index: 999;
}

.order__btn__header.active {
  background-color: var(#0099e5);
  color: #fff;
  transition: all 0.3s;
}

.order__btn__header.active p {
  color: #fff;
}
.order__btn__sidebar {
  width: 100%;
  background-color: var(#0099e5);
  color: #fff;
  margin-top: 10px;
}

</style>