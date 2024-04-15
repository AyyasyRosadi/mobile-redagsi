import axios from "axios"
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "../router/RootNavigation";

const api = axios.create({
    baseURL:"http://192.168.1.12:9999"
    // baseURL:"http://192.168.1.20:9999"
    // baseURL:"http://192.168.1.11:9999"
    // baseURL:"https://sipahamv2.ponpesabuhurairah.id"
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