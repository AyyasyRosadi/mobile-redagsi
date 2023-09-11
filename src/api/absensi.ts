import api from "./http";

export const ApiAbsensi = {
    getAbsensi : (nupy:string) =>{
        return api.get(`/ptk/mobile/absensi/${nupy}`)
    },
    postAbsensi : (data:any) =>{
        return api.post(`/ptk/mobile/absensi`,data)
    }
}
