<template>
  <div
    class="container-fluid"
    style="margin: 20px; border: 1px solid black; border-radius: 20px"
  >
    <div v-if="product && product.name">
      <p style="text-align: left; font-size: 20px">
        <b>Tên sản phẩm: {{ product.name }}</b>
      </p>
      <div class="row">
        <div class="col-md-4">
          <img
            :src="product.urlImg"
            class="img-fluid"
            alt="Hình ảnh minh họa"
          />
        </div>
        <div class="col-md-8">
          <div class="form-group" style="text-align: left">
            <p style="color: red">{{ formatCurrency(product.price_sales) }}</p>
            <p style="text-decoration: line-through">
              {{ formatCurrency(product.price) }}
            </p>
            <p>Giảm giá lên đến: {{ product.discount }}%</p>
            <p>Kho: {{ product.quantity }}</p>

            <router-link
              :to="{ name: 'TTN_detailProduct', params: { id: product.id } }"
            >
              <button class="btn btn-light">Xem chi tiết sản phẩm</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>404 Không tìm thấy sản phẩm</p>
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  props: ["product"],
  data() {
    return {};
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>

<style>
</style>
