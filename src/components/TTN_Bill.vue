<template>
  <div class="container mt-4">
    <h2 class="text-center text-primary mb-4">Danh sách hóa đơn</h2>

    <!-- Kiểm tra nếu không có hóa đơn -->
    <div v-if="allBills.length === 0" class="text-center text-danger fs-4">
      Không có hóa đơn nào!
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover table-bordered text-center">
        <thead class="table-dark">
          <tr>
            <th>Mã hóa đơn</th>
            <th>Phương thức thanh toán</th>
            <th>Ngày mua</th>
            <th>Tên sản phẩm</th>
            <th>Hình ảnh</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th>Đánh giá</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in allBills" :key="bill._id">
            <td class="align-middle">{{ bill._id }}</td>
            <td class="align-middle">
              <span
                class="badge"
                :class="bill.method_payment ? 'bg-success' : 'bg-warning'"
              >
                {{ bill.method_payment ? "Tiền mặt" : "Chuyển khoản" }}
              </span>
            </td>
            <td class="align-middle">
              {{ formatDateTime(bill.create_bill) }}
            </td>
            <td class="align-middle">
              <ul class="list-unstyled m-0">
                <li v-for="item in bill.allItems" :key="item.product_id">
                  {{ item.name }}
                </li>
              </ul>
            </td>
            <td class="align-middle">
              <ul class="list-unstyled m-0">
                <li v-for="item in bill.allItems" :key="item.product_id">
                  <img
                    :src="item.urlImg"
                    class="img-thumbnail"
                    style="width: 80px; height: 80px; object-fit: cover"
                    alt="Hình ảnh"
                  />
                </li>
              </ul>
            </td>
            <td class="align-middle">
              <ul class="list-unstyled m-0">
                <li v-for="item in bill.allItems" :key="item.product_id">
                  {{ item.quantity }}
                </li>
              </ul>
            </td>
            <td class="align-middle text-danger fw-bold">
              {{ formatCurrency(bill.totalPrice) }}
            </td>
            <td class="align-middle">
              <ul class="list-unstyled m-0">
                <li v-for="item in bill.allItems" :key="item.product_id">
                  <button
                    class="btn w-100"
                    style="border: 1px white solid"
                    :class="bill.feedback ? 'btn-secondary' : 'btn-primary'"
                    :disabled="bill.feedback"
                    @click="openReviewModal(item.product_id, bill)"
                  >
                    {{
                      bill.feedback
                        ? "Đã đánh giá sản phẩm"
                        : `Đánh giá ${item.name}`
                    }}
                  </button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal đánh giá sản phẩm -->
    <div v-if="showReviewModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="text-center text-success">Đánh giá sản phẩm</h3>
        <label>Số sao (1-5):</label>
        <input
          type="number"
          v-model="reviewData.star"
          min="1"
          max="5"
          class="form-control"
        />

        <label>Bình luận:</label>
        <textarea v-model="reviewData.comment" class="form-control"></textarea>

        <div class="modal-footer">
          <button class="btn btn-success" @click="submitReview">
            Gửi đánh giá
          </button>
          <button class="btn btn-secondary" @click="showReviewModal = false">
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      showReviewModal: false,
      reviewData: {
        star: 5,
        comment: "",
        product_id: "",
        account_id: this.$route.params.id,
      },
    };
  },
  computed: {
    ...mapGetters({
      allBills: "allBills",
    }),
  },
  methods: {
    ...mapActions({
      fetchBills: "fetchBills",
      addFeedback: "addFeedback",
      updateBillFeedback: "updateBillFeedback",
    }),
    formatDateTime(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    openReviewModal(product_id, bill) {
      this.reviewData.product_id = product_id;
      this.reviewData.bill = bill; // Lưu lại hóa đơn đang đánh giá
      this.showReviewModal = true;
    },
    async submitReview() {
      if (
        !this.reviewData.comment ||
        this.reviewData.star < 1 ||
        this.reviewData.star > 5
      ) {
        alert("Vui lòng nhập số sao từ 1-5 và bình luận!");
        return;
      }
      try {
        await this.addFeedback(this.reviewData);
        alert("Đánh giá thành công!");

        // Cập nhật trạng thái feedback của bill
        this.reviewData.bill.feedback = true;
        await this.updateBillFeedback({
          bill_id: this.reviewData.bill._id,
          feedback: true,
        });

        // Đóng modal và reset dữ liệu
        this.showReviewModal = false;
        this.reviewData.comment = "";
      } catch (error) {
        console.error("Lỗi đánh giá:", error);
        alert("Gửi đánh giá thất bại!");
      }
    },
  },
  async mounted() {
    await this.fetchBills(this.$route.params.id);
    if (performance.navigation.type === 1) {
      return;
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
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 40%;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>