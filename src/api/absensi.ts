import api from "./http";
import { PostAbsensi, RiwayatAbsensi } from "./interfaces";

export const ApiAbsensi = {
    getAbsensi : (nupy:string) =>{
        return api.get(`/ptk/mobile/absensi/${nupy}`)
    },
    postAbsensi : (data:PostAbsensi) =>{
        return api.post(`/ptk/mobile/absensi`,data)
    },
    getRiwayat : (data:RiwayatAbsensi)=>{
        return api.post(`/ptk/mobile/absensi/filter/absensi`,data)
    }
}
