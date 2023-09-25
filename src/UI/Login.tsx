import { View, Text, KeyboardAvoidingView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import masjid from "../assets/masjid.png";
import InputField from '../components/fields/InputFields';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../store';
import { login } from '../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authActions } from '../store/slices/auth';
import Loader from '../templates/Loader';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
    const dispatch = useDispatch<AppThunkDispatch>()
    const { loadingAuth, token, username, lembaga, msgAuth, status, nama } = useSelector((state: RootState) => state.auth)
    const navigation = useNavigation<any>()
    const [name, setName] = useState<any>("");
    const [pwd, setPwd] = useState("");
    const [secure, setSecure] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const isLogin = () => {
        dispatch(login({ username: name, password: pwd, sistem: "mobile" }))
    }
    useEffect(() => {
        if (status === "ERROR") {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
                dispatch(authActions.clearStatus())
            }, 2000)
        }
    }, [status]);
    useEffect(() => {
        const setStorage = async () => {
            try {
                if (token !== "" && username !== "") {
                    let data = { token: token, nupy: username, nama: nama }
                    await AsyncStorage.setItem("absensi", JSON.stringify(data))
                    // navigation.navigate("Home",{status:false})
                }
            }
            catch (err) {
                throw err
            }
        }
        setStorage()
    }, [loadingAuth,])
    return (
        <KeyboardAvoidingView behavior="height" className="flex h-screen">
            <StatusBar />
            <Loader show={loadingAuth} />
            <View className="h-[40%]">
                <View className="bg-black absolute top-0 h-[100%] w-[120%] -ml-[10%] z-10 opacity-50 rounded-b-[90px]"></View>
                <Image
                    source={masjid}
                    alt=""
                    className="w-[120%] h-[100%] bg-cover rounded-b-[90px] mx-auto -ml-[10%]"
                />
            </View>
            <View className="flex h-[60%] ">
                <Text className="text-center text-3xl my-2 mt-[5%]">Redagsi</Text>
                <View className="mx-auto w-[90%] h-[80%] flex justify-between">
                    <View>
                        <View className="relative">
                            <InputField
                                value={name}
                                color="bg-slate-100 border border-slate-100 px-2"
                                set={setName}
                                placeholder="username"
                                keyboard="number-pad"
                            />
                        </View>
                        <View className="relative">
                            <InputField
                                secure={!secure}
                                value={pwd}
                                color="bg-slate-100 border border-slate-100 px-2"
                                set={setPwd}
                                placeholder="Password"
                            />
                            <View
                                onTouchStart={() => setSecure(!secure)}
                                className="absolute right-[5%] top-[45%]"
                            >
                                {!secure ? (
                                    <Text className="text-[#dbad17] font-semibold">Lihat</Text>
                                ) : (
                                    <Text className="text-[#dbad17] font-semibold">
                                        Sembunyikan
                                    </Text>
                                )}
                            </View>
                        </View>
                        <Text className={`text-center mt-[5%] text-md text-[#c5a231] ${showAlert ? "block" : "hidden"}`}>Username atau Password Salah</Text>
                    </View>
                    <View
                        onTouchStart={isLogin}
                        className="bg-[#dbad17] rounded-xl w-full my-2 py-2"
                    >
                        <Text className="mx-auto py-3 text-white font-extrabold">
                            Masuk
                        </Text>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}