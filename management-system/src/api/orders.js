import req from "../utils/request"
export const orderList = params => req.get("/orders/orderList",params)
export const orderdetail = params => req.get("/orders/orderdetail",params)

/* 订单报表统计 */
export const ordertotal = params => req.get("/orders/ordertotal",params)

/* 首页报表接口 */
export const indexcharts = params => req.get("/orders/indexcharts",params)
