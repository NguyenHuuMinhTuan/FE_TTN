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
import ManagerBIll from "@/admin/ManagerBIll.vue";
import ManagerCategory from "@/admin/ManagerCategory.vue";
import ManagerAccount from "@/admin/ManagerAccount.vue";
import ManagerRevenue from "@/admin/ManagerRevenue.vue";
import NotFound from "@/Process/NotFound.vue";
const routes = [
    {
        path: "/",
        name: "TTN_Home",
        component: TTN_Home, // <-- Thay vì components
    },
    {
        path: "/admin/BillManager",
        name: "ManagerBIll",
        component: ManagerBIll, // <-- Thay vì components
    },
    {
        path: "/admin/ManagerRevenue",
        name: "ManagerRevenue",
        component: ManagerRevenue, // <-- Thay vì components
    },
    {
        path: "/admin/AccountManager",
        name: "ManagerAccount",
        component: ManagerAccount, // <-- Thay vì components
    },
    {
        path: "/admin/CategoryManager",
        name: "ManagerCategory",
        component: ManagerCategory, // <-- Thay vì components
    },
    {
        path: "/bill/:id",
        name: "TTN_Bill",
        component: TTN_Bill,
    },
    {
        path: "/register",
        name: "TTN_Register",
        component: TTN_Register,
    },
    {
        path: "/voucher",
        name: "TTN_Voucher",
        component: TTN_Voucher,
    },
    {
        path: "/cart/:id",
        name: "TTN_Cart",
        component: TTN_Cart,
    },
    {
        path: "/auth/login",
        name: "TTN_Login",
        component: TTN_Login,
    },
    {
        path: "/ADMINISTRATOR",
        name: "layoutMain",
        component: layoutMain,
    },
    {
        path: "/admin/ManagerProduct",
        name: "ManagerProduct",
        component: ManagerProduct,
    },
    {
        path: "/detailProduct/:id",
        name: "TTN_detailProduct",
        component: TTN_detailProduct,
    },
    {
        path: "/product",
        name: "TTN_Product",
        component: TTN_Product,
    },
    // Route 404 phải để cuối
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router