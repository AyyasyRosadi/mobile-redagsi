import axios, { InternalAxiosRequestConfig } from "axios"
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "../router/RootNavigation";

const api = axios.create({
    // baseURL:"http://192.168.1.14:9999"
    baseURL:"http://192.168.1.20:9999"
    // baseURL:"https://sipahamv2.ponpesabuhurairah.id"
})


let store;
export const injectStore = (_store) => {
    store = _store
}

api.interceptors.request.use((req:any) => {
    if (!req.url.includes("/login")) {
        req.headers = {
            Authorization: `Bearer ${store.getState().auth.token}`
        }
    }
    return req;
})
api.interceptors.response.use(
    (res) => {
        return res
    },
    async (err) => {
        if (err.response.status === 401) {
            navigationRef.current?.dispatch(
                CommonActions.navigate("Home", { status: true })
            )
        }
        return Promise.reject(err)
    }
)

export default api