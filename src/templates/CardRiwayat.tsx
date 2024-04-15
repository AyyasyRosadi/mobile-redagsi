import { View } from 'react-native'
import React, { ReactNode } from 'react'
import FieldTitle from '../components/custom/FieldTitle'

type CardRiwayatAttributes = {
    tanggal: string
    masuk: string
    pulang: string
}

export default function CardRiwayat({ masuk, pulang, tanggal }: CardRiwayatAttributes):ReactNode {
    return (
        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4 flex flex-row my-1'>
            <View className='w-[80%]'>
                <FieldTitle title='Tanggal' value={tanggal} />
                <FieldTitle title='Masuk' value={masuk} />
                <FieldTitle title='Pulang' value={pulang} />
            </View>
        </View>
    )
}