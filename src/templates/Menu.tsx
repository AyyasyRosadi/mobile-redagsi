import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import iconUser from "../assets/profile.png"
import iconQr from "../assets/qr.png"
import iconGaji from "../assets/wallet.png"
import iconRekap from "../assets/rekap.png"
import iconAbsensi from "../assets/absensi.png"
import { useNavigation } from '@react-navigation/native'
import { TMenu } from './TypeTemplates'
import { Dimensions } from 'react-native'


export default function Menu({ index }: TMenu) {
  const navigate = useNavigation<any>()
  const params = navigate.getState()
  const windowWidth = Dimensions.get("screen").width
  const windowHeight = Dimensions.get("screen").height
  return (
    <SafeAreaView>
      <View className="h-[65px] absolute bottom-0 bg-[#dcb535] flex-1 w-[100%] flex flex-row justify-between py-2 px-3 shadow-xl">
        <View className="w-[18%]" onTouchStart={() => navigate.replace("Gaji")}>
          <Image source={iconGaji} className="w-8 h-8 mx-auto" />
          <Text className={`text-center ${params.routeNames[index] === "Gaji" ? "text-white font-bold" : "text-slate-900"}`}>Gaji</Text>
          <View className={`w-full h-[5%] bg-white my-[5%] ${params.routeNames[index] === "Gaji" ? "block" : "hidden"}`}></View>
        </View>
        <View className="w-[18%]" onTouchStart={() => navigate.replace("Riwayat")}>
          <Image source={iconRekap} className="w-8 h-8 mx-auto" />
          <Text className={`text-center ${params.routeNames[index] === "Riwayat" ? "text-white font-bold" : "text-slate-900"}`}>Riwayat</Text>
          <View className={`w-full h-[5%] bg-white my-[5%] ${params.routeNames[index] === "Riwayat" ? "block" : "hidden"}`}></View>
        </View>
        <View className="-mt-[10%] bg-sky-600 rounded-full p-2 shadow-2xl shadow-white" style={{width:windowWidth/4.8,height:windowWidth/4.8}} onTouchStart={() => navigate.replace("Home")}>
          <Image source={iconAbsensi} className="w-9 h-9 mx-auto" />
          <Text className="text-center text-white mt-1">Absensi</Text>
          <View className={`w-[70%] mx-auto h-[5%] bg-white my-[5%] ${params.routeNames[index] === "Home" ? "block" : "hidden"}`}></View>
        </View>
        <View className="w-[18%]" onTouchStart={() => navigate.replace("Qr")}>
          <Image source={iconQr} className="w-8 h-8 mx-auto" />
          <Text className={`text-center ${params.routeNames[index] === "Qr" ? "text-white font-bold" : "text-slate-900"}`}>Qr code</Text>
          <View className={`w-full h-[5%] bg-white my-[5%] ${params.routeNames[index] === "Qr" ? "block" : "hidden"}`}></View>
        </View>
        <View className="w-[18%]" onTouchStart={() => navigate.replace("Profile")}>
          <Image source={iconUser} className="w-8 h-8 mx-auto" />
          <Text className={`text-center ${params.routeNames[index] === "Profile" ? "text-white font-bold" : "text-slate-900"}`}>Profile</Text>
          <View className={`w-full h-[5%] bg-white my-[5%] ${params.routeNames[index] === "Profile" ? "block" : "hidden"}`}></View>
        </View>
      </View>
    </SafeAreaView>
  )
}