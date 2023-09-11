import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'

export default function Profile() {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#ffff" />
            <View className='h-[100vh] bg-slate-50 mt-[3vh]'>
                <ScrollView>
                <View className='h-full py-[10%] flex flex-col space-y-[5%] mb-[9vh]'>
                    <View className='bg-slate-200 w-[90%] h-[25vh] mx-auto rounded-xl shadow-xl'>
                    </View>
                    <View className='bg-slate-200 w-[90%] h-[75vh] mx-auto rounded-xl shadow-xl'>
                    </View>
                </View>
                </ScrollView>
            </View>
            <Menu index={5} />
        </SafeAreaView>
    )
}