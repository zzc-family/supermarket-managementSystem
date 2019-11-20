import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui"; // 引入elementUI JS
import "element-ui/lib/theme-chalk/index.css"; // 引入element.css
import "./assets/css/common.css"
import  "./assets/font/iconfont.css" // 引入字体图标
// 引入本地存储工具函数
import local from "@/utils/local";

//  组件传递参数 - 用户头像和修改头像
const bus = new Vue;
Vue.prototype.$bus = bus;

// 路由守卫（拦截所有路由 进入所有路由之前 必须先走路由守卫）
router.beforeEach((to, from, next) => {
  // 从本地存储获取token
    let token = window.localStorage.getItem("token");
    if (token){
        next()
    }else{
        if (to.path === "/login"){
            next()
        }else{
            next("/login")
        }
    }
})




Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
