import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'

type FieldTitleAttributes = {
  title: string,
  value: string | number
}

export default function FieldTitle({ title, value }: FieldTitleAttributes):ReactNode {
  return (
    <View className='flex flex-row mb-1'>
      <Text className='w-[30%] uppercase my-auto'>{title}</Text>
      <Text className='w-[5%] my-auto'>:</Text>
      <Text className='w-[65%] uppercase my-auto'>{value}</Text>
    </View>
  )
}