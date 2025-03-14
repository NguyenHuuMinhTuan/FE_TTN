<template>
  <div class="container-fluid">
    <div class="row">
      <ul class="list-group">
        <router-link to="/admin/ManagerProduct">
          <li class="list-group-item">Quản lý sản phẩm</li>
        </router-link>
        <li class="list-group-item">Quản lý danh mục</li>
        <router-link to="/admin/AccountManager">
        <li class="list-group-item">Quản lý tài khoản</li>
        </router-link>
        <li class="list-group-item">Quản lý đánh giá</li>
        <router-link to="/admin/BillManager">
          <li class="list-group-item">Quản lý hóa đơn</li>
        </router-link>
        <router-link to="/admin/ManagerRevenue">
          <li class="list-group-item">Quản lý doanh thu</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>