<template>
    <div class="wrapper">
      <div class="row">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Mã hóa đơn</th>
              <th>Mã khách hàng</th>
              <th>Thông tin khách hàng</th>
              <th>Ngày lập</th>
              <th>Tổng tiền</th>
              <th>Giảm giá</th>
              <th>Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in allBills" :key="items.id">
              <td>{{ items._id }}</td>
              <td>{{ items.account_id }}</td>
              <td>
                Địa chỉ: {{ items.address }},<br />Số điện thoại: {{ items.phone }}
              </td>
              <td>{{ formatDateTime(items.create_bill) }}</td>
              <td>{{ formatCurrency(items.totalPrice) }}</td>
              <td>{{ formatCurrency(items.discount) }}</td>
              <td>
                <button @click="showDetails(items)">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal chi tiết sản phẩm -->
      <div v-if="selectedBill" class="modal-overlay">
        <div class="modal-content">
          <h2>Chi tiết hóa đơn</h2>
          <p><strong>Mã hóa đơn:</strong> {{ selectedBill._id }}</p>
          <p><strong>Mã khách hàng:</strong> {{ selectedBill.account_id }}</p>
          <p><strong>Địa chỉ:</strong> {{ selectedBill.address }}</p>
          <p><strong>Số điện thoại:</strong> {{ selectedBill.phone }}</p>
          <p><strong>Ngày lập:</strong> {{ formatDateTime(selectedBill.create_bill) }}</p>
          <p><strong>Phương thức thanh toán:</strong> {{ selectedBill.method_payment ? "Chuyển khoản" : "Tiền mặt" }}</p>
          <h3>Sản phẩm đã mua</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in selectedBill.allItems" :key="product.product_id">
                <td><img :src="product.urlImg" alt="Sản phẩm" class="product-img" /></td>
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ formatCurrency(product.price) }}</td>
              </tr>
            </tbody>
          </table>
          <button @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        selectedBill: null,
      };
    },
    computed: {
      ...mapGetters({
        allBills: "allBills",
      }),
    },
    methods: {
      ...mapActions({
        fetchAllBills: "fetchAllBills",
      }),
      formatCurrency(value) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
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
      showDetails(bill) {
        this.selectedBill = bill;
      },
      closeModal() {
        this.selectedBill = null;
      },
    },
    mounted() {
      this.fetchAllBills();
    },
  };
  </script>
  
  <style>
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 50%;
    text-align: center;
  }
  
  .product-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background: #0056b3;
  }
  .modal-content p {
  text-align: left;
  margin: 5px 0;
}

  </style>
  