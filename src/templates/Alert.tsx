import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TAlert } from './TypeTemplates'
import { Modal } from 'react-native'

const Alert = ({ show, close, msg }: TAlert) => {
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