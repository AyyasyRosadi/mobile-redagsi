import { View, Text, KeyboardAvoidingView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import masjid from "../assets/masjid.png";
import InputField from '../components/fields/InputFields';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation<any>()
    const [username, setUsername] = useState<any>("");
    const [pwd, setPwd] = useState("");
    const [secure, setSecure] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState("ERROR")
    const login = () => {
        console.log({ noHp: username, pwd: pwd })
        navigation.navigate("Home")
    }
    useEffect(() => {
        if (status === "ERROR") {
            setShowAlert(true);
        }
    }, [status]);
    return (
        <KeyboardAvoidingView behavior="height" className="flex h-screen">
            <View className="h-[40%] ">
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
                                value={username}
                                color="bg-slate-100 border border-slate-100 px-2"
                                set={setUsername}
                                placeholder="username"
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
                                {/* <Image className="w-5 h-5" source={secure ? Close : Open} /> */}
                            </View>
                        </View>
                        <Text className={`text-center mt-[5%] text-md text-[#c5a231] ${showAlert ? "block" : "hidden"}`}>No HP atau Password Salah</Text>
                    </View>
                    <View
                        onTouchStart={login}
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