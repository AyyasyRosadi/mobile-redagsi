import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../UI/Login'
import Home from '../UI/Home'
import { navigationRef } from './RootNavigation'
import Gaji from '../UI/Gaji'
import Riwayat from '../UI/Riwayat'
import Qr from '../UI/Qr'
import Profile from '../UI/Profile'


export default function Route() {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Gaji" component={Gaji}/>
            <Stack.Screen name="Riwayat" component={Riwayat}/>
            <Stack.Screen name="Qr" component={Qr}/>
            <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}