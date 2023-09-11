import { View, Text } from 'react-native'
import React from 'react'

type TField = {
    title : string,
    value : string | number
}

export default function FieldTitle({title,value}:TField) {
  return (
    <View className='flex flex-row mb-1'>
    <Text className='w-[20%] uppercase'>{title}</Text>
    <Text className='w-[5%]'>:</Text>
    <Text className='w-[60%] uppercase'>{value}</Text>
  </View>
)
}