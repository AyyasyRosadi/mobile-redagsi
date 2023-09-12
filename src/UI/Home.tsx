import React, { useState, useEffect, SetStateAction } from 'react';
import { Platform, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import calculateLocation from '../helper/calculateLocation';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import Menu from '../templates/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../store';
import { addAbsensi, getAllAbsensi } from '../store/actions/absensi';
import moment from 'moment';
import Alert from '../templates/Alert';
import { absensiActions } from '../store/slices/absensi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { authActions } from '../store/slices/auth';
import { logout } from '../store/actions/auth';
import Loader from '../templates/Loader';

const langPondok = -8.589097
const longPondok = 116.095872
const langDiya = -8.6560562
const longDiya = 116.5396862

export default function Absensi({ navigation }) {
  const dispatch = useDispatch<AppThunkDispatch>()
  const { username } = useSelector((state: RootState) => state.auth)
  const route = useRoute<any>()
  const [location, setLocation] = useState(null);
  const [danger, setDanger] = useState<any>(null)
  const [showButton, setShowButton] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [text, setText] = useState('Waiting...')
  const [time, setTime] = useState(new Date())
  const [showMsg, setShowMsg] = useState(false)
  const [hasPulang, setHasPulang] = useState<any>()
  const { allAbsensi, loadingAbsensi, hasAbsen, msgAbsensi } = useSelector((state: RootState) => state.absensi)
  const absen = () => {
    dispatch(addAbsensi({ nupy: username }))
    setShowButton(false)
  }
  useEffect(() => {
    if (hasAbsen === "SUCCES") {
      setShowMsg(true)
      setTimeout(() => {
        setShowMsg(false)
        dispatch(absensiActions.clearAbsensi())
      }, 2000)
    }
  }, [hasAbsen])
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    setTimeout(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location_: SetStateAction<any> = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest, timeInterval: 1000
      });

      if (errorMsg) {
        setText(errorMsg)
      }

      let data;

      if (Platform.OS === 'android') {
        if (location_?.mocked) {
          setText('Anda tidak bisa melakukan absen. Anda menggunakan Fake GPS')
          setDanger(true)

        } else {
          data = await calculateLocation.convertLatLongToKm(langPondok, longPondok, location_?.coords?.latitude, location_?.coords?.longitude)
          if (data <= 0.5) {
            setText('Anda Berada di Area Pondok')
            setDanger(false)
          } else {
            setText('Anda Berada di Luar Area Pondok')
            setDanger(true)
          }
          setLocation(location_)
        }
      } else if (Platform.OS === 'ios') {
        data = await calculateLocation.convertLatLongToKm(langPondok, longPondok, location_?.coords?.latitude, location_?.coords?.longitude)
        if (data <= 0.5) {
          setText('Anda Berada di Area Pondok')
        } else {
          setText('Anda Berada di Luar Area Pondok')
        }
        setLocation(location_)
      }
    }, 500)
  }, [location]);
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", async () => {
      if (!danger && username !== "") {
        dispatch(getAllAbsensi(username))
      }
    })
    return focusHandler
  }, [danger, hasAbsen, username, navigation])
  useEffect(() => {
    if (Object.keys(allAbsensi).length !== 0) {
      if (allAbsensi.start) {
        if (moment(allAbsensi?.absen?.end).format("HH:mm:ss") > moment(time).format("HH:mm:ss")) {
          setShowButton(true)
        }
        else {
          setShowButton(false)
        }
      }
      if (allAbsensi.end && !hasPulang) {
        if (moment(allAbsensi?.absen?.end).subtract("02:00:00").format("HH:mm:ss") <= moment(time).format("HH:mm:ss")) {
          setShowButton(true)
          setHasPulang(true)
        }
        else {
          setShowButton(false)
        }
      }
    }
  }, [loadingAbsensi])
  useEffect(() => {
    const getStorage = async () => {
      const data: any = await AsyncStorage.getItem('absensi')
      if (JSON.parse(data) !== null || Object.keys(JSON.parse(data)).length !== 0) {
        dispatch(authActions.setAuth(JSON.parse(data)))
      }
    }
    const removeStorage = async () => {
      await AsyncStorage.removeItem("absensi")
    }
    const focusHandler = navigation.addListener("focus", async () => {
      if (route?.params?.status) {
        await removeStorage()
        dispatch(authActions.clearAuth())
      }
      else {
        await getStorage()
      }
    })
    return focusHandler
  }, [navigation, route])
  return (
    <SafeAreaView>
      <Alert show={showMsg} msg={msgAbsensi} />
      <Loader show={loadingAbsensi} />
      {/* <Alert show={true} msg={msgAbsensi} />
      <Loader show={true} /> */}
      <StatusBar backgroundColor="#ffff" />
      <View className="h-[100vh] bg-slate-50 mt-[3vh]">
        <View className="h-[92vh] py-[10%]">
          <View className="w-[90vw] h-[43vh] mx-auto">
            <View className="bg-[#dbad17] rounded-full w-[70vw] h-[35vh] mx-auto p-10 flex flex-row justify-center items-center">
              <Text className="text-white text-4xl">{moment(time).format("HH:mm:ss")}</Text>
            </View>
            <Text className={`text-center mt-3 text-xl ${danger ? "text-red-700" : "text-sky-700"}`}>{text}</Text>
          </View>
          <View>
            {Object.keys(allAbsensi)?.length !== 0 ?
              allAbsensi?.masuk ?
                showButton ?
                  <View onTouchStart={absen} className={`bg-[#dbad17] w-[90%] py-4 mx-auto rounded-lg ${danger || text === "Waiting..." ? "hidden" : "block"}`}>
                    <Text className="text-center text-white text-xl">Absen {allAbsensi?.start ? "Datang" : "Pulang"}</Text>
                  </View>
                  :
                  <Text className={`text-center text-sky-700 text-lg ${danger || text === "Waiting..." ? "hidden" : "block"}`}>Anda Sudah Melakukan Absensi</Text>
                :
                <View className='flex justify-center w-screen'>
                  <Text className={`text-red-600 text-xl font-semibold text-center ${danger || text === "Waiting..." ? "hidden" : "block"}`}>Hari ini anda libur</Text>
                </View>
              :
              <></>
            }
          </View>
          <View className="bg-slate-400 w-[95%] h-fullr mx-auto rounded-lg shadow-lg">
          </View>
        </View>
      </View>
      <Menu index={0} />
    </SafeAreaView>
  )
}