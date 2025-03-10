<template>
  <div class="container-fluid">
    <h1>Chào mừng đến với trang ADMIN</h1>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá sản phẩm</th>
                <th>Trạng thái</th>
                <th>Giảm giá (%)</th>
                <th>Giá sau giảm</th>
                <th>Mã danh mục</th>
                <th>Số lượng</th>
                <th>Mô tả</th>
                <th>Đường dẫn ảnh</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="items in allProducts" :key="items.id">
                <td>{{ items.id }}</td>
                <td>{{ items.name }}</td>
                <td>{{ items.price }}</td>
                <td>{{ items.status.data ? "Còn hàng" : "Hết hàng" }}</td>
                <td>{{ items.discount }}</td>
                <td>{{ items.price_sales }}</td>
                <td>{{ items.category_id }}</td>
                <td>{{ items.quantity }}</td>
                <td>{{ items.description }}</td>
                <td>
                  <img :src="items.urlImg" class="img-fluid" alt="Hình ảnh" />
                </td>
                <td class="d-flex">
                  <button class="btn btn-warning" @click="editProduct(items)">
                    Edit
                  </button>
                  <button class="btn btn-danger" @click="DeleteConfirmProduct(items.id)">
                    Del
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Truyền dữ liệu vào TTN_addProduct -->
        <TTN_addProduct :productToEdit="productToEdit" @reset-edit="resetEditState" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TTN_addProduct from "@/components/TTN_addProduct.vue";
import Swal from "sweetalert2";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";


export default {
  data() {
    return {
      productToEdit: null, // Sản phẩm cần chỉnh sửa
    };
  },
  computed: {
    ...mapGetters({
      allProducts: "allProducts",
    }),
  },
  components: {
    TTN_addProduct,
  },
  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
      deleteProduct: "deleteProduct",
    }),

    // Khi nhấn Edit, cập nhật productToEdit để truyền sang form
    editProduct(product) {
      this.productToEdit = { ...product }; // Copy dữ liệu để tránh ảnh hưởng state gốc
      new bootstrap.Modal(document.getElementById("example")).show(); // Hiện modal
    },

    DeleteConfirmProduct(id) {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(id);
          Swal.fire("Đã xóa!", "Sản phẩm đã bị xóa thành công.", "success");
          window.location.reload(); 
        }
      });
    },

    // Reset trạng thái sau khi đóng modal hoặc l ưu xong
    resetEditState() {
      this.productToEdit = null;
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
