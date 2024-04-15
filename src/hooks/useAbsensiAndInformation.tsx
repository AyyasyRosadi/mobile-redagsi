import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../store'
import { authActions } from '../store/slices/auth'
import useRemoveStorage from './useRemoveStorage'
import { absensiActions } from '../store/slices/absensi'
import { useEffect } from 'react'
import { getAllAbsensi } from '../store/actions/absensi'
import { getAllInformation } from '../store/actions/informasi'
import useGetStorage from './useGetStorage'
import { ParamListBase, RouteProp } from '@react-navigation/native'

export default function useAbsensiAndInformation(route: RouteProp<{ params: { status: boolean } }>, navigation: any, danger: boolean, username: string): void {
    const dispatch = useDispatch<AppThunkDispatch>()
    const { allAbsensi } = useSelector((state: RootState) => state.absensi)
    const setAuthenticationStorage = async () => {
        const data = await useGetStorage('absensi')
        if (data && (JSON.parse(data) !== null || Object.keys(JSON.parse(data)).length !== 0)) {
            dispatch(authActions.setAuth(JSON.parse(data)))
        }
    }
    const checkStorage = async () => {
        if (route?.params?.status || allAbsensi?.msg === "Invalid token") {
            await useRemoveStorage('absensi')
            dispatch(authActions.clearAuth())
            dispatch(absensiActions.clearAbsensi())
            dispatch(absensiActions.clearRiwayat())
        }
        else {
            await setAuthenticationStorage()
        }
    }
    useEffect(() => {
        const focusHandler = navigation.addListener("focus", async () => {
            checkStorage()
            if (!danger && username !== "") {
                dispatch(getAllAbsensi(username))
                dispatch(getAllInformation())
            }
        })
        return focusHandler
    }, [navigation, route, username, danger])
}
