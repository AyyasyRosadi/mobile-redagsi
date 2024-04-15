import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { getBulanPenggajian } from '../../store/actions/gaji'

export default function useGetBulanPenggajian():void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        dispatch(getBulanPenggajian())
    }, [])
}
