import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TAlert } from './TypeTemplates'

const Alert = ({show,close,msg}:TAlert) => {
    const [open, setOpen] = useState(show)
    useEffect(() => {
        setOpen(show)
    }, [show])
    return (
        <View className={`absolute top-0 h-[100vh] z-50 w-full flex justify-end items-center ${open ? "block" : "hidden"}`}>
            <View className="bg-sky-500 rounded-md mx-2 w-[85vw] mb-[10vh] h-14 opacity-100 flex justify-center items-center shadow-md">
                <Text className='text-white'>{msg}</Text>
            </View>
        </View>
    )
}

export default Alert