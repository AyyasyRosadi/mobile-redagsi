import api from "./http";
import { PostLogin } from "../type";

export const ApiAuth = {
    isLogin: (data: PostLogin) => {
        return api.post(`/login`, data)
    },
    isLogout: () => {
        return api.get(`/logout`)
    }
}