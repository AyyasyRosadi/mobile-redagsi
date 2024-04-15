import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import DateTimePicker from '@react-native-community/datetimepicker';
import CardRiwayat from '../templates/CardRiwayat';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Loader from '../templates/Loader';
import { Platform } from 'react-native';
import useGetRiwayatAbsensi from '../hooks/dispatch/useGetRiwayatAbsensi';
import useClearRiwayatAbsensi from '../hooks/dispatch/useClearRiwayatAbsensi';
import { formatDateMonth, formatFullDate, formatTime } from '../helper/time';


export default function Riwayat({ navigation }):ReactNode {
    const { username } = useSelector((state: RootState) => state.auth)
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [showPickerFrom, setShowPickerFrom] = useState(false)
    const [showPickerTo, setShowPickerTo] = useState(false)
    const [filter, setFilter] = useState(false)
    const { riwayatAbsensi, loadingAbsensi } = useSelector((state: RootState) => state.absensi)

    const changeFromDate = (_, selectedDate) => {
        setShowPickerFrom(false)
        setFromDate(selectedDate)
    }
    const changeToDate = (_, selectedDate) => {
        setShowPickerTo(false)
        setToDate(selectedDate)
    }
    useGetRiwayatAbsensi(fromDate, toDate, filter, username, setFilter)
    useClearRiwayatAbsensi(navigation)
    return (
        <SafeAreaView>
            <Loader show={loadingAbsensi} />
            <StatusBar backgroundColor="#ffff" />
            <View className={`h-screen bg-slate-50 w-screen ${Platform?.OS === "android" ? "mt-[2vh]" : ""}`}>
                <ScrollView>
                    <View className='py-[10%] flex flex-col space-y-[3%] mb-[9vh]'>
                        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                            <View className='flex flex-row justify-between'>
                                <View onTouchStart={() => setShowPickerFrom(true)} className='border border-sky-700 rounded-lg p-2 w-[49%]'>
                                    <Text className='text-sky-700'>Dari:</Text>
                                    <Text className='text-sky-700'>{formatDateMonth(fromDate)}</Text>
                                </View>
                                <View onTouchStart={() => setShowPickerTo(true)} className='border border-sky-700 rounded-lg p-2 w-[49%]'>
                                    <Text className='text-sky-700'>Sampai:</Text>
                                    <Text className='text-sky-700'>{formatDateMonth(toDate)}</Text>
                                </View>
                            </View>
                            <View className='mt-2 border rounded-lg border-sky-700 p-2' onTouchStart={() => setFilter(true)}>
                                <Text className='text-center'>Filter</Text>
                            </View>
                            {showPickerFrom ?
                                <DateTimePicker id='fromDate' value={fromDate} mode="date" onChange={changeFromDate} />
                                :
                                <></>
                            }
                            {showPickerTo ?
                                <DateTimePicker id='toDate' value={toDate} mode='date' onChange={changeToDate} />
                                :
                                <></>
                            }
                        </View>
                        <ScrollView className='bg-ye '>
                            {riwayatAbsensi &&
                                Object.keys(riwayatAbsensi).length !== 0 ?
                                    riwayatAbsensi?.absensi_mobile_users!.map((d, i: number) => (
                                        <CardRiwayat key={i} tanggal={formatFullDate(d.start!)} masuk={d.start ? formatTime(d.start) : "Tidak absen datang"} pulang={d.end ? formatTime(d.end) : "Tidak absen pulang"} />
                                    ))
                                    :
                                    <></>
                            }
                        </ScrollView>
                    </View>
                </ScrollView>
                <Menu index={2} />
            </View>
        </SafeAreaView >
    )
}