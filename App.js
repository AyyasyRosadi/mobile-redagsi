import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import calculateLocation from './src/helper/calculateLocation';

import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text, setText] = useState('Waiting...')
  const [time, setTime] = useState(new Date())
  

  useEffect(()=>{
    const timer = setInterval(()=>{
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  },[])

  useEffect( () => {
       setTimeout(async ()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
  
        let location_ = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest, timeInterval: 1000
        });
       
        if(errorMsg){
          setText(errorMsg)
        }

        let data;

        if(Platform.OS==='android'){
          if(location_?.mocked){
            // alert('Anda menggunakan Fake GPS')
            setText('Anda tidak bisa melakukan absen. Anda menggunakan Fake GPS')
          
          }else{
            data =await calculateLocation.convertLatLongToKm(-8.589778, 116.095560, location_?.coords?.latitude, location_?.coords?.longitude)
            if(data <= 0.3){
              setText('Berada dalam Lokasi')
            }else{
              setText('titik berada diluar Radius')
            }
            setLocation(location_)
          }
        }else if(Platform.OS==='ios'){
          data = await calculateLocation.convertLatLongToKm(-8.589778, 116.095560, location_?.coords?.latitude, location_?.coords?.longitude)
          // console.log(data)
          if(data <= 0.3){
            setText('Berada dalam Lokasi')
          }else{
            setText('titik berada diluar Radius')
          }
          setLocation(location_)
        }
        
        // const data = await calculateLocation.convertLatLongToKm(-8.591953060167455, 116.10500976932109, location_?.coords?.latitude, location_?.coords?.longitude)
        // console.log(data)
        
      }, 500)
  }, [location]);

  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.time}>{time.toLocaleTimeString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time:{
    fontSize:40,
    fontWeight:'bold'
  }
});
