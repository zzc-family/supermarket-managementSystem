// 引入库
import axios from "axios"
import qs from "qs"

// 引入本地存储工具函数
import local from "@/utils/local";

// 设置默认请求的接口地址
axios.defaults.baseURL = "http://127.0.0.1:5000"

// 请求拦截器
axios.interceptors.request.use(config => {
    // 在请求发送出去之前 带上一些东西 config 是请求的配置对象，如果直接返回 就等于什么都不带
    // 所有的axios请求，在请求发送出去之前 带上token
    let token = localStorage.getItem('token')
    config.headers.Authorization = 'Bearer ' + token
    return config

}, error => Promise.reject(error)); // 请求错误

// 响应拦截器
axios.interceptors.response.use(response => {
        // response 就是后端响应回来的东西 如果你想做什么统一的处理，可以写着这里
        return response
    }, error => {
        return Promise.reject(error); // 响应错误处理
    }
);

export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params})
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    post(url,params = {}){
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then( res =>
                    resolve(res.data)
                )
                .catch( err =>
                    reject(err)
                )
        })
    }
}