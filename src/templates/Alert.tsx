import { View, Text } from 'react-native'
import React, { ReactNode, useEffect, useState } from 'react'
import { Modal } from 'react-native'

type AlertAttributes = {
    show: boolean
    msg: string
    close?: (e: boolean) => void
}

const Alert = ({ show, msg }: AlertAttributes):ReactNode => {
    const [open, setOpen] = useState(show)
    useEffect(() => {
        setOpen(show)
    }, [show])
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={open}
        >
            <View className="bg-sky-500 rounded-md mx-[5%] w-[60vw] my-3 opacity-100 flex justify-center p-3 shadow-md">
                <Text className='text-white text-left'>{msg}</Text>
            </View>
        </Modal>

    )
}

export default Alert