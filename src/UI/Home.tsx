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

const lang = -8.6560562
const long = 116.5396862

export default function Absensi() {
  const dispatch = useDispatch<AppThunkDispatch>()
  const [location, setLocation] = useState(null);
  const [danger, setDanger] = useState<any>()
  const [showButton, setShowButton] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [text, setText] = useState('Waiting...')
  const [time, setTime] = useState(new Date())
  const [showMsg, setShowMsg] = useState(false)
  const [hasPulang, setHasPulang] = useState<any>()
  const { allAbsensi, loadingAbsensi, hasAbsen, msgAbsensi } = useSelector((state: RootState) => state.absensi)
  const absen = () => {
    dispatch(addAbsensi({ nupy: "19860420101056" }))
    setShowButton(false)
    setShowMsg(true)
    setTimeout(() => {
      setShowMsg(false)
    }, 2000)
  }
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
          data = await calculateLocation.convertLatLongToKm(lang, long, location_?.coords?.latitude, location_?.coords?.longitude)
          if (data <= 0.3) {
            setText('Berada dalam Lokasi')
            setDanger(false)
          } else {
            setText('titik berada diluar Radius')
            setDanger(true)
          }
          setLocation(location_)
        }
      } else if (Platform.OS === 'ios') {
        data = await calculateLocation.convertLatLongToKm(lang, long, location_?.coords?.latitude, location_?.coords?.longitude)
        if (data <= 0.3) {
          setText('Berada dalam Lokasi')
        } else {
          setText('titik berada diluar Radius')
        }
        setLocation(location_)
      }
    }, 500)
  }, [location]);
  useEffect(() => {
    dispatch(absensiActions.clearAbsensi())
    if (!danger) {
      dispatch(getAllAbsensi("19860420101056"))
    }
  }, [danger, hasAbsen])
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
  return (
    <SafeAreaView>
      <Alert show={showMsg} msg={msgAbsensi} />
      <StatusBar backgroundColor="#ffff" />
      <View className="h-[100vh] bg-slate-50 mt-[3vh]">
        <View className="h-[92vh] py-[10%]">
          <View className="w-[90vw] h-[43vh] mx-auto">
            <View className="bg-sky-600 rounded-full w-[70vw] h-[35vh] mx-auto p-10 flex flex-row justify-center items-center">
              <Text className="text-white text-4xl">{moment(time).format("HH:mm:ss")}</Text>
            </View>
            <Text className={`text-center mt-3 text-xl ${danger ? "text-red-700" : "text-sky-700"}`}>{text}</Text>
          </View>
          <View>
            {Object.keys(allAbsensi)?.length !== 0 ?
              allAbsensi?.masuk ?
              showButton ?
                  <View onTouchStart={absen} className={`bg-[#dbad17] w-[90%] py-4 mx-auto rounded-lg ${danger || text === "Waiting..." ? "hidden" : "block"}`}>
                    <Text className="text-center text-white text-xl">Absen</Text>
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
      <Menu index={1} />
    </SafeAreaView>
  )
}