<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered responsive">
          <thead>
            <tr>
              <th>Mã tài khoản</th>
              <th>Tên tài khoản</th>
              <th>Mật khẩu</th>
              <th>Email</th>
              <th>Loại tài khoản</th>
              <th>Hoạt động</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in allAccounts" :key="items.id">
              <td>{{ items.id }}</td>
              <td>{{ items.username }}</td>
              <td>{{ items.password }}</td>
              <td>{{ items.email }}</td>
              <td>{{ items.type_account }}</td>
              <td>
                <span
                  :class="
                    items.active.data == 1
                      ? 'btn btn-success'
                      : 'btn btn-danger'
                  "
                >
                  {{ items.active.data == 1 ? "Hoạt động" : "Ngưng hoạt động" }}
                </span>
              </td>

              <td class="d-flex">
                <!-- Nút xem chi tiết -->
                <button
                  class="btn btn-success me-2"
                  @click="openDetailModal(items)"
                >
                  <i class="fas fa-eye"></i>
                </button>

                <!-- Nút cập nhật -->
                <button
                  class="btn btn-warning me-2"
                  @click="openUpdateModal(items)"
                >
                  <i class="fas fa-sync-alt"></i>
                </button>

                <!-- Nút cập nhật trạng thái -->
                <button class="btn btn-danger" @click="toggleActive(items)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Chi Tiết -->
    <div v-if="showDetailModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Chi Tiết Tài Khoản</h3>
        <p><strong>ID:</strong> {{ selectedAccount.id }}</p>
        <p><strong>Username:</strong> {{ selectedAccount.username }}</p>
        <p><strong>Email:</strong> {{ selectedAccount.email }}</p>
        <p>
          <strong>Loại tài khoản:</strong> {{ selectedAccount.type_account }}
        </p>
        <p>
          <strong>Trạng thái:</strong>
          {{
            selectedAccount.active.data === 1 ? "Hoạt động" : "Ngưng hoạt động"
          }}
        </p>
        <button class="btn btn-secondary" @click="showDetailModal = false">
          Đóng
        </button>
      </div>
    </div>

    <!-- Modal Cập Nhật -->
    <div v-if="showUpdateModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Cập Nhật Tài Khoản</h3>
        <input
          v-model="selectedAccount.username"
          class="form-control mb-2"
          placeholder="Tên tài khoản"
          required
        />
        <input
          v-model="selectedAccount.password"
          class="form-control mb-2"
          placeholder="Mật khẩu"
          required
        />
        <input
          type="email"
          v-model="selectedAccount.email"
          class="form-control mb-2"
          aria-placeholder="Email"
          required
        />

        <button class="btn btn-primary" @click="updateAccount">Cập Nhật</button>
        <button class="btn btn-secondary" @click="showUpdateModal = false">
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      showDetailModal: false,
      showUpdateModal: false,
      selectedAccount: {},
    };
  },
  computed: {
    ...mapGetters({
      allAccounts: "allAccounts",
    }),
  },
  methods: {
    ...mapActions({
      fetchAccounts: "fetchAccounts",
      updateAccountById: "updateAccountById",
      updateActiveStatus: "updateActiveStatus",
    }),

    openDetailModal(account) {
      this.selectedAccount = { ...account };
      this.showDetailModal = true;
    },

    openUpdateModal(account) {
      this.selectedAccount = { ...account };
      this.showUpdateModal = true;
    },

    async updateAccount() {
      try {
        if (!this.selectedAccount.id) {
          Swal.fire("Lỗi!", "Không tìm thấy ID tài khoản!", "error");
          return;
        }

        const updatedData = {
          id: this.selectedAccount.id,
          newAccount: {
            username: this.selectedAccount.username,

            email: this.selectedAccount.email,
            password: this.selectedAccount.password,
          },
        };

        console.log(updatedData); // Kiểm tra xem object có đúng không

        await this.updateAccountById(updatedData); // ✅ Truyền đúng object vào action

        Swal.fire("Thành công!", "Tài khoản đã được cập nhật!", "success");
        this.showUpdateModal = false;
      } catch (error) {
        Swal.fire("Lỗi!", "Không thể cập nhật tài khoản!", "error");
      }
    },
    async toggleActive(account) {
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn thay đổi trạng thái tài khoản?"
      );
      if (isConfirmed) {
        try {
          await this.updateActiveStatus(account.id);
          Swal.fire(
            "Thành công!",
            "Trạng thái tài khoản đã được cập nhật!",
            "success"
          );
        } catch (error) {
          Swal.fire("Lỗi!", "Không thể cập nhật trạng thái!", "error");
        }
      }
    },
  },
  mounted() {
    this.fetchAccounts();
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
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
  