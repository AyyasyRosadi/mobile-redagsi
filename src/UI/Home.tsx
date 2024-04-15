import React, { ReactNode } from 'react';
import { Platform, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Menu from '../templates/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../store';
import { addAbsensi } from '../store/actions/absensi';
import Alert from '../templates/Alert';
import { absensiActions } from '../store/slices/absensi';
import { RouteProp, useRoute } from '@react-navigation/native';
import Loader from '../templates/Loader';
import Carousel from 'react-native-reanimated-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import useShowAlert from '../hooks/useShowAlert';
import useTimer from '../hooks/useTimer';
import { formatTime } from '../helper/time';
import useGetAbsensi from '../hooks/dispatch/useGetAbsensi';
import useGetInformation from '../hooks/dispatch/useGetInformation';
import useShowButtonAbsensi from '../hooks/useShowButtonAbsensi';
import useLocation from '../hooks/useLocation';
import useCheckStorage from '../hooks/useCheckStorage';
import useAbsensiAndInformation from '../hooks/useAbsensiAndInformation';

export default function Absensi({ navigation }): ReactNode {
  const dispatch = useDispatch<AppThunkDispatch>()
  const { username } = useSelector((state: RootState) => state.auth)
  const route: RouteProp<{ params: { status: boolean } }, 'params'> = useRoute()
  const { allAbsensi, loadingAbsensi, hasAbsen, msgAbsensi } = useSelector((state: RootState) => state.absensi)
  const { allInformation } = useSelector((state: RootState) => state.informasi)
  const time = useTimer()
  const showAlert = useShowAlert(hasAbsen, absensiActions.clearAbsensi())
  const { danger, textMessage } = useLocation()
  const showButton = useShowButtonAbsensi(time)
  useGetAbsensi(danger, username, hasAbsen)
  useGetInformation(danger, username, hasAbsen)
  useAbsensiAndInformation(route, navigation, danger, username)
  useCheckStorage(route)
  const windowWidth = Dimensions.get("screen").width
  const absen = () => {
    dispatch(addAbsensi({ nupy: username }))
  }
  return (
    <SafeAreaView className=''>
      <Alert show={showAlert} msg={msgAbsensi} />
      <Loader show={loadingAbsensi} />
      <StatusBar backgroundColor="#ffff" />
      <View className={`h-screen bg-slate-50 absolute top-[0vh] w-screen ${Platform?.OS === "android" ? "mt-[2vh]" : ""}`}>
        <View className="h-[100vh] pt-[5vh]">
          <View className={`mx-auto`} style={{ width: windowWidth / 1.5, height: windowWidth / 1.5 }}>
            <View className="bg-[#dbad17] my-auto rounded-full w-[90%] h-[90%] mx-auto p-10 flex flex-row justify-center items-center">
              <Text className="text-white text-3xl">{formatTime(time)}</Text>
            </View>
          </View>
          <Text className={`text-center mt-3 text-xl ${danger ? "text-red-700" : "text-sky-700"}`}>{textMessage}</Text>
          <View className='w-[95%] mt-[5%] mx-auto h-[10%]'>
            {Object.keys(allAbsensi)?.length !== 0 ?
              allAbsensi?.masuk ?
                showButton ?
                  <View onTouchStart={absen} className={`bg-[#dbad17] w-[90%] py-4 mx-auto rounded-lg ${danger || textMessage === "Waiting..." ? "hidden" : "block"}`}>
                    <Text className="text-center text-white text-xl">Absen {allAbsensi?.start ? "Datang" : "Pulang"}</Text>
                  </View>
                  :
                  <Text className={`text-center text-sky-700 text-lg mx-[5%] ${danger || textMessage === "Waiting..." ? "hidden" : "block"}`}>{allAbsensi?.total_absen === 0 && !allAbsensi?.start && !allAbsensi?.end ? <Text>Anda Tidak Melakukan Absensi Hari ini</Text> : allAbsensi?.total_absen === 1 ? <Text>Terimakasih telah absen <Text className='font-semibold text-sky-700'>datang</Text> hari ini</Text> : "Terima Kasih Sudah Melakukan Absen Hari ini"}</Text>
                :
                <View className='flex justify-center w-screen'>
                  <Text className={`text-red-600 text-xl font-semibold text-center ${danger || textMessage === "Waiting..." ? "hidden" : "block"}`}>Hari ini anda libur</Text>
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