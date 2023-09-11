import api from "./http";

export const ApiGaji = {
    get : (nupy:string,bulan:string)=>{
        return api.get(`/ptk/mobile/absensi/gaji/${nupy}/${bulan}`)
    },
    getBulan : ()=>{
        return api.get(`/cakepout/list-penggajian/approve`)
    }
}