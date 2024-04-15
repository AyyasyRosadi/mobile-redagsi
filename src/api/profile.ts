import { PostResetPassword } from "../type";
import api from "./http";


export const ApiProfile = {
    get: (nupy: string) => {
        return api.get(`/ptk/mobile/absensi/profile/${nupy}`)
    },
    putPassword: (data: PostResetPassword) => {
        return api.put(`/user`, data)
    }
}