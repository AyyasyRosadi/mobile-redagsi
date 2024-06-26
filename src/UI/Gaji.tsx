import { View, Text, SafeAreaView, ScrollView, Image, Platform } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Menu from '../templates/Menu'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import gaji from "../assets/gaji.png"
import hutang from "../assets/debt.png"
import { currency } from '../helper/currency'
import { optionsBulan } from "../helper/options"
import FieldGaji from '../components/custom/FieldGaji'
import { Picker, PickerIOS } from '@react-native-picker/picker'
import Loader from '../templates/Loader'
import useGetBulanPenggajian from '../hooks/dispatch/useGetBulanPenggajian'
import useGetGaji from '../hooks/dispatch/useGetGaji'
import useClearGaji from '../hooks/dispatch/useClearGaji'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'

export default function Gaji({ navigation }): ReactNode {
  const { username } = useSelector((state: RootState) => state.auth)
  const { allGaji, bulanPenggajian, loadingGaji } = useSelector((state: RootState) => state.gaji)
  const [indexBulan, setIndexBulan] = useState<string>("")
  useGetBulanPenggajian()
  useGetGaji(indexBulan, username)
  useClearGaji(navigation, setIndexBulan)
  return (
    <SafeAreaView>
      <View className={`h-screen bg-slate-50 w-screen ${Platform.OS === "android" ? "mt-[2vh]" : ""}`}>
        <Loader show={loadingGaji} />
        <StatusBar backgroundColor="#ffff" />
        <ScrollView>
          <View className='h-full py-[10%] flex flex-col space-y-[3%] mb-[15vh]'>
            <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
              <View className={`flex rounded-lg  bg-white border`}>
                {Platform.OS === "android" ?
                  <Picker
                    selectedValue={indexBulan}
                    onValueChange={(value) => {
                      setIndexBulan(value)
                    }}
                  >
                    <Picker.Item label={"Pilih Bulan"} value={""} />
                    {bulanPenggajian.length > 0 ? bulanPenggajian?.map((d, id) => (
                      <Picker.Item key={id} label={optionsBulan[d.index_bulan!].label} value={d.bulan} />
                    ))
                      :
                      <Picker.Item label={""} value={""} />
                    }
                  </Picker>

                  :

                  <PickerIOS
                    style={{ height: 70 }}
                    itemStyle={{ height: 100 }}
                    selectedValue={indexBulan}
                    onValueChange={(value: ItemValue) => {
                      setIndexBulan(typeof value === 'string' ? value : '')
                    }}
                  >
                    <PickerIOS.Item value="" label='Pilih Bulan' />
                    {bulanPenggajian.length > 0 ? bulanPenggajian?.map((d, id) => (
                      <PickerIOS.Item key={id} label={optionsBulan[d.index_bulan!].label} value={d.bulan} />
                    ))
                      :
                      <PickerIOS.Item label={""} value={""} />
                    }
                  </PickerIOS>

                }
              </View>
            </View>
            {allGaji !== null ?
              indexBulan !== "" && indexBulan !== null && Object.keys(allGaji)?.length !== 0 ?
                <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                  <View className='flex flex-row space-x-3'>
                    <View className='w-[15%]'>
                      <Image source={gaji} alt='' className='w-12 h-12' />
                    </View>
                    <View className='w-[85%] my-auto'>
                      <Text className='font-bold text-lg uppercase'>Gaji</Text>
                    </View>
                  </View>
                  {Object.keys(allGaji).length !== 0 && allGaji.gaji_approvals ?
                    <View className='mt-3'>
                      <Text className='font-bold'>A. Gaji Dasar</Text>
                      <View className='ml-[7%] mt-3 mb-1'>
                        <FieldGaji list title='Gaji Pokok' value={currency(allGaji?.gaji_approvals[0]?.gapok!)} />
                        <FieldGaji list title='Tunj. Profesi' value={currency(allGaji?.gaji_approvals[0]?.tugas_pokok!)} />
                      </View>
                      <Text className='font-bold'>B. Tunjangan Lainnya</Text>
                      <View className='ml-[7%] mt-3 mb-1'>
                        <FieldGaji list title='Tunj. Kehadiran' value={currency(allGaji?.gaji_approvals[0]?.absensi!)} />
                      </View>
                      <Text className='font-bold'>C. Tugas Tambahan</Text>
                      {allGaji?.tugasTambahans?.length !== 0 ?
                        <View className='ml-[7%] mt-3 mb-1'>
                          {allGaji?.tugasTambahans?.map((d, i: number) => (
                            <View key={i}>
                              <FieldGaji list title={d.listTugasTambahan?.nama_tugasTambahan!} value={currency(d.listTugasTambahan?.nominal!)} />
                            </View>
                          ))}
                        </View>
                        :
                        <Text className='my-3 font-bold text-xl'>-</Text>
                      }
                      <View className='bg-slate-900 w-full h-[2px] mt-2 mb-4'></View>
                      <View className='-ml-[3%]'>
                        <FieldGaji title='Total Gaji' value={currency(allGaji?.gaji_approvals[0]?.thp!)} />
                      </View>
                    </View>
                    :
                    <></>
                  }
                </View>
                :
                <></>
              :
              <></>
            }
            {allGaji !== null ?
              indexBulan !== "" && indexBulan !== null && Object.keys(allGaji)?.length !== 0 ?
                <View className='bg-slate-200 w-[90%] mx-auto rounded-xl shadow-xl p-4'>
                  <View className='flex flex-row space-x-3'>
                    <View className='w-[15%]'>
                      <Image source={hutang} alt='' className='w-12 h-12' />
                    </View>
                    <View className='w-[85%] my-auto'>
                      <Text className='font-bold text-lg uppercase'>Pinjaman</Text>
                    </View>
                  </View>
                  {Object.keys(allGaji).length !== 0 && allGaji.titipan_potongans && allGaji.pinjaman_ptks && allGaji.gaji_approvals ?
                    allGaji?.pinjaman_ptks.length > 0 || allGaji?.titipan_potongans.length > 0 ?
                      <View className='mt-3'>
                        <Text className='font-bold'>D. Potongan</Text>
                        <View className='ml-[7%] mt-3 mb-1'>
                          {allGaji.pinjaman_ptks.map((d, i: number) => {
                            if (d.pembayaran_ptks?.length! > 0) {
                              return <View key={i}>
                                <FieldGaji list title={d.ket!} value={currency(d.potongan!)} />
                              </View>
                            }
                          })}
                          {allGaji.titipan_potongans.map((s, i: number) => (
                            <View key={i}>
                              <FieldGaji list title={s.ket!} value={currency(s.nominal!)} />
                            </View>
                          ))}
                        </View>
                        <View className='bg-slate-900 w-full h-[1%] mt-2 mb-4'></View>
                        <View className='-ml-[3%]'>
                          <FieldGaji title='Take Home Pay (THP)' value={currency(allGaji?.gaji_approvals[0]?.finalTHP!)} />
                        </View>
                      </View>
                      :
                      <View>
                        <Text className='my-3 font-bold text-xl'>-</Text>
                        <View className='bg-slate-900 w-full h-[2px] mt-2 mb-4'></View>
                        <View className='-ml-[3%]'>
                          <FieldGaji title='Take Home Pay (THP)' value={currency(allGaji?.gaji_approvals[0]?.finalTHP!)} />
                        </View>
                      </View>
                    :
                    <></>
                  }
                </View>
                :
                <></>
              :
              <></>
            }
          </View>
        </ScrollView>
        <Menu index={1} />
      </View >
    </SafeAreaView>
  )
}