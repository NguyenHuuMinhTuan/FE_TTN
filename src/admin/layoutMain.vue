<template>
   <div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <sideBar/>
        </div>
        <div class="col-md-9">
            <router-view name="sidebar"/>
        </div>
    </div>
   </div>
</template>

<script>
import sideBar from './sideBar.vue';
export default {
components:{
    sideBar
}

}
</script>

<style>

</style>