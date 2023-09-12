import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../UI/Login'
import Home from '../UI/Home'
import { navigationRef } from './RootNavigation'
import Gaji from '../UI/Gaji'
import Riwayat from '../UI/Riwayat'
import Qr from '../UI/Qr'
import Profile from '../UI/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../store'
import { authActions } from '../store/slices/auth'

async function getStorage() {
  const storage: any = await AsyncStorage.getItem("absensi")
  let data = JSON.parse(storage)
  if (data === null || Object.keys(data).length === 0) {
    return false
  }
  return true
}

export default function Route() {
  const { token, loadingAuth,status } = useSelector((state: RootState) => state.auth)
  const Stack = createNativeStackNavigator()
  const [check, setCheck] = useState(false)
  const auth = async () => {
    const validate = await getStorage()
    setCheck(validate)
  }
  useEffect(() => {
    auth()
  }, [auth])
  return (
    <NavigationContainer ref={navigationRef}>
      {check ?
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Gaji" component={Gaji} />
          <Stack.Screen name="Riwayat" component={Riwayat} />
          <Stack.Screen name="Qr" component={Qr} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
        :
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      }

    </NavigationContainer>
  )
}