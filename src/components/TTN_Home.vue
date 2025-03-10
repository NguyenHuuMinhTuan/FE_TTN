<template>
  <div class="page-container">
      <div class="carousel-section">
          <swiper v-if="isClient" :modules="[Pagination]" :slides-per-view="1" :pagination="{ clickable: true }"
              class="mySwiper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @swiper="onSwiperInit">
              <swiper-slide v-for="(image, index) in images" :key="index">
                  <div class="image-wrapper">
                      <img  :src="image" class="img-fluid" :alt="'Image ' + (index + 1)" @click="selectImage(index)" />
                  </div>
              </swiper-slide>
          </swiper>
      </div>

      <div class="featured-products">
          <h2 class="section-title">Tất cả sản phẩm</h2>
          <div class="products-grid">
              <router-link v-for="product in randomProducts" :key="product.id" to="/thucdon" class="product-card">
                  <div class="product-image">
                      <img :src="product.image" :alt="product.name">
                      <div class="product-overlay">
                          <span class="view-more">Xem thêm</span>
                      </div>
                  </div>
                  <div class="product-info">
                      <h3>{{ product.name }}</h3>
                      <p class="price">{{ formatPrice(product.price) }}</p>
                  </div>
              </router-link>
          </div>
      </div>

      <section class="update-info">
          <div class="update-info-text">
              <h2 class="center-text-share">VỀ COMEBUY</h2>
          </div>
          <div class="icon-bottom-title"><img src="/Images/Info/line.webp" alt=""></div>
          <div class="update-cart">
              <div class="cart-info">
                  <img src="/Images/Info/icon_uti_1.webp" alt="">
                  <h4>COMEBUY hương vị tuyệt hảo</h4>
                  <p>Niềm đam mê của chúng tôi gắn liền với những Lá Trà vì thế chúng tôi luôn mang đến hương vị hoàn hảo nhất</p>
              </div>
              <div class="cart-info">
                  <img src="/Images/Info/icon_uti_2.webp" alt="">
                  <h4>COMEBUY trà tươi</h4>
                  <p>Made-to-order, công nghệ pha trà tiên tiến nhất mang đến cho bạn ly trà vẹn nguyên hương vị ngay khi bạn muốn</p>
              </div>
              <div class="cart-info">
                  <img src="/Images/Info/icon_uti_3.png" alt="">
                  <h4>Với COMEBUY, an toàn là trên hết</h4>
                  <p>Comebuy cam kết sử dụng nguyên liệu cao cấp, mang đến bạn những đồ uống không chỉ ngon mà còn tốt cho sức khỏe</p>
              </div>
          </div>
      </section>

      <div class="danhMuc">
          <h2 class="title-head">Danh mục sản phẩm</h2>
          <div class="filter-buttons">
          <!-- 3 nút phân loại sản phẩm -->
          <button
              :class="['filter-btn', { 'active-white': selectedFilter === 'promotion', 'inactive': selectedFilter !== 'promotion' }]"
              @click="selectedFilter = 'promotion'">Khuyến mãi</button>
          <button
              :class="['filter-btn', { 'active-white': selectedFilter === 'best_seller', 'inactive': selectedFilter !== 'best_seller' }]"
              @click="selectedFilter = 'best_seller'">Best Seller</button>
          <button
              :class="['filter-btn', { 'active-red': selectedFilter === 'noi_bat', 'inactive': selectedFilter !== 'noi_bat' }]"
              @click="selectedFilter = 'noi_bat'">Sản phẩm nổi bật</button>
      </div>

      <div class="products-grid">
          <router-link v-for="product in filteredProducts" :key="product.id" to="/thucdon" class="product-card">
              <div class="product-image">
                  <img :src="product.image" :alt="product.name">
                  <div class="product-overlay">
                      <span class="view-more">Xem thêm</span>
                  </div>
              </div>
              <div class="product-info">
                  <h3>{{ product.name }}</h3>
                  <p class="price">{{ formatPrice(product.price) }}</p>
              </div>
          </router-link>
      </div>
      </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


export default {
  name: 'ComHome',
  components: {
      Swiper,
      SwiperSlide
  },
  data() {
      return {
          images: [
              'https://newspaperads.ads2publish.com/wp-content/uploads/2021/05/redmi-note-10-pro-max-revolutionary-108mp-smartphone-ad-times-of-india-mumbai-25-05-2021.jpg',
              'https://howtotechnaija.com/wp-content/uploads/2019/09/Mi-A3-price.jpg',
              'https://i.ytimg.com/vi/eKCQvuqFt_0/maxresdefault.jpg',
              'https://tabloidpulsa.id/wp-content/uploads/2022/04/OPPO-A96-First-Sale.jpg',
              'https://th.bing.com/th/id/OIP.Brvt1nkqzIFBwGabUO1cnQHaEK?rs=1&pid=ImgDetMain',
              'https://th.bing.com/th/id/OIP.WVnv-uFxcNdaSppgsyxWZAHaE3?rs=1&pid=ImgDetMain',
              'https://th.bing.com/th/id/OIP.GKYnW00rWk5BJfnoj79LmAHaEK?rs=1&pid=ImgDetMain',
              'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3fd002165790179.640dc398939e2.jpg',
              'https://www.everydayonsales.com/wp-content/uploads/2021/08/Xiaomi-Fans-Appreciation-Day-Sale.jpg',
          ],
          currentIndex: 0,
          imageRotationInterval: null,
          swiperInstance: null,
          isClient: false,

          products: [],
          selectedFilter: 'promotion', 
      };
  },
  computed: {
      randomProducts() {
          return this.shuffleArray([...this.products]).slice(0, 4);
      },
      filteredProducts() {
          // Lọc sản phẩm dựa vào loại đã chọn
          return this.products.filter(product => product.promotionType === this.selectedFilter);
      },
  },
  mounted() {
      this.isClient = true;
      this.startImageRotation();
  },
  beforeUnmount() {
      this.clearRotationInterval();
  },
  methods: {
      onSwiperInit(swiper) {
          this.swiperInstance = swiper;
      },
      selectImage(index) {
          this.currentIndex = index;
          if (this.swiperInstance) {
              this.swiperInstance.slideTo(index);
          }
      },
      startImageRotation() {
          this.clearRotationInterval();
          this.imageRotationInterval = setInterval(() => {
              this.currentIndex = (this.currentIndex + 1) % this.images.length;
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
      handleMouseEnter() {
          this.clearRotationInterval();
      },
      handleMouseLeave() {
          this.startImageRotation();
      },
      shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
      },
      formatPrice(price) {
          return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
          }).format(price * 1000);
      }
  },
  setup() {
      return {
          Pagination
      };
  }
}
</script>

<style scoped>
.page-container {
  width: 100%;
  overflow-x: hidden;
}

.carousel-section {
  width: 100%;
  margin-bottom: 2.5rem;
  position: relative;
  
}

.carousel-section .swiper {
  width: 100%;
  height: auto;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-top: 42px;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.story-container {
  background-color: var(--bg-color, rgba(255, 255, 255, 0.95));
  padding: 4rem 1.25rem;
  position: relative;
}

.story-content {
  max-width: 75rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.75rem;
  align-items: start;
}

.left-content {
  display: flex;
  justify-content: center;
}

.left-content img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.left-content img:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
}

.right-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1.25rem;
}

.title-container {
  margin-bottom: 2rem;
  position: relative;
}

.discover {
  font-family: 'Playball', cursive;
  color: #d4af37;
  font-size: 2.625rem;
  display: block;
  margin-bottom: -0.9375rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title-container h2 {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  color:  #d88c18;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.1875rem;
  text-transform: uppercase;
}

.description-box {
  background-color: var(--box-bg-color, rgba(0, 0, 0, 0.8));
  border-radius: 0.5rem;
  padding: 2rem;
  margin-top: 1.25rem;
  width: 90%;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.description-box:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.25);
}

.description-box p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-light, rgba(255, 255, 255, 0.7));
  margin: 0;
  text-align: justify;
  font-family: 'Open Sans', sans-serif;
}

:deep(.swiper-pagination-bullet) {
  width: 0.5rem;
  height: 0.5rem;
  background: var(--bullet-color, #cacaca);
  opacity: 0.5;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--bullet-active-color, #fff);
  opacity: 1;
  transform: scale(1.2);
}

@media (max-width: 1024px) {
  .story-content {
      gap: 2rem;
  }

  .title-container h2 {
      font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .story-content {
      grid-template-columns: 1fr;
      gap: 2.5rem;
  }

  .right-content {
      align-items: center;
      text-align: center;
  }

  .description-box {
      width: 100%;
  }

  .title-container {
      text-align: center;
  }

  .discover {
      font-size: 2.25rem;
  }

  .title-container h2 {
      font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .story-container {
      padding: 2rem 1rem;
  }

  .discover {
      font-size: 2rem;
  }

  .title-container h2 {
      font-size: 2rem;
      letter-spacing: 0.125rem;
  }

  .description-box {
      padding: 1.5rem;
  }
}
.update-info-text {
  color: #d88c18;
}
.featured-products {
  padding: 2rem 1.25rem;
  background-color: #fff;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #dfa71b;
  margin-bottom: 3rem;
  font-family: 'Montserrat', sans-serif;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 5rem;
  height: 0.25rem;
  background-color: #dfa71b;
  border-radius: 0.125rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 75rem;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
}

.product-image {
height: 200px;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
}

.product-image img {
max-height: 100%;
max-width: 100%;
object-fit: contain;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.view-more {
  color: white;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid white;
  border-radius: 2rem;
  transition: all 0.3s ease;
}

.product-info {
  padding: 1.25rem;
  text-align: center;
}

.product-info h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-color, #2c3e50);
  margin-bottom: 0.5rem;
}

.price {
  color: var(--accent-color, #8B4513);
  font-weight: 600;
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 0 1rem;
  }

  .section-title {
      font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .products-grid {
      grid-template-columns: 1fr;
  }

  .section-title {
      font-size: 1.75rem;
  }
}
/* update-info */
.update-info{
  padding: 30px;
  margin: 10px;
}

.cart-info img{
  width: 150px;
  height: auto;
  border-radius: 2px;
}

.cart-info{
  text-align: center;
}

.cart-info h4{
  margin: 10px;
  color: #373333;
}

.cart-info p{
  color: #707070;
  margin: 10px;
  font-size: 15px;
}

.cart-info a{
  color: #000008;
  font-weight: 550;
}

.center-text-share{
  display:block;
  color: #dfa71b;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Courier New';
  position: relative;
  font-size: 40px;
  /* font-weight: 500;  */
  margin-bottom: 0;
  /* letter-spacing: 1.8px; */
}

.icon-bottom-title {
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin-bottom: 28px;
}

.update-cart{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, auto));
  gap: 3rem;
  /* margin-bottom: 50px; */
}
.order-container {
position: relative;
overflow: hidden;
height: 50px; /* Chiều cao của container */
display: flex;
justify-content: center;
align-items: center;
}

.order-text {
position: absolute;
bottom: -50px; /* Bắt đầu từ bên dưới */
animation: moveUp 1s ease forwards; /* Thời gian và hiệu ứng */
font-size: 24px;
color: #ff4500; /* Màu chữ */
}

@keyframes moveUp {
from {
  bottom: -50px;
}
to {
  bottom: 0;
}
}
.title-head {
  font-size: 34px;
  color: #dfa71b;
  text-transform: uppercase;
  padding-bottom: 30px;
  display: inline-block;
  font-family: "Quicksand", sans-serif;
}
.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 10px 20px;
  border: 1px solid white;
  cursor: pointer;
  font-size: 16px;
  border-radius: 30px;
  transition: background-color 0.3s;
}

.filter-btn.active-white {
  background-color: #ff8a6c;
  color: #fcfcfc;
}

.filter-btn.active-red {
  background-color: #ff8a6c;
  color: white;
}
.filter-btn.active-red :hover {
  background-color: #fc7c5c;
}
.filter-btn.inactive {
  background-color: #ffffff;
  color: #fc7c5c;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.danhMuc {
  padding: 36px;
}
.products-grid {
  padding: 30px;
}
</style>