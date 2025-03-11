import { createRouter, createWebHistory } from "vue-router";
import TTN_Home from "@/components/TTN_Home.vue";
import TTN_Product from "@/components/TTN_Product.vue";
import TTN_detailProduct from "@/components/TTN_detailProduct.vue";
import layoutMain from "@/admin/layoutMain.vue";
import ManagerProduct from "@/admin/products/ManagerProduct.vue";
import TTN_Login from "@/auth/TTN_Login.vue";
import TTN_Cart from "@/components/TTN_Cart.vue";
import TTN_Voucher from "@/components/TTN_Voucher.vue";
import TTN_Register from "@/auth/TTN_Register.vue";
import TTN_Bill from "@/components/TTN_Bill.vue";

const routes = [
    {
        path: "/",
        name: 'TTN_Home',
        components: { main: TTN_Home }
    },
    {
        path: "/bill/:id",
        name: 'TTN_Bill',
        components: { main: TTN_Bill }
    },
    {
        path: "/register",
        name: 'TTN_Register',
        components: { main: TTN_Register }
    },
    {
        path: "/voucher",
        name: 'TTN_Voucher',
        components: { main: TTN_Voucher }
    },
    {
        path: "/cart/:id",
        name: 'TTN_Cart',
        components: { main: TTN_Cart }
    },
    {
        path: "/auth/login",
        name: 'TTN_Login',
        components: { main: TTN_Login }
    },
    {
        path: "/ADMINISTRATOR",
        name: 'layoutMain',
        components: { main: layoutMain }
    },
    {
        path: "/ManagerProduct",
        name: 'ManagerProduct',
        components: {
            main:ManagerProduct,
    
        }
    },
    {
        path: "/detailProduct/:id",
        name: 'TTN_detailProduct',
        components: { main: TTN_detailProduct }
    },
    {
        path: "/product",
        name: 'TTN_Product',
        components: { main: TTN_Product }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router