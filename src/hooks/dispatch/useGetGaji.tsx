import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { getGaji } from '../../store/actions/gaji'

export default function useGetGaji(bulan: string, username: string): void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        if (bulan !== "" && username !== "") {
            dispatch(getGaji({ nupy: username, bulan: bulan }))
        }
    }, [bulan, username])
}
