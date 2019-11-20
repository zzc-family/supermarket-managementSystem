import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: () => import("../views/login.vue")
    },
    {
        path: "/home",
        component: () => import("../views/home.vue"),
        children: [
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/personalInfro', title: '个人中心' }
                    ]
                },
                path: "/home/personalInfro",
                component: () => import("../views/home/personalInfro.vue")
            },
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' }
                    ]
                },
                path: "/home/index",
                component: () => import("../views/home/index.vue")
            },
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/order', title: '订单管理' }
                    ]
                },
                path: "/home/order",
                component: () => import("../views/order/order.vue")
            }, {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/order/editOrder', title: '订单详情' }
                    ]
                },
                path: "/home/order/editOrder",
                component: () => import("../views/order/editOrder.vue")
            },
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/products/productList', title: '商品管理' },
                        { path: '/home/products/addProducts', title: '商品添加' },
                    ]
                },
                path: "/home/products/addProducts",
                component: () => import("../views/home/products/addProduct.vue")
            },
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/products/productList', title: '商品管理' },
                        { path: '/home/products/productList', title: '商品列表' },
                    ]
                },
                path: "/home/products/productList",
                component: () => import("../views/home/products/productsList.vue")
            },{
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/products/productList', title: '商品管理' },
                        { path: '/home/products/productEdit', title: '商品编辑' },
                    ]
                },
                path: "/home/products/productEdit",
                component: () => import("../views/home/products/editProduct.vue")
            },
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/merchant', title: '店铺管理' }
                    ]
                },
                path: "/home/merchant",
                component: () => import("../views/home/merchant.vue")
            },
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/account/accountList', title: '账号管理' },
                        { path: '/home/account/accountList', title: '账号列表' },
                    ]
                },
                path: "/home/account/accountList",
                component: () => import("../views/home/account/accountList.vue")

            }, {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/account/accountList', title: '账号管理' },
                        { path: '/home/account/accountAdd', title: '账号添加' },
                    ]
                },
                path: "/home/account/accountAdd",
                component: () => import("../views/home/account/accountAdd.vue")

            }, {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/account/accountList', title: '账号管理' },
                        { path: '/home/account/revisePwd', title: '密码修改' },
                    ]
                },
                path: "/home/account/revisePwd",
                component: () => import("../views/home/account/revisePwd.vue")

            },
            {    meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/sale/productsTotal', title: '销售统计' },
                        { path: '/home/sale/orderTotal', title: '订单统计' },
                    ]
                },
                path: "/home/sale/orderTotal",
                component: () => import("../views/home/sale/orderTotal.vue")
            },
            {
                meta: {
                    breadArr: [
                        { path: '/home', title: '首页' },
                        { path: '/home/sale/productsTotal', title: '销售统计' },
                        { path: '/home/sale/productsTotal', title: '商品统计' },
                    ]
                },
                path: "/home/sale/productsTotal",
                component: () => import("../views/home/sale/productsTotal.vue")
            }
        ]
    }, {
        path: "/login",
        component: () => import("../views/login.vue")
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
