import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import User from "../assets/user.png"
import Settings from "../assets/settings.png"
import FieldTitle from '../components/custom/FieldTitle'
import iconLogout from "../assets/logout.png"
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../store'
import { logout } from '../store/actions/auth'
import Loader from '../templates/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authActions } from '../store/slices/auth'

export default function Profile() {
    const dispatch = useDispatch<AppThunkDispatch>()
    const { loadingAuth } = useSelector((state: RootState) => state.auth)
    const removeStorage = async () => {
        await AsyncStorage.removeItem("absensi")
    }
    const out = async () => {
        await removeStorage()
        dispatch(authActions.clearAuth())

    }
    return (
        <SafeAreaView>
            <Loader show={loadingAuth} />
            <StatusBar backgroundColor="#ffff" />
            <View className='h-[100vh] bg-slate-50 mt-[3vh]'>
                <ScrollView>
                    <View className='h-full py-[10%] flex flex-col space-y-[5%] mb-[9vh]'>
                        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                            <View className='flex flex-row'>
                                <View className='w-[20%]'>
                                    <Image source={User} alt="" className='w-12 h-12' />
                                </View>
                                <View className='w-[80%] my-auto'>
                                    <Text className='text-xl font-bold'>Profile PTK</Text>
                                </View>
                            </View>
                            <View className='bg-slate-400 w-full h-[2px] mt-2 mb-4'></View>
                            <View className='mt-1 ml-1'>
                                <FieldTitle title='Nupy' value={""} />
                                <FieldTitle title='Nama' value={""} />
                                <FieldTitle title='Satker' value={""} />
                                <FieldTitle title='Lembaga' value={""} />
                                <FieldTitle title='Tugas Pokok' value={""} />
                            </View>
                        </View>
                        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                            <View className='flex flex-row'>
                                <View className='w-[20%]'>
                                    <Image source={Settings} alt="" className='w-12 h-12' />
                                </View>
                                <View className='w-[80%] my-auto'>
                                    <Text className='text-xl font-bold'>Pengaturan</Text>
                                </View>
                            </View>
                            <View className='bg-slate-400 w-full h-[2px] mt-2 mb-4'></View>
                            <View className='flex justify-end'>
                                <View className='flex flex-row' onTouchStart={out}>
                                    <View className='w-[17%]'>
                                        <Image source={iconLogout} className='w-10 h-10' />
                                    </View>
                                    <Text className='text-lg my-auto'>Logout</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Menu index={4} />
        </SafeAreaView>
    )
}