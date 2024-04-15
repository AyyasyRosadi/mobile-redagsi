import React, { SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import convertLatLongToKilometer from '../helper/calculateLocation';

const langPondok = -8.589097
const longPondok = 116.095872
const langDiya = -8.6560562
const longDiya = 116.5396862


export default function useLocation(): { errorMessage: string, textMessage: string, danger: boolean } {
    const { allAbsensi } = useSelector((state: RootState) => state.absensi)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [textMessage, setTextMessage] = useState<string>('Waiting...')
    const [danger, setDanger] = useState(false)
    const [location, setLocation] = useState<Location.LocationObject>()
    useEffect(() => {
        if (Object.keys(allAbsensi!).length !== 0) {
            setTimeout(async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMessage('Permission to access location was denied');
                    return;
                }
                let location_: Location.LocationObject = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Highest, timeInterval: 1000
                });

                if (errorMessage) {
                    setTextMessage(errorMessage)
                }

                let data;

                if (Platform.OS === 'android') {
                    if (location_?.mocked) {
                        setTextMessage('Anda tidak bisa melakukan absen. Anda menggunakan Fake GPS')
                        setDanger(true)

                    } else {
                        data = await convertLatLongToKilometer(parseFloat(`${langDiya}`), parseFloat(`${longDiya}`), location_?.coords?.latitude, location_?.coords?.longitude)
                        if (data <= 0.5) {
                            setTextMessage('Anda berada di radius area absensi')
                            setDanger(false)
                        } else {
                            setTextMessage('Anda berada di luar radius absensi')
                            setDanger(true)
                        }
                        setLocation(location_)
                    }
                } else if (Platform.OS === 'ios') {
                    data = await convertLatLongToKilometer(parseFloat(`${langDiya}`), parseFloat(`${longDiya}`), location_?.coords?.latitude, location_?.coords?.longitude)
                    if (data <= 0.5) {
                        setTextMessage('Anda berada di radius area absensi')
                        setDanger(false)
                    } else {
                        setTextMessage('Anda berada di luar radius absensi')
                        setDanger(true)
                    }
                    setLocation(location_)
                }
            }, 500)
        }
    }, [location, allAbsensi]);
    return { errorMessage, textMessage, danger }
}
