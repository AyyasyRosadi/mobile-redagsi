import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { getAllAbsensi } from '../../store/actions/absensi'

export default function useGetAbsensi(danger: boolean, username: string, hasAbsen: string):void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        if (!danger && username && username !== "") {
            dispatch(getAllAbsensi(username))
        }
    }, [danger, hasAbsen, username])
}
