<template>
  <div class="branches">
    <h2 class="title">Hệ Thống Cửa Hàng TTN</h2>
    <div class="branch-list">
      <div v-for="(branch, index) in branches" :key="index" class="branch">
        <img :src="branch.image" :alt="branch.name" class="branch-image" />
        <h3 class="branch-name">{{ branch.name }}</h3>
        <p class="branch-address">{{ branch.address }}</p>
        <p class="branch-phone">📞 {{ branch.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      branches: [
        {
          name: "TTN Shop - Hà Nội",
          image: "https://th.bing.com/th/id/R.2c2b767a22868789102e2bcb432e0f0c?rik=PNQKgkECjLM8bw&pid=ImgRaw&r=0",
          address: "123 Đường ABC, Quận Cầu Giấy, Hà Nội",
          phone: "0123 456 789",
        },
        {
          name: "TTN Shop - TP.HCM",
          image: "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/28/ictnews_.jpeg",
          address: "456 Đường XYZ, Quận 1, TP. Hồ Chí Minh",
          phone: "0987 654 321",
        },
        {
          name: "TTN Shop - Đà Nẵng",
          image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/dia-chi-cua-hang/cellphones-da-nang-4.jpg",
          address: "789 Đường LMN, Quận Hải Châu, Đà Nẵng",
          phone: "0345 678 910",
        },
      ],
    };
  },
};
</script>

<style scoped>
.branches {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.branch-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.branch {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
}

.branch-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.branch-name {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.branch-address,
.branch-phone {
  font-size: 14px;
  color: #333;
}
</style>