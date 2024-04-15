import { Dispatch, SetStateAction, useEffect } from 'react'
import { AppThunkDispatch } from '../../store'
import { useDispatch } from 'react-redux'
import { gajiActions } from '../../store/slices/gaji'

export default function useClearGaji(navigation: {addListener:(trigger:string,func:()=>void)=>void}, setIndexBulan: Dispatch<SetStateAction<string>>):void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        const focusHandler = navigation.addListener("focus", async () => {
            setIndexBulan("")
            dispatch(gajiActions.clearGaji())
        })
        return focusHandler
    }, [navigation])
}
