import React, { ReactNode, useEffect, useState } from 'react'
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
import { useSelector } from 'react-redux'
import { RootState } from '../store'

async function getStorage(): Promise<boolean> {
  const checkStorage = await AsyncStorage.getItem("absensi")
  let data = checkStorage && JSON.parse(checkStorage)
  if (data === null || Object.keys(data).length === 0) {
    return false
  }
  return true
}

export default function Route(): ReactNode {
  const { loadingAuth } = useSelector((state: RootState) => state.auth)
  const Stack = createNativeStackNavigator()
  const [check, setCheck] = useState(false)
  const auth = async () => {
    const validate = await getStorage()
    setCheck(validate)
  }
  useEffect(() => {
    auth()
  }, [auth, loadingAuth])
  return (
    <NavigationContainer ref={navigationRef} >
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