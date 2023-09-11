import { View, Text } from 'react-native'
import React from 'react'

type TField = {
    title: string,
    value: string | number
    id? : number
    list? : boolean
}

export default function FieldGaji({ title, value,id,list }: TField) {
    return (
        <View key={id} className='flex flex-row mb-1'>
            <Text className='w-[3%]'>{list ? "-" : ""}</Text>
            <Text className='w-[45%] uppercase'>{title}</Text>
            <Text className='w-[3%]'>:</Text>
            <Text className='w-[49%] uppercase'>{value}</Text>
        </View>
    )
}