<template>
    <el-aside class="home-nav" width="200px">
        <div class="nav-top"><p :style="logo" class="logo-logo"></p>沃尔玛商家中心</div>
        <el-menu  router active-text-color="#f00" unique-opened :default-active="path">
            <template v-for="(item,index) in menu">
            <el-menu-item v-if="!item.children" :index="item.path" :key="index">
                <i class="iconfont marRig10" :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.path" :key="index">
                <template slot="title"><i class="iconfont icon-shangpin marRig10"></i>{{ item.title }}</template>
                <el-menu-item v-for="(v,index) in item.children" :key="index" :index="v.path">{{v.title}}</el-menu-item>
            </el-submenu>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        data() {
            return {
                logo: {
                    backgroundImage: "url(" + require("../assets/imgs/us/supermake.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "inline-block",
                    float: "left",
                    width: "30px",
                    textAlign: 'center',
                    height: "30px",
                    marginLeft: "15px",
                    marginTop: "15px",
                    borderRadius: "50%"
                },
                menu:[
                    {path:"/home/index",icon:"icon-zhuye",title:"后台管理"},
                    {path:"/home/order",icon:"icon-74wodedingdan",title:"订单管理"},
                    {path:"3",icon:"icon-shangpin",title:"商品管理",
                        children:[
                            {path:"/home/products/productList",title:"商品列表"},
                            {path:"/home/products/addProducts",title:"添加商品"}
                        ]
                    },
                    {path:"/home/merchant",icon:"icon-ai204",title:"店铺管理"},
                    {path:"5",icon:"icon-yidongduanicon-",title:"账号管理",
                        children:[
                        {path:"/home/account/accountList",title:"账号列表"},
                        {path:"/home/account/accountAdd",title:"添加账号"},
                        {path:"/home/account/revisePwd",title:"修改密码"}
                        ]},
                    {path:"6",icon:"icon-gaiicon-",title:"销售统计",
                        children:[
                            {path:"/home/sale/productsTotal",title:"商品统计"},
                            {path:"/home/sale/orderTotal",title:"订单统计"}
                        ]
                    }
                ]
            }
        },
        computed:{
            path() {
                // 只要路径包含order 就返回"/home/ordermanage"，让订单管理一直高亮
                if (this.$route.path.includes("order")) {
                    return "/home/order";
                }
                if (this.$route.path === "/home/products/productEdit"){
                    return "/home/products/productList"
                }
                return this.$route.path;
            }

        }
    }
</script>

<style lang="less">
    .home-nav {
        background-color: #A6D7FF;
        width: 100%;
        .nav-top {
            background-color: #6697FF;
            height: 60px;
            padding: 0 16px;
            line-height: 60px;
            color: white;
            font-weight: bold;
            text-align: center;
            font-size: 16px;
        }
        .el-menu {
            box-sizing: border-box;
            border: none;
            width: 100%;
            background-color: #A6D7FF;
            .el-menu-item:hover{
                background-color: #8aaeff !important;
            }
            .el-submenu__title:hover {
                background-color: #8aaeff !important;
            }
            .el-submenu__icon-arrow{
                color: black;
                font-weight: bold;
            }
            a{
                display: inline-block;
                width: 100%;
            }
        }
    }

</style>