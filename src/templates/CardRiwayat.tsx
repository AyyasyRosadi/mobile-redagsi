import { View, Text, Image } from 'react-native'
import React from 'react'
import riwayat from "../assets/riwayat.png"
import FieldTitle from '../components/custom/FieldTitle'

type TCardRiwayat = {
    tanggal: string
    masuk: string
    pulang: string
}

export default function CardRiwayat({ masuk, pulang, tanggal }: TCardRiwayat) {
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