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
import { absensiActions } from '../store/slices/absensi';
import "moment/locale/id"
// import RNDateTimePicker from '@react-native-community/datetimepicker';


export default function Riwayat({navigation}) {
    const dispatch = useDispatch<AppThunkDispatch>()
    const {username} = useSelector((state:RootState)=>state.auth)
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [showPickerFrom, setShowPickerFrom] = useState(false)
    const [showPickerTo, setShowPickerTo] = useState(false)
    const [filter,setFilter] = useState(false)
    const { riwayatAbsensi,loadingAbsensi } = useSelector((state: RootState) => state.absensi)

    const changeFromDate = (event, selectedDate) => {
        setShowPickerFrom(false)
        setFromDate(selectedDate)
    }
    const changeToDate = (event, selectedDate) => {
        setShowPickerTo(false)
        setToDate(selectedDate)
    }
    useEffect(() => {
        if(fromDate && toDate && filter && username !== ""){
            dispatch(getAllRiwayat({ nupy: username, start: moment(fromDate).format("YYYY-MM-DD"), end: moment(toDate).format("YYYY-MM-DD") }))
            setFilter(false)
        }
    }, [fromDate, toDate,username,filter])
    useEffect(()=>{
        const focusHandler = navigation.addListener("focus", async () => {
            dispatch(absensiActions.clearRiwayat())
        })
        return focusHandler
    },[navigation])
    return (
        <SafeAreaView>
            <Loader show={loadingAbsensi} />
            <StatusBar backgroundColor="#ffff" />
            <View className='h-[100vh] bg-slate-50 mt-[3vh]'>
                <ScrollView>
                    <View className='h-full py-[10%] flex flex-col space-y-[3%] mb-[9vh]'>
                        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                            <View className='flex flex-row justify-between'>
                                <View onTouchStart={()=>setShowPickerFrom(true)} className='border border-sky-700 rounded-lg p-2 w-[49%]'>
                                    <Text className='text-sky-700'>Dari:</Text>
                                    <Text className='text-sky-700'>{moment(fromDate).format("DD-MMMM")}</Text>
                                </View>
                                <View onTouchStart={()=>setShowPickerTo(true)} className='border border-sky-700 rounded-lg p-2 w-[49%]'>
                                    <Text className='text-sky-700'>Sampai:</Text>
                                    <Text className='text-sky-700'>{moment(toDate).format("DD-MMMM")}</Text>
                                </View>
                            </View>
                            <View className='mt-2 border rounded-lg border-sky-700 p-2' onTouchStart={()=>setFilter(true)}>
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
                        {riwayatAbsensi !== null ?
                            Object.keys(riwayatAbsensi).length !== 0 ?
                                riwayatAbsensi?.absensi_mobile_users.map((d: any, i: any) => (
                                    <View key={i}>
                                        <CardRiwayat tanggal={moment(d.start).format("dddd DD MMMM YYYY")} masuk={d.start ? moment(d.start).format("HH:mm:ss") : "Tidak absen datang"} pulang={d.end ? moment(d.end).format("HH:mm:ss"):"Tidak absen pulang"} />
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
            <Menu index={2} />
        </SafeAreaView >
    )
}