import req from "../utils/request"
export const shopsInfro = params => req.get("/shop/shopinfo",params);
export const shopedit = params => req.post("/shop/shopedit",params);
