<template>
  <div class="container-fluid">
    <table class="table table-bordered" v-if="allCarts.length != 0">
      <thead>
        <tr>
          <th>Mã sản phẩm</th>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Thành tiền</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in allCarts" :key="item.id">
          <td>{{ item.product_id }}</td>
          <td>
            <img
              :src="item.urlImg"
              class="img-fluid"
              style="height: 100px; width: 100px"
              alt="Hình ảnh"
            />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ formatCurrency(item.price) }}</td>
          <td>{{ formatCurrency(item.price * item.quantity) }}</td>

          <td>
            <button
              class="btn btn-danger"
              @click="deleteItemsInCart(item.account_id, item.product_id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5">Tổng tiền</th>
          <td>{{ formatCurrency(finalPrice) }}</td>
          <td>
            <button class="btn btn-warning" @click="showModal = true">
              Thanh toán
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
    <div v-else>
      <h1>Oooooppppppssss Vui lòng thêm sản phẩm vào giỏ hàng PLS</h1>
      <img
        class="img-fluid"
        src="https://th.bing.com/th/id/OIP.8pGAUy04iKUFHEKg7s8J9wHaFN?rs=1&pid=ImgDetMain"
        alt="404"
      />
    </div>

    <!-- Modal Thanh Toán -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3 style="color: green">Thông tin thanh toán</h3>
        <div class="row">
          <div class="col-md-4">
            <label>Username:</label>
            <input
              type="text"
              v-model="username"
              disabled
              class="form-control"
            />
            <label>Số điện thoại:</label>
            <input
              type="text"
              v-model="phone"
              class="form-control"
              placeholder="Nhập số điện thoại"
              required
            />
            <label>Địa chỉ:</label>
            <input
              type="text"
              v-model="address"
              class="form-control"
              placeholder="Nhập địa chỉ"
              required
            />
          </div>
          <div class="col-md-8">
            <h5 style="text-align: left">Sản phẩm trong đơn hàng</h5>
            <ul>
              <li v-for="item in allCarts" :key="item.id">
                {{ item.name }} - {{ item.quantity }} x
                {{ formatCurrency(item.price) }}
              </li>
            </ul>
            <h3 style="color: red">
              Tổng tiền: {{ formatCurrency(finalPrice) }}
            </h3>
            <h5 style="text-align: left">Phương thức thanh toán</h5>
            <div class="d-flex flex-column align-items-start">
              <label class="d-flex align-items-center">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="cash"
                  class="me-2"
                />
                Tiền mặt
              </label>
              <label class="d-flex align-items-center">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="banking"
                  class="me-2"
                />
                Chuyển khoản
              </label>
              <label class="d-flex align-items-center">
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="other"
                  class="me-2"
                />
                Khác
              </label>
            </div>

            <h5>Nhập Voucher</h5>
            <input
              type="text"
              v-model="voucher"
              class="form-control"
              placeholder="Nhập mã giảm giá"
              @input="applyVoucher"
            />
            <span v-if="voucherError" class="text-danger">{{
              voucherError
            }}</span>
            <span v-if="voucherSuccess" class="text-success">{{
              voucherSuccess
            }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="confirmPayment">
            Xác nhận
          </button>
          <button class="btn btn-secondary" @click="showModal = false">
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      showModal: false,
      username: JSON.parse(localStorage.getItem("currentUser"))?.username || "",
      phone: "",
      address: "",
      paymentMethod: "cash",
      voucher: "",
      discount: 0,
      voucherError: "",
      voucherSuccess: "",
    };
  },
  computed: {
    ...mapGetters({
      allCarts: "allCarts",
      allVoucher: "allVouchers",
    }),
    totalPrice() {
      return this.allCarts.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    finalPrice() {
      return this.totalPrice - this.discount;
    },
  },
  methods: {
    ...mapActions({
      fetchCarts: "fetchCarts",
      fetchVouchers: "fetchVouchers",
      deleteCart: "deleteCart",
    }),
    async deleteItemsInCart(account_id, product_id) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
      if (!confirmDelete) return;

      try {
        await this.deleteCart({ account_id, product_id });
        alert("Xóa sản phẩm thành công!");
        await this.fetchCarts(account_id);
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Xóa thất bại!");
      }
    },
    applyVoucher() {
      if (!this.allVoucher || this.allVoucher.length === 0) {
        this.voucherError = "Không tìm thấy danh sách voucher!";
        this.voucherSuccess = "";
        this.discount = 0;
        return;
      }

      const foundVoucher = this.allVoucher.find((v) => v.code === this.voucher);

      if (foundVoucher) {
        this.discount = this.totalPrice * (foundVoucher.discount / 100);
        this.voucherError = "";
        this.voucherSuccess = `Bạn được giảm ${foundVoucher.discount}%! 🎉`;
      } else {
        this.discount = 0;
        this.voucherError = "Mã voucher không tồn tại!";
        this.voucherSuccess = "";
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    confirmPayment() {
      alert(
        `Thanh toán thành công!\nTổng tiền: ${this.finalPrice}₫\nPhương thức: ${this.paymentMethod}`
      );
      this.showModal = false;
    },
  },
  async mounted() {
    await this.fetchCarts(this.$route.params.id);
    await this.fetchVouchers();
    
  },
};
</script>
  
  <style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>