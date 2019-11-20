import req from "../utils/request"
export const addAccount = params => req.post("/account/accountAdd",params)
export const listAccount = params => req.get("/account/accountList",params)
export const delAccount = params => req.get("/account/accountdel",params)
export const accountbatchdel = params => req.get("/account/accountbatchdel",params)
export const accountedit = params => req.post("/account/accountedit",params)
export const checkLogin = params => req.post("/account/checkLogin",params)
export const checkoldpwd = params => req.get("/account/checkoldpwd",params)
export const passwordedit = params => req.post("/account/passwordedit",params)
export const accountinfo = params => req.get("/account/accountinfo",params)
export const avataredit = params => req.get("/account/avataredit",params)
export const upload = params => req.post("/account/upload",params)

