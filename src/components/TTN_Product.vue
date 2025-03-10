<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Bộ lọc danh mục -->
      <div class="col-md-4">
        <label class="form-label" for="ma_danh_muc" style="text-align: left">
          Tìm kiếm theo danh mục
        </label>
        <select class="form-control" v-model="category">
          <option value="">Tất cả</option>
          <option value="1">Điện thoại</option>
          <option value="2">Laptop</option>
          <option value="3">Máy tính bảng</option>
          <option value="4">Router</option>
        </select>
      </div>

      <!-- Tìm kiếm theo tên -->
      <div class="col-md-8">
        <label class="form-label" for="search" style="text-align: left">
          Tìm kiếm theo tên
        </label>
        <div class="d-flex">
          <input
            class="form-control"
            type="text"
            placeholder="Tìm kiếm theo tên"
            v-model="ip_search"
          />
          <button class="btn btn-dark">Search</button>
        </div>
      </div>
    </div>

    <!-- Danh sách sản phẩm -->
    <div v-if="filteredProducts.length > 0">
      <div class="row">
        <div class="col-md-4" v-for="items in filteredProducts" :key="items.id">
          <TTN_renderProduct :product="items" />
        </div>
      </div>
    </div>

    <!-- Thông báo nếu không có sản phẩm nào -->
    <div v-else class="alert alert-error">
      Không tìm thấy sản phẩm nào!
      <button @click="log">Log dữ liệu</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TTN_renderProduct from "./TTN_renderProduct.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data() {
    return {
      category: "",
      ip_search: "",
    };
  },
  components: {
    TTN_renderProduct,
  },
  computed: {
    ...mapGetters({
      allProducts: "allProducts",
    }),

    // 🔍 Hàm lọc sản phẩm dựa trên category và ip_search
    filteredProducts() {
      return this.allProducts.filter((product) => {
        const matchCategory =
          this.category === "" || product.category_id == this.category;
        const matchSearch =
          this.ip_search === "" ||
          product.name.toLowerCase().includes(this.ip_search.toLowerCase());

        return matchCategory && matchSearch;
      });
    },
  },
  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
    }),
    log() {
      console.log("Tất cả sản phẩm:", this.allProducts);
      console.log("Sản phẩm sau lọc:", this.filteredProducts);
    },
  },
  async mounted() {
    console.log("allProducts khi mounted:", this.allProducts);
    if (!this.allProducts || this.allProducts.length === 0) {
      console.log("Đang gọi fetchProducts...");
      await this.fetchProducts();
    } else {
      console.log("Dữ liệu đã có, không cần fetch.");
    }
  },
};
</script>

<style>
</style>
