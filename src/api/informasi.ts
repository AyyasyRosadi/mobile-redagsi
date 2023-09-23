import api from "./http";

export const ApiInformation = {
    getInformation : ()=>{
        return api.get(`/ptk/informasi-ptk/mobile`)
    }
}