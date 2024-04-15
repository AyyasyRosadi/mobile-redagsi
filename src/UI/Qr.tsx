import { View, SafeAreaView, ScrollView } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import SvgQRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Platform } from 'react-native';

function QrCode({ params }):ReactNode {
    return <SvgQRCode value={params} size={300} />
}

export default function Qr():ReactNode {
    const { username } = useSelector((state: RootState) => state.auth)
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#ffff" />
            <View className={`h-screen bg-slate-50 absolute top-[0vh] w-screen ${Platform?.OS === "android" ? "mt-[2vh]" : ""}`}>
                <ScrollView>
                    <View className='h-full py-[10%] flex flex-col justify-center'>
                        <View className='bg-slate-50 w-[90%] h-[85vh] mx-auto'>
                            <View className='flex flex-row justify-center items-center my-auto'>
                                <QrCode params={username} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Menu index={3} />
            </View>
        </SafeAreaView>
    )
}