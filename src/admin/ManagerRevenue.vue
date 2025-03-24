<template>
  <div class="container">
    <h2 class="text-center my-4">Báo Cáo Doanh Thu</h2>

    <!-- Bảng Hóa Đơn -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Mã khách hàng</th>
          <th>Ngày mua</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="items in allBills" :key="items.id">
          <td>{{ items.account_id }}</td>
          <td>{{ formatDate(items.create_bill) }}</td>
          <td>{{ formatCurrency(items.totalPrice) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Tổng doanh thu -->
    <h4 class="text-right">Tổng doanh thu: {{ formatCurrency(totalRevenue) }}</h4>

    <!-- Grid chứa 4 biểu đồ -->
    
    <div class="row">
  <div class="col-6 chart-container">
    <canvas id="barChart"></canvas>
  </div>
  <div class="col-6 chart-container">
    <canvas id="lineChart"></canvas>
  </div>
  <div class="col-6 chart-container">
    <canvas id="pieChart"></canvas>
  </div>
  <div class="col-6 chart-container">
    <canvas id="horizontalBarChart"></canvas>
  </div>
</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      charts: {}, // Lưu danh sách biểu đồ
    };
  },
  computed: {
    ...mapGetters({
      allBills: "allBills",
    }),

    // ✅ Tính tổng doanh thu
    totalRevenue() {
      return this.allBills.reduce((sum, bill) => sum + (bill.totalPrice || 0), 0);
    },

    // ✅ Doanh thu theo tháng
    revenueByMonth() {
      const revenueMap = {};
      this.allBills.forEach((bill) => {
        const date = new Date(bill.create_bill);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

        if (!revenueMap[monthYear]) {
          revenueMap[monthYear] = 0;
        }
        revenueMap[monthYear] += bill.totalPrice || 0;
      });

      return revenueMap;
    },
  },
  methods: {
    ...mapActions({
      fetchAllBills: "fetchAllBills",
    }),

    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString("vi-VN");
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
    },

    // ✅ Hàm vẽ các biểu đồ
    drawCharts() {
      const chartConfigs = {
        barChart: { type: "bar", label: "Doanh thu theo tháng" },
        lineChart: { type: "line", label: "Xu hướng doanh thu theo tháng" },
        pieChart: { type: "pie", label: "Tỷ lệ doanh thu theo tháng" },
        horizontalBarChart: { type: "bar", label: "Doanh thu theo tháng (ngang)", indexAxis: "y" },
      };

      Object.entries(chartConfigs).forEach(([chartId, config]) => {
        const ctx = document.getElementById(chartId)?.getContext("2d");
        if (!ctx) return;

        if (this.charts[chartId]) {
          this.charts[chartId].destroy();
        }

        this.charts[chartId] = new Chart(ctx, {
          type: config.type,
          data: {
            labels: Object.keys(this.revenueByMonth),
            datasets: [
              {
                label: config.label,
                data: Object.values(this.revenueByMonth),
                backgroundColor: [
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => this.formatCurrency(value),
                },
              },
            },
            indexAxis: config.indexAxis || "x",
          },
        });
      });
    },
  },
  mounted() {
    this.fetchAllBills().then(() => {
      this.drawCharts();
    });
  },
};
</script>

<style>
.container {
  max-width: 1000px;
}
.chart-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

</style>
