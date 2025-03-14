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

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content" style="width: 90%;">
        <h3 style="color: green">Xác nhận đơn hàng</h3>
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
            <input type="text" v-model="phone" class="form-control" required />
            <label>Địa chỉ:</label>
            <input
              type="text"
              v-model="address"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-8">
            <h5>Sản phẩm trong đơn hàng</h5>
            <ul>
              <li v-for="item in allCarts" :key="item.product_id">
                {{ item.name }} - {{ item.quantity }} x
                {{ formatCurrency(item.price) }}
              </li>
            </ul>
            <h3 style="color: red">
              Tổng tiền: {{ formatCurrency(finalPrice) }}
            </h3>
            <h5>Phương thức thanh toán</h5>
            <select v-model.lazy="paymentMethod" class="form-control">
              <option value="cash">Tiền mặt</option>
              <option value="banking">Chuyển khoản</option>
            </select>
            <h5>Nhập mã giảm giá</h5>
            <input
              type="text"
              v-model="voucher"
              class="form-control"
              placeholder="Nhập mã voucher"
            />
            <button class="btn btn-primary mt-2" @click="applyVoucher">
              Áp dụng mã giảm giá
            </button>
            <p v-if="voucherError" style="color: red">{{ voucherError }}</p>
            <p v-if="voucherSuccess" style="color: green">
              {{ voucherSuccess }}
            </p>
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
      addBill: "addBill",
      clearCart: "clearCart",
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
    async confirmPayment() {
      if (!this.phone || !this.address) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      const newBill = {
        account_id: this.$route.params.id,
        address: this.address,
        phone: this.phone,
        create_bill: new Date(),
        allItems: this.allCarts,
        totalPrice: this.finalPrice,
        discount: this.discount, // Thêm discount vào đơn hàng
        voucher: this.voucher, // Lưu mã voucher đã sử dụng
        method_payment: this.paymentMethod === "cash" ? "cash" : "banking", 
      };
      try {
        await this.addBill(newBill);
        await this.clearCart(this.$route.params.id);
        alert("Thanh toán thành công!");
        this.showModal = false;
      } catch (error) {
        console.error("Lỗi thanh toán:", error);
        alert("Thanh toán thất bại!");
      }
    },
  },

  async mounted() {
    await this.fetchCarts(this.$route.params.id);
    await this.fetchVouchers();
    if (performance.navigation.type === 1) {
    return; // Tránh vòng lặp reload
  }
  window.location.reload();
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
  width: 90%;
  max-width: 1000px;
  height: auto; /* Để nội dung không bị giới hạn */
  max-height: 90vh; /* Đảm bảo modal không vượt quá màn hình */
  overflow-y: auto; /* Cho phép cuộn nếu nội dung quá dài */
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>