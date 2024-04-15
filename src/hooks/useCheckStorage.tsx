import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../store'
import { authActions } from '../store/slices/auth'
import useRemoveStorage from './useRemoveStorage'
import { absensiActions } from '../store/slices/absensi'
import useGetStorage from './useGetStorage'
import api from '../api/http'

export default function useCheckStorage(route: { params: { status: boolean } }): void {
    const dispatch = useDispatch<AppThunkDispatch>()
    const { allAbsensi } = useSelector((state: RootState) => state.absensi)
    const setAuthenticationStorage = async () => {
        const data = await useGetStorage('absensi')
        if (data && (JSON.parse(data) !== null || Object.keys(JSON.parse(data)).length !== 0)) {
            dispatch(authActions.setAuth(JSON.parse(data)))
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(data).token}`;
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
        checkStorage()
    }, [allAbsensi])
}
