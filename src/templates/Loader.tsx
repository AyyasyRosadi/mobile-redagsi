import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'

type TLoader = {
    show: boolean
}

const Loader = ({ show }: TLoader) => {
    const [open, setOpen] = useState(show)
    useEffect(() => {
        setOpen(show)
    }, [show])
    return (
        <View className={`absolute bg-slate-200 top-0 opacity-50 h-[120vh] z-20 w-full flex justify-center items-center ${open ? "block" : "hidden"}`}>
            <ActivityIndicator size="large" color="#dbad17" style={{transform:[{scaleX:2},{scaleY:2}]}} />
        </View>
    )
}

export default Loader