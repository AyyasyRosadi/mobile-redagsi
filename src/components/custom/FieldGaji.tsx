import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

type FieldGajiAttributes = {
    title: string,
    value: string | number
    key?: number
    list?: boolean
}

export default function FieldGaji({ title, value, key, list }: FieldGajiAttributes):ReactNode {
    return (
        <View key={key} className='flex flex-row mb-1'>
            <Text className='w-[3%] my-auto'>{list ? "-" : ""}</Text>
            <Text className='w-[45%] my-auto uppercase'>{title}</Text>
            <Text className='w-[3%] my-auto'>:</Text>
            <Text className='w-[49%] uppercase my-auto'>{value}</Text>
        </View>
    )
}