import AsyncStorage from '@react-native-async-storage/async-storage'

const useGetStorage = async (key: string):Promise<string | null> => {
    const data = await AsyncStorage.getItem(key)
    return data
}

export default useGetStorage