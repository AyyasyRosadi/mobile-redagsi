import { View, Text, SafeAreaView, ScrollView, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '../store'
import { getBulanPenggajian, getGaji } from '../store/actions/gaji'
import abhur from "../assets/abhur.png"
import Field from '../components/custom/FieldTitle'
import gaji from "../assets/gaji.png"
import hutang from "../assets/debt.png"
import { optionsBulan, selectBulan } from '../helper/options'
import { currency } from '../helper/currency'
import FieldTitle from '../components/custom/FieldTitle'
import FieldGaji from '../components/custom/FieldGaji'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import Loader from '../templates/Loader'
import { gajiActions } from '../store/slices/gaji'

export default function Gaji() {
  const dispatch = useDispatch<AppThunkDispatch>()
  const { allGaji, bulanPenggajian, loadingGaji } = useSelector((state: RootState) => state.gaji)
  const [getBulan, setGetBulan] = useState<any>(null)
  const date = new Date()
  useEffect(() => {
    dispatch(gajiActions.clearGaji())
    if (getBulan !== null) {
      dispatch(getGaji({ nupy: "19890120111073", bulan: getBulan }))
    }
  }, [getBulan])
  useEffect(() => {
    dispatch(getBulanPenggajian())
  }, [])
  return (
    <SafeAreaView>
      <Loader show={loadingGaji} />
      <StatusBar backgroundColor="#ffff" />
      <View className='h-[100vh] bg-slate-50 mt-[3vh]'>
        <ScrollView>
          <View className='h-full py-[10%] flex flex-col space-y-[3%] mb-[15vh]'>
            <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
              <View className={`flex bg-white border ${Platform.OS === "android" ? "rounded-lg" : "rounded-none p-2"}`}>

                {Platform.OS === "android" ?
                  <Picker
                    selectedValue={getBulan}
                    onValueChange={(value) => {
                      setGetBulan(value)
                    }}
                  >
                    <Picker.Item value="" label='Pilih Bulan' />
                    {bulanPenggajian.length > 0 ? bulanPenggajian?.map((d: any, id) => (
                      <Picker.Item key={id} label={optionsBulan[d.index_bulan].label} value={d.bulan} />
                    ))
                      :
                      <Picker.Item key={0} label={""} value={""} />
                    }
                  </Picker>
                  :
                  <PickerIOS
                    selectedValue={getBulan}
                    onValueChange={(value: any) => {
                      setGetBulan(value)
                    }}
                  >
                    <Picker.Item value="" label='Pilih Bulan' />
                    {bulanPenggajian.length > 0 ? bulanPenggajian?.map((d: any, id) => (
                      <Picker.Item key={id} label={optionsBulan[d.index_bulan].label} value={d.bulan} />
                    ))
                      :
                      <Picker.Item key={0} label={""} value={""} />
                    }
                  </PickerIOS>

                }
              </View>
            </View>
            {getBulan !== "" && getBulan !== null ?
              <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                <View className='flex flex-row space-x-3'>
                  <View className='w-[20%]'>
                    <Image source={abhur} alt='' className='w-16 h-16' />
                  </View>
                  <View className='w-[80%] my-auto'>
                    <Text>PONPES ABU HURAIRAH MATARAM</Text>
                    <Text>JLN. MAJAPAHIT 54B MATARAM (0370) 639526</Text>
                  </View>
                </View>
                {allGaji !== null ?
                  Object.keys(allGaji).length !== 0 ?
                    <View className='mt-3'>
                      <FieldTitle title='NAMA' value={allGaji?.nama} />
                      <FieldTitle title='NUPY' value={allGaji?.nupy} />
                      <FieldTitle title='SATKER' value={allGaji?.statusPtk?.listSatker?.nama_satker} />
                    </View>
                    :
                    <></>
                  :
                  <></>
                }
              </View>
              :
              <></>
            }
            {getBulan !== "" && getBulan !== null ?
              <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                <View className='flex flex-row space-x-3'>
                  <View className='w-[15%]'>
                    <Image source={gaji} alt='' className='w-12 h-12' />
                  </View>
                  <View className='w-[85%] my-auto'>
                    <Text className='font-bold text-lg uppercase'>Gaji</Text>
                  </View>
                </View>
                {allGaji !== null ?
                  Object.keys(allGaji).length !== 0 ?
                    <View className='mt-3'>
                      <Text className='font-bold'>A. Gaji Dasar</Text>
                      <View className='ml-[7%] mt-3 mb-1'>
                        <FieldGaji list title='Gaji Pokok' value={currency(allGaji?.gaji_approvals[0]?.gapok)} />
                        <FieldGaji list title='Tunj. Profesi' value={currency(allGaji?.gaji_approvals[0]?.tugas_pokok)} />
                      </View>
                      <Text className='font-bold'>B. Tunjangan Lainnya</Text>
                      <View className='ml-[7%] mt-3 mb-1'>
                        <FieldGaji list title='Tunj. Kehadiran' value={currency(allGaji?.gaji_approvals[0]?.absensi)} />
                      </View>
                      <Text className='font-bold'>C. Tugas Tambahan</Text>
                      {allGaji?.tugasTambahans?.length !== 0 ?
                        <View className='ml-[7%] mt-3 mb-1'>
                          {allGaji?.tugasTambahans?.map((d: any, i: any) => (
                            <View key={i}>
                              <FieldGaji list title={d.listTugasTambahan?.nama_tugasTambahan} value={currency(d.listTugasTambahan?.nominal)} />
                            </View>
                          ))}
                        </View>
                        :
                        <Text className='my-3 font-bold text-xl'>-</Text>
                      }
                      <View className='bg-slate-900 w-full h-[2px] mt-2 mb-4'></View>
                      <View className='-ml-[3%]'>
                        <FieldGaji title='Total Gaji' value={currency(allGaji?.gaji_approvals[0]?.thp)} />
                      </View>
                    </View>
                    :
                    <></>
                  :
                  <></>
                }
              </View>
              :
              <></>
            }
            {getBulan !== "" && getBulan !== null ?
              <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                <View className='flex flex-row space-x-3'>
                  <View className='w-[15%]'>
                    <Image source={hutang} alt='' className='w-12 h-12' />
                  </View>
                  <View className='w-[85%] my-auto'>
                    <Text className='font-bold text-lg uppercase'>Pinjaman</Text>
                  </View>
                </View>
                {allGaji !== null ?
                  Object.keys(allGaji).length !== 0 ?
                    allGaji?.pinjaman_ptks.length > 0 || allGaji?.titipan_potongans.length > 0 ?
                      <View className='mt-3'>
                        <Text className='font-bold'>D. Potongan</Text>
                        <View className='ml-[7%] mt-3 mb-1'>
                          {allGaji.pinjaman_ptks.map((d: any, i: number) => (
                            <View key={i}>
                              <FieldGaji list title={d.ket} value={currency(d.potongan)} />
                            </View>
                          ))}
                          {allGaji.titipan_potongans.map((s: any, i: number) => (
                            <View key={i}>
                              <FieldGaji list title={s.ket} value={currency(s.nominal)} />
                            </View>
                          ))}
                        </View>
                        <View className='bg-slate-900 w-full h-[1%] mt-2 mb-4'></View>
                        <View className='-ml-[3%]'>
                          <FieldGaji title='Take Home Pay (THP)' value={currency(allGaji?.gaji_approvals[0]?.finalTHP)} />
                        </View>
                      </View>
                      :
                      <View>
                        <Text className='my-3 font-bold text-xl'>-</Text>
                        <View className='bg-slate-900 w-full h-[2px] mt-2 mb-4'></View>
                        <View className='-ml-[3%]'>
                          <FieldGaji title='Take Home Pay (THP)' value={currency(allGaji?.gaji_approvals[0]?.finalTHP)} />
                        </View>
                      </View>
                    :
                    <></>
                  :
                  <></>
                }
              </View>
              :
              <></>
            }
          </View>
        </ScrollView>
      </View >
      <Menu index={2} />
    </SafeAreaView >
  )
}