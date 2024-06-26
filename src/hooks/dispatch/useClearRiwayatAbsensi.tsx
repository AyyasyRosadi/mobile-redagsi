import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { absensiActions } from '../../store/slices/absensi'

export default function useClearRiwayatAbsensi(navigation: {addListener:(trigger:string,func:()=>void)=>void}):void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        const focusHandler = navigation.addListener("focus", async () => {
            dispatch(absensiActions.clearRiwayat())
        })
        return focusHandler
    }, [navigation])
}
