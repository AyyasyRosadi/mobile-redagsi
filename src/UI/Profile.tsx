import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import User from "../assets/user.png"
import Settings from "../assets/settings.png"
import iconReset from "../assets/resetPwd.png"
import FieldTitle from '../components/custom/FieldTitle'
import iconLogout from "../assets/logout.png"
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../store'
import Loader from '../templates/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authActions } from '../store/slices/auth'
import { getProfile, resetPassword } from '../store/actions/profile'
import Alert from '../templates/Alert'
import InputField from '../components/fields/InputFields'
import { profileActions } from '../store/slices/profile'

export default function Profile({ navigation }) {
    const dispatch = useDispatch<AppThunkDispatch>()
    const { loadingAuth, username, nama } = useSelector((state: RootState) => state.auth)
    const { profile, msgProfile, loadingProfile, status } = useSelector((state: RootState) => state.profile)
    const [showReset, setShowReset] = useState(false)
    const [checkPass, setCheckPass] = useState(false)
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [msgCheck, setMsgCheck] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const removeStorage = async () => {
        await AsyncStorage.removeItem("absensi")
    }
    const out = async () => {
        await removeStorage()
        dispatch(authActions.clearAuth())

    }
    const reset = () => {
        if (newPass.length < 8) {
            setCheckPass(true)
            setMsgCheck("Password baru minimal 8 karakter")
        }
        else {
            dispatch(resetPassword({ nama: nama, username: username, old_pass: oldPass, new_pass: newPass }))
            setOldPass("")
            setNewPass("")
            setShowReset(false)
        }
    }
    useEffect(() => {
        const focusHandler = navigation.addListener("focus", () => {
            if (username) {
                dispatch(getProfile(username))
            }
        })
        return focusHandler
    }, [navigation, username])
    useEffect(() => {
        if (status === "SUCCES" || status === "ERROR") {
            setModalVisible(true)
            setTimeout(() => {
                setModalVisible(false)
                dispatch(profileActions.clearStatus())
            }, 2000)
        }
    }, [status])
    useEffect(() => {
        if (oldPass === "" && newPass !== "") {
            setCheckPass(true)
            setMsgCheck("Password lama harus di isi")
        }
    }, [newPass])
    return (
        <SafeAreaView>
            <Alert show={modalVisible} msg={msgProfile} />
            <Loader show={loadingAuth || loadingProfile} />
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
                                <FieldTitle title='Nupy' value={profile?.nupy} />
                                <FieldTitle title='Nama' value={profile?.nama} />
                                <FieldTitle title='Satker' value={profile?.statusPtk?.listSatker?.nama_satker} />
                                <FieldTitle title='Lembaga' value={profile?.statusPtk?.lembaga?.nama} />
                                <FieldTitle title='Tugas Pokok' value={profile?.statusPtk?.listTugasPokok?.nama_tugasPokok} />
                            </View>
                        </View>
                        <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                            <View className='flex flex-row'>
                                <View className='w-[20%]'>
                                    <Image source={Settings} alt="" className='w-12 h-12' />
                                </View>
                                <View className='w-[80%] my-auto'>
                                    <Text className='text-xl font-bold'>Pengaturan</Text>
                                </View>
                            </View>
                            <View className='bg-slate-400 w-full h-[2px] mt-2 mb-4'></View>
                            <View className='flex justify-end space-y-4'>
                                <View className='flex flex-row' onTouchStart={() => setShowReset(!showReset)}>
                                    <View className='w-[17%]'>
                                        <Image source={iconReset} className='w-10 h-10' />
                                    </View>
                                    <Text className='text-lg my-auto'>Reset Password</Text>
                                </View>
                                <View className={`flex flex-col space-y-2 w-[100%] ${showReset ? "block" : "hidden"}`}>
                                    <View className='w-[100%]'>
                                        <InputField title='Password lama' value={oldPass} set={setOldPass} />
                                    </View>
                                    <View className='w-[100%]'>
                                        <InputField title='Password baru' value={newPass} set={setNewPass} />
                                        <Text className='text-red-700'>{checkPass ? `${msgCheck}` : ""}</Text>
                                    </View>
                                    <View className='flex flex-row justify-end  w-[100%]'>
                                        <View className='bg-sky-600  w-[25%] p-2 rounded-lg' onTouchStart={reset}>
                                            <Text className='text-center text-white'>Simpan</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className='flex flex-row' onTouchStart={out}>
                                    <View className='w-[17%]'>
                                        <Image source={iconLogout} className='w-10 h-10' />
                                    </View>
                                    <Text className='text-lg my-auto'>Logout</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Menu index={4} />
        </SafeAreaView >
    )
}