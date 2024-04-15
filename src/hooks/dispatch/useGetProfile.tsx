import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { getProfile } from '../../store/actions/profile'

export default function useGetProfile(navigation: {addListener:(trigger:string,func:()=>void)=>void}, username: string):void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        const focusHandler = navigation.addListener("focus", () => {
            if (username) {
                dispatch(getProfile(username))
            }
        })
        return focusHandler
    }, [navigation, username])
}
