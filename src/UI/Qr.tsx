import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import SvgQRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function QrCode({ params }) {
    return <SvgQRCode value={params} size={300} />
}

export default function Qr() {
    const {username} = useSelector((state:RootState)=>state.auth)
    const [nupy, setNupy] = useState()
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#ffff" />
            <View className='h-[100vh] bg-slate-50 mt-[3vh]'>
                <ScrollView>
                    <View className='h-full py-[10%] flex flex-col justify-center'>
                        <View className='bg-slate-50 w-[90%] h-[85vh] mx-auto'>
                            <View className='flex flex-row justify-center items-center my-auto'>
                                <QrCode params={username} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Menu index={3} />
        </SafeAreaView>
    )
}