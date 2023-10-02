import React, { useState, useEffect, SetStateAction } from 'react';
import { Platform, Text, View, SafeAreaView, Dimensions } from 'react-native';
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
import Loader from '../templates/Loader';
import { getAllInformation } from '../store/actions/informasi';
import Carousel from 'react-native-reanimated-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { getPerbandingan } from '../helper/perbandingan';

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
  const [index, setindex] = useState<number>(0)
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [text, setText] = useState('Waiting...')
  const [time, setTime] = useState(new Date())
  const [showMsg, setShowMsg] = useState(false)
  const [hasPulang, setHasPulang] = useState<any>()
  const { allAbsensi, loadingAbsensi, hasAbsen, msgAbsensi } = useSelector((state: RootState) => state.absensi)
  const { allInformation, loadingInformation, status } = useSelector((state: RootState) => state.informasi)
  const absen = () => {
    dispatch(addAbsensi({ nupy: username }))
    setShowButton(false)
  }
  const getStorage = async () => {
    const data: any = await AsyncStorage.getItem('absensi')
    if (JSON.parse(data) !== null || Object.keys(JSON.parse(data)).length !== 0) {
      dispatch(authActions.setAuth(JSON.parse(data)))
    }
  }
  const removeStorage = async () => {
    await AsyncStorage.removeItem("absensi")
  }
  const setLogout = async () => {
    if (route?.params?.status || allAbsensi?.msg === "Invalid token") {
      await removeStorage()
      dispatch(authActions.clearAuth())
      dispatch(absensiActions.clearAbsensi())
      dispatch(absensiActions.clearRiwayat())
    }
    else {
      await getStorage()
    }
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
    if (Object.keys(allAbsensi).length !== 0) {
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
            data = await calculateLocation.convertLatLongToKm(parseFloat(allAbsensi?.location?.langitude), parseFloat(allAbsensi?.location?.longitude), location_?.coords?.latitude, location_?.coords?.longitude)
            if (data <= 0.5) {
              setText('Anda berada di radius area absensi')
              setDanger(false)
            } else {
              setText('Anda berada di luar radius absensi')
              setDanger(true)
            }
            setLocation(location_)
          }
        } else if (Platform.OS === 'ios') {
          data = await calculateLocation.convertLatLongToKm(parseFloat(allAbsensi?.location?.langitude), parseFloat(allAbsensi?.location?.longitude), location_?.coords?.latitude, location_?.coords?.longitude)
          if (data <= 0.5) {
            setText('Anda berada di radius area absensi')
            setDanger(false)
          } else {
            setText('Anda berada di luar radius absensi')
            setDanger(true)
          }
          setLocation(location_)
        }
      }, 500)
    }
  }, [location, allAbsensi]);
  useEffect(() => {
    if (!danger && username !== "") {
      dispatch(getAllAbsensi(username))
      dispatch(getAllInformation())
    }
  }, [danger, hasAbsen, username])
  useEffect(() => {
    if (Object.keys(allAbsensi).length !== 0) {
      console.log(allAbsensi)
      if (allAbsensi.start) {
        if (moment(allAbsensi?.absen?.end).format("YYYY-MM-DD HH:mm:ss") > moment(time).format("YYYY-MM-DD HH:mm:ss")) {
          setShowButton(true)
        }
        else {
          setShowButton(false)
        }
      }
      else if (allAbsensi.end) {
        if (moment(allAbsensi?.absen?.end).subtract("02:00:00").format("HH:mm:ss") <= moment(time).format("HH:mm:ss") && moment(time).format("HH:mm:ss") <= moment(allAbsensi?.absen?.end).format("HH:mm:ss")) {
          setShowButton(true)
        }
        else {
          setShowButton(false)
        }
      }
      else {
        setShowButton(false)
      }
    }
  }, [loadingAbsensi])
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", async () => {
      setLogout()
      if (!danger && username !== "") {
        dispatch(getAllAbsensi(username))
        dispatch(getAllInformation())
      }
    })
    return focusHandler
  }, [navigation, route, username, danger])
  useEffect(() => {
    setLogout()
  }, [allAbsensi])
  const windowWidth = Dimensions.get("screen").width
  const windowHeight = Dimensions.get("screen").height
  return (
    <SafeAreaView className=''>
      <Alert show={showMsg} msg={msgAbsensi} />
      <Loader show={loadingAbsensi} />
      <StatusBar backgroundColor="#ffff" />
      <View className={`h-screen bg-slate-50 absolute top-[0vh] w-screen ${Platform?.OS === "android" ? "mt-[2vh]" : ""}`}>
        <View className="h-[100vh] pt-[5vh]">
          <View className={`mx-auto`} style={{width:windowWidth/1.5,height:windowWidth/1.5}}>
            <View className="bg-[#dbad17] my-auto rounded-full w-[90%] h-[90%] mx-auto p-10 flex flex-row justify-center items-center">
              <Text className="text-white text-4xl">{moment(time).format("HH:mm:ss")}</Text>
            </View>
          </View>
          <Text className={`text-center mt-3 text-xl ${danger ? "text-red-700" : "text-sky-700"}`}>{text}</Text>
          <View className='w-[95%] mt-[5%] mx-auto h-[10%]'>
            {Object.keys(allAbsensi)?.length !== 0 ?
              allAbsensi?.masuk ?
                showButton ?
                  <View onTouchStart={absen} className={`bg-[#dbad17] w-[90%] py-4 mx-auto rounded-lg ${danger || text === "Waiting..." ? "hidden" : "block"}`}>
                    <Text className="text-center text-white text-xl">Absen {allAbsensi?.start ? "Datang" : "Pulang"}</Text>
                  </View>
                  :
                  <Text className={`text-center text-sky-700 text-lg mx-[5%] ${danger || text === "Waiting..." ? "hidden" : "block"}`}>{allAbsensi?.total_absen === 0 && !allAbsensi?.start && !allAbsensi?.end ? <Text>Anda Tidak Melakukan Absensi Hari ini</Text> : allAbsensi?.total_absen === 1 ? <Text>Terimakasih telah absen <Text className='font-semibold text-sky-700'>datang</Text> hari ini</Text> : "Terima Kasih Sudah Melakukan Absen Hari ini"}</Text>
                :
                <View className='flex justify-center w-screen'>
                  <Text className={`text-red-600 text-xl font-semibold text-center ${danger || text === "Waiting..." ? "hidden" : "block"}`}>Hari ini anda libur</Text>
                </View>
              :
              <></>
            }
          </View>
          <View className='w-[100%] h-[30%]'>
            <Carousel
              width={1000}
              autoPlay={true}
              autoPlayReverse={true}
              autoPlayInterval={1000}
              loop
              scrollAnimationDuration={1000}
              data={allInformation}
              renderItem={({ index }) => (
                <View className='bg-[#f0d270] w-[100vw] py-[3%] h-[90%] my-auto flex flex-row justify-center items-center'>
                  <View>
                    <View>
                      <Text className='text-2xl text-slate-900 font-bold text-center'>{allInformation[index]?.title}</Text>
                    </View>
                    <ScrollView>
                      <Text className='text-lg text-slate-800 text-center mt-[5%] mx-[3%]'>{allInformation[index]?.informasi}</Text>
                    </ScrollView>
                  </View>
                </View>
              )}
            />
          </View>
          <View className="bg-slate-400 w-[95%] h-fullr mx-auto rounded-lg shadow-lg">
          </View>
        </View>
        <Menu index={0} />
      </View>
    </SafeAreaView>
  )
}