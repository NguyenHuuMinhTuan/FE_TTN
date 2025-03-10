<template>
  <div class="container-fluid bg-light" style="border: 1px solid black;">
    <div class="row">
        <div class="col-sm-4">
            <img :src=category.urlImg class="img-fluid" alt="Hình ảnh minh họa">
        </div>
        <div class="col-sm-8" style="text-align: left;">
            <p>Tên sản phẩm: {{ category.name }}</p>
            <p>{{ category.price_sales }}₫ </p>
             <a href="#">Xem chi tiết</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['category'],
    data(){
        return{

        }
    }

}
</script>

<style>

</style>