import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import User from "../assets/user.png"
import Settings from "../assets/settings.png"
import FieldTitle from '../components/custom/FieldTitle'

export default function Profile() {
    return (
        <SafeAreaView>
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
                        <View className='bg-slate-200 w-[90%] h-[75vh] mx-auto rounded-xl shadow-xl p-4'>
                            <View className='flex flex-row'>
                                <View className='w-[20%]'>
                                    <Image source={Settings} alt="" className='w-12 h-12' />
                                </View>
                                <View className='w-[80%] my-auto'>
                                    <Text className='text-xl font-bold'>Pengaturan</Text>
                                </View>
                            </View>
                            <View className='bg-slate-400 w-full h-[2px] mt-2 mb-4'></View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Menu index={5} />
        </SafeAreaView>
    )
}