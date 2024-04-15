import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { formatAndSubtractTime, formatDateTime, formatTime } from '../helper/time'

export default function useShowButtonAbsensi(time: Date):boolean {
    const { allAbsensi, loadingAbsensi } = useSelector((state: RootState) => state.absensi)
    const [showButton, setShowButton] = useState(false)
    useEffect(() => {
        if (Object.keys(allAbsensi).length !== 0) {
            if (allAbsensi.start) {
                if (formatDateTime(allAbsensi?.absen?.end) > formatDateTime(time)) {
                    setShowButton(true)
                }
                else {
                    setShowButton(false)
                }
            }
            else if (allAbsensi.end) {
                if (formatAndSubtractTime(allAbsensi?.absen?.end, "02:00:00") <= formatTime(time) && formatTime(time) <= formatTime(allAbsensi?.absen?.end)) {
                    setShowButton(true)
                }
                else {
                    setShowButton(false)
                }
            }
            else {
                setShowButton(false)
            }
        }
    }, [loadingAbsensi])
    return showButton
}
