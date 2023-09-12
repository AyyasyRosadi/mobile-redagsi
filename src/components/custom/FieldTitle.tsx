import { View, Text } from 'react-native'
import React from 'react'

type TField = {
    title : string,
    value : string | number
}

export default function FieldTitle({title,value}:TField) {
  return (
    <View className='flex flex-row mb-1'>
    <Text className='w-[23%] uppercase my-auto'>{title}</Text>
    <Text className='w-[5%] my-auto'>:</Text>
    <Text className='w-[57%] uppercase my-auto'>{value}</Text>
  </View>
)
}