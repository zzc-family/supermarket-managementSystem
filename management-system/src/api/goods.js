import req from "../utils/request";

export const upload = params => req.post("/goods/upload",params)
export const goodsadd = params => req.post("/goods/goodsadd",params)
export const goodslist = params => req.get("/goods/goodslist",params)
export const goodsdel = params => req.get("/goods/goodsdel",params)
export const goodsedit = params => req.post("/goods/goodsedit",params)