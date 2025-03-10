<template>
  <div class="container-fluid" style="text-align: left; border: 1px solid black; border-radius: 20px;">
    <div class="col-md-12">
      <div v-for="items in productFeedbacks" :key="items.id" style="border-bottom: 1px solid black;">

        <p>Đánh giá: {{ items.star }}⭐</p>
        <p>Mô tả đánh giá :{{ items.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["productId"],
  computed: {
    ...mapGetters({ allFeedbacks: "allFeedbacks" }),
    productFeedbacks() {
      return this.allFeedbacks.filter(
        (item) => item.product_id == this.productId
      );
    },
  },

  methods: {
    ...mapActions(["fetchFeedbacks"]),
    loadFeedback() {
      let id = this.$route.params.id;
      if (this.allFeedbacks && this.allFeedbacks.length > 0) {
        this.feedback =
          this.allFeedbacks.filter((item) => item.product_id === id) || {};
      }
    },
  },
  async beforeMount() {
    if (!this.allFeedbacks || this.allFeedbacks.length === 0) {
      await this.fetchFeedbacks();
    }
    this.loadFeedback();
  },
};
</script>

<style>
</style>