<template>
    <div class="container-fluid">
      <h3 class="text-center">🎉 Wellcome Voucher 🎉</h3>
      <div class="row">
        <div class="col-md-4" v-for="items in allVouchers" :key="items.id">
          <div class="voucher-card">
            <p><strong>Nội dung:</strong> {{ items.title }}</p>
            <p><strong>Thời gian bắt đầu:</strong> {{ items.Date_sale }}</p>
            <p><strong>Thời gian hết hạn:</strong> {{ items.Date_end }}</p>
            <p><strong>Giảm giá:</strong> {{ items.discount }}%</p>
            <p>
              <strong>Mã giảm giá:</strong>
              <span class="voucher-code">{{ items.code }}</span>
            </p>
            <button class="btn btn-success" @click="copyCode(items.code)">
              Lấy mã
            </button>
          </div>
        </div>
      </div>
      <!-- Thông báo sao chép -->
      <div v-if="copied" class="alert alert-success alert-custom">
        ✅ Mã "{{ copiedCode }}" đã được sao chép vào bộ nhớ!
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    data() {
      return {
        copied: false,
        copiedCode: "",
      };
    },
    computed: {
      ...mapGetters({
        allVouchers: "allVouchers",
      }),
    },
    methods: {
      ...mapActions({
        fetchVouchers: "fetchVouchers",
      }),
      async copyCode(code) {
        try {
          await navigator.clipboard.writeText(code);
          this.copied = true;
          this.copiedCode = code;
  
          // Ẩn thông báo sau 2 giây
          setTimeout(() => {
            this.copied = false;
          }, 2000);
        } catch (error) {
          console.error("Lỗi sao chép mã:", error);
        }
      },
    },
    async mounted() {
      console.log("fetchVouchers khi mounted:", this.allVouchers);
      if (!this.allVouchers || this.allVouchers.length === 0) {
        console.log("Đang gọi fetchVouchers...");
        await this.fetchVouchers();
      }
    },
  };
  </script>
  
  <style>
  .voucher-card {
    border: 2px solid #28a745;
    padding: 15px;
    border-radius: 10px;
    text-align: left;
    background: #f8f9fa;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
  }
  
  .voucher-code {
    font-weight: bold;
    color: #d9534f;
    background: #ffeeba;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  .alert-custom {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 5px;
  }
  </style>
  