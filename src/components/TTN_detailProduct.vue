<template>
  <h1 style="text-align: left">Chi tiết sản phẩm</h1>
  <div class="container-fluid">
    <div v-if="product && Object.keys(product).length">
      <div class="row">
        <div class="col-md-4">
          <img
            :src="product.urlImg || '/default-image.jpg'"
            class="img-fluid"
            alt="Hình ảnh minh họa"
          />
        </div>
        <div class="col-md-4" style="text-align: left">
          <p>
            Tên sản phẩm: <b> {{ product.name }}</b>
          </p>
          <p>
            Giá bán: <span style="color: red">{{ formatCurrency(product.price_sales)  }}</span>
            <span style="text-decoration: line-through;margin-left: 20px;">
              {{ formatCurrency(product.price )}}
            </span>
          </p>
          <p>Giảm giá: {{ product.discount }}%</p>
          <p>Mô tả chi tiết sản phẩm: {{ product.description }}</p>
          <p>Kho: {{ product.quantity }}</p>

          <div class="d-flex align-items-center">
            <button @click="decreaseQuantity" class="btn btn-secondary">
              -
            </button>
            <p style="margin: 0 10px">{{ quantity }}</p>
            <button @click="increaseQuantity" class="btn btn-secondary">
              +
            </button>
            <button
              class="btn mx-2"
              :class="product.quantity === 0 ? 'btn-danger' : 'btn-success'"
              :disabled="product.quantity === 0"
              @click="addToCart"
            >
              {{ product.quantity === 0 ? "Hết hàng" : "Thêm giỏ hàng" }}
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <p><b>Sản phẩm tương tự</b></p>
          <TTN_haveCategoty
            v-for="items in category"
            :key="items.id"
            :category="items"
          />
        </div>
      </div>

      <div class="row">
        <h1 style="text-align: left">Đánh giá sản phẩm</h1>
        <div class="col-md-8">
          <TTN_feedback :productId="product.id" />
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-danger">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TTN_haveCategoty from "./TTN_haveCategoty.vue";
import TTN_feedback from "./TTN_feedback.vue";

export default {
  components: {
    TTN_haveCategoty,
    TTN_feedback,
  },
  data() {
    return {
      product: {},
      category: [],
      quantity: 1,
    };
  },
  computed: {
    ...mapGetters(["allProducts"]), // Lấy danh sách sản phẩm từ Vuex
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    ...mapActions(["addCart"]),
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    addToCart() {
      console.log("Sản phẩm nè" + JSON.stringify(this.product));

      const product_id = this.$route.params.id;
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const account_id = currentUser ? currentUser.id : null;
      const { quantity } = this;

      if (!account_id) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        return;
      }

      this.addCart({ ...this.product, product_id, account_id, quantity })
        .then(() => {
          alert("Sản phẩm đã được thêm vào giỏ hàng!");
        })
        .catch((error) => {
          console.error("Lỗi khi thêm vào giỏ hàng:", error);
        });
    },
    increaseQuantity() {
      if (this.quantity < this.product.quantity) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    loadProduct() {
      let id = this.$route.params.id;
      if (this.allProducts.length > 0) {
        this.product = this.allProducts.find((item) => item.id == id) || {};
        this.loadCategory();
      }
    },
    loadCategory() {
      if (this.product?.category_id) {
        this.category = this.allProducts.filter(
          (item) =>
            item.category_id === this.product.category_id &&
            item.id !== this.product.id
        );
      }
    },
  },
  async beforeMount() {
    if (!this.allProducts.length) {
      await this.fetchProducts();
    }
    this.loadProduct();
  },
  watch: {
    // Theo dõi khi ID trên route thay đổi
    "$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
