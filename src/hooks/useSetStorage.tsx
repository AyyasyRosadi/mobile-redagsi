import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useSetStorage():void {
    const { loadingAuth, token, username, nama } = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        const setStorage = async () => {
            try {
                if (token !== "" && username !== "") {
                    let data = { token: token, nupy: username, nama: nama }
                    await AsyncStorage.setItem("absensi", JSON.stringify(data))
                }
            }
            catch (err) {
                throw err
            }
        }
        setStorage()
    }, [loadingAuth,])
}
