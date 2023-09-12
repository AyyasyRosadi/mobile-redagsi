import api from "./http";
import { Login } from "./interfaces";

export const ApiAuth = {
    isLogin : (data:Login)=>{
        return api.post(`/login`,data)
    },
    isLogout : ()=>{
        return api.get(`/logout`)
    }
}