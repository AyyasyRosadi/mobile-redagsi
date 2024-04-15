import { AbsensiAttributes, BulanPenggajianAttributes, GajiAttributes, InformationAttributes, ProfileAttributes, RiwayatAbsensiAttributes } from "../type"

export interface Absensi {
    loadingAbsensi: boolean
    allAbsensi: AbsensiAttributes
    riwayatAbsensi: RiwayatAbsensiAttributes
    msgAbsensi: string
    status: string
    hasAbsen: string
}

export interface Gaji {
    allGaji: GajiAttributes
    bulanPenggajian: BulanPenggajianAttributes
    loadingGaji: boolean
    msgGaji: string
    status: string
}

export interface GetGajiByBulan {
    nupy: string
    bulan: string
}

export interface AddAbsensi {
    nupy: string
}

export interface Auth {
    token: string
    username: string
    role: string
    lembaga: string
    nama: string
    loadingAuth: boolean
    msgAuth: string
    status: string
}

export interface Profile {
    profile: ProfileAttributes
    loadingProfile: boolean
    msgProfile: string
    status: string
}

export interface Information {
    allInformation: InformationAttributes
    loadingInformation: boolean
    msgInformation: string
    status: string
} 