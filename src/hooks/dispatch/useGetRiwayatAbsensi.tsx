import { Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../../store'
import { getAllRiwayat } from '../../store/actions/absensi'
import { formatDate } from '../../helper/time'

export default function useGetRiwayatAbsensi(fromDate: Date, toDate: Date, filter: boolean, username: string, setFilter: Dispatch<SetStateAction<boolean>>):void {
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        if (fromDate && toDate && filter && username !== "") {
            dispatch(getAllRiwayat({ nupy: username, start: formatDate(fromDate), end: formatDate(toDate) }))
            setFilter(false)
        }
    }, [fromDate, toDate, username, filter])
}
