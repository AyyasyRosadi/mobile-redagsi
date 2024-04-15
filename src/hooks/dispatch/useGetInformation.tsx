import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { getAllInformation } from '../../store/actions/informasi'

export default function useGetInformation(danger: boolean, username: string, hasAbsen: string):void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        if (!danger && username && username !== "") {
            dispatch(getAllInformation())
        }
    }, [danger, hasAbsen, username])
}
