import AsyncStorage from "@react-native-async-storage/async-storage"

const useRemoveStorage = async (key:string):Promise<void> => {
    await AsyncStorage.removeItem(key)
}

export default useRemoveStorage