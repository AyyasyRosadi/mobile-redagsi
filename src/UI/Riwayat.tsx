import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import RNDateTimePicker from '@react-native-community/datetimepicker';


export default function Riwayat() {
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [showPickerFrom, setShowPickerFrom] = useState(false)
    const [showPickerTo, setShowPickerTo] = useState(false)
    const changeFromDate = (event, selectedDate) => {
        const currentDate = selectedDate
        setFromDate(currentDate)
    }
    const open = () => {
        // setShowPickerFrom(true)
        DateTimePickerAndroid.open({
            value:fromDate,
            mode:"date"
        })
    }
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#ffff" />
            <View className='h-[100vh] bg-slate-50 mt-[3vh]'>
                <ScrollView>
                    <View className='h-full py-[10%] flex flex-col space-y-[3%] mb-[9vh]'>
                        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                            <View onTouchStart={open} className='flex flex-row justify-between'>
                                <View className='border p-2 w-[49%]'>
                                    <Text>Dari</Text>
                                </View>
                                <View className='border p-2 w-[49%]'>
                                    <Text>Sampai</Text>
                                </View>
                            </View>
                            {/* {showPickerFrom ?
                                <DateTimePicker value={fromDate} mode="date" onChange={changeFromDate} />
                                :
                                <></>
                            } */}
                        </View>
                        <View className='bg-slate-200 w-[90%] h-[20vh] mx-auto rounded-xl shadow-xl'>
                        </View>
                        <View className='bg-slate-200 w-[90%] h-[20vh] mx-auto rounded-xl shadow-xl'>
                        </View>
                        <View className='bg-slate-200 w-[90%] h-[20vh] mx-auto rounded-xl shadow-xl'>
                        </View>
                        <View className='bg-slate-200 w-[90%] h-[20vh] mx-auto rounded-xl shadow-xl'>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Menu index={3} />
        </SafeAreaView >
    )
}