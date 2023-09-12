import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import FieldTitle from '../components/custom/FieldTitle';
import CardRiwayat from '../templates/CardRiwayat';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../store';
import { getAllRiwayat } from '../store/actions/absensi';
import Loader from '../templates/Loader';
// import RNDateTimePicker from '@react-native-community/datetimepicker';


export default function Riwayat() {
    const dispatch = useDispatch<AppThunkDispatch>()
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [showPickerFrom, setShowPickerFrom] = useState(false)
    const [showPickerTo, setShowPickerTo] = useState(false)
    const { riwayatAbsensi,loadingAbsensi } = useSelector((state: RootState) => state.absensi)

    const changeFromDate = (event, selectedDate) => {
        setShowPickerFrom(false)
        setFromDate(selectedDate)
    }
    const changeToDate = (event, selectedDate) => {
        setShowPickerTo(false)
        setToDate(selectedDate)
    }
    const openFromDate = () => {
        setShowPickerFrom(true)
    }
    const openToDate = () => {
        setShowPickerTo(true)
    }
    useEffect(() => {
        dispatch(getAllRiwayat({ nupy: "19890720141156", start: moment(fromDate).format("YYYY-MM-DD"), end: moment(toDate).format("YYYY-MM-DD") }))
    }, [fromDate, toDate])
    return (
        <SafeAreaView>
            <Loader show={loadingAbsensi} />
            <StatusBar backgroundColor="#ffff" />
            <View className='h-[100vh] bg-slate-50 mt-[3vh]'>
                <ScrollView>
                    <View className='h-full py-[10%] flex flex-col space-y-[3%] mb-[9vh]'>
                        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                            <View className='flex flex-row justify-between'>
                                <View onTouchStart={openFromDate} className='border border-sky-700 rounded-lg p-2 w-[49%]'>
                                    <Text className='text-sky-700'>Dari:</Text>
                                    <Text className='text-sky-700'>{moment(fromDate).format("DD-MMMM")}</Text>
                                </View>
                                <View onTouchStart={openToDate} className='border border-sky-700 rounded-lg p-2 w-[49%]'>
                                    <Text className='text-sky-700'>Sampai:</Text>
                                    <Text className='text-sky-700'>{moment(toDate).format("DD-MMMM")}</Text>
                                </View>
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
                        {riwayatAbsensi !== null ?
                            Object.keys(riwayatAbsensi).length !== 0 ?
                                riwayatAbsensi?.absensi_mobile_users.map((d: any, i: any) => (
                                    <View key={i}>
                                        <CardRiwayat tanggal={moment(d.stat).format("DD MMMM YYYY")} masuk={moment(d.start).format("HH:mm:ss")} pulang={moment(d.end).format("HH:mm:ss")} />
                                    </View>
                                ))
                                :
                                <></>
                            :
                            <></>
                        }
                    </View>
                </ScrollView>
            </View>
            <Menu index={3} />
        </SafeAreaView >
    )
}