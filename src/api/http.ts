import axios from "axios"

const api = axios.create({
    baseURL:"http://192.168.1.14:9999"
    // baseURL:"http://192.168.1.20:9999"
})


export default api