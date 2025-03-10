<template>
  <div class="modal fade" tabindex="-1" id="example" aria-hidden="true">
    <form class="form-group" @submit.prevent="saveProduct">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">Thêm sản phẩm</div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <label class="form-label">ID</label>
                <input
                  v-model="product.id"
                  class="form-control"
                  type="text"
                  readonly
                  placeholder="ID sẽ được tự tạo"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Tên sản phẩm</label>
                <input
                  v-model="product.name"
                  class="form-control"
                  type="text"
                  placeholder="Tên sản phẩm"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Giá</label>
                <input
                  v-model="product.price"
                  class="form-control"
                  type="number"
                  placeholder="Giá sản phẩm"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Giảm giá (%)</label>
                <input
                  v-model="product.discount"
                  class="form-control"
                  type="number"
                  placeholder="Giảm giá"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Giá sau giảm</label>
                <input
                  class="form-control"
                  type="text"
                  :value="priceSales"
                  readonly
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Trạng thái sản phẩm</label>
                <input
                  v-model="product.status"
                  class="form-control"
                  type="number"
                  placeholder="Trạng thái sản phẩm"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Danh mục</label>
                <select v-model="product.category_id" class="form-control">
                  <option value="1">Điện thoại</option>
                  <option value="2">Laptop</option>
                  <option value="5">Máy chụp ảnh</option>
                  <option value="4">Router</option>
                  <option value="6">Máy tính bảng</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Số lượng sản phẩm</label>
                <input
                  v-model="product.quantity"
                  class="form-control"
                  type="number"
                  placeholder="Số lượng sản phẩm"
                />
              </div>
              <div class="col-md-12">
                <label class="form-label">Chọn ảnh minh họa</label>
                <input
                  v-model="product.urlImg"
                  class="form-control"
                  type="text"
                  placeholder="Link ảnh minh họa"
                />
              </div>
              <div class="col-md-12">
                <label class="form-label">Mô tả sản phẩm</label>
                <textarea v-model="product.des" class="form-control"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-success" type="submit">{{ isEditing ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <button
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#example"
>
  {{ isEditing ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}
</button>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { mapActions } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap để mở modal

export default {
  props: {
    productToEdit: Object, 
  },
  emits: ["resetEdit"], // 👈 Thêm dòng này
  data() {
    return {
      isEditing: false,
      modalInstance: null,
      product: {
        id: "",
        name: "",
        price: "",
        status:"",
        discount: "",
        category_id: "1",
        quantity: "",
        urlImg: "",
        des: "",
      },
    };
  },
  watch: {
    productToEdit(newVal) {
      if (newVal) {
        this.product = { ...newVal };
        this.isEditing = true;
        this.showModal();
      }
    },
  },
  computed: {
    priceSales() {
      const price = Number(this.product.price) || 0;
      const discount = Number(this.product.discount) || 0;
      return discount >= 0 && discount <= 100 ? price - (price * discount) / 100 : "Lỗi giảm giá";
    },
  },
  methods: {
    ...mapActions(["addProduct", "updateProduct"]),

    async saveProduct() {
      try {
        if (this.isEditing) {
          await this.updateProduct(this.product);
          console.log(JSON.stringify(this.product, null, 2));

          
          alert("Sản phẩm đã được cập nhật!");
        } else {
          await this.addProduct(this.product);
          alert("Sản phẩm đã được thêm!");
        }
        this.closeModal();
        this.$emit("resetEdit");
        window.location.reload(); 
      } catch (error) {
        console.error("Lỗi:", error);
        alert("Thao tác thất bại!");
      }
    },

    showModal() {
      if (!this.modalInstance) {
        this.modalInstance = new bootstrap.Modal(document.getElementById("example"));
      }
      this.modalInstance.show();
    },

    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
      this.resetForm();
    },

    resetForm() {
      this.isEditing = false;
      this.product = {
        id: "", name: "", price: "", discount: "", category_id: "1",
        quantity: "", urlImg: "", des: "",
      };
    }
  },
};

</script>

<style scoped>
.form-label {
  text-align: left;
  display: block;
}
.modal-content {
  max-width: 90%; /* Đảm bảo modal không quá nhỏ */
  width: auto;
}
</style>
