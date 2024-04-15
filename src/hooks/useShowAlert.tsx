import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '../store'

export default function useShowAlert(status: string, action):boolean {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        if (status === "SUCCES" || status === "ERROR") {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
                dispatch(action)
            }, 2000)
        }
    }, [status])
    return showAlert
}
