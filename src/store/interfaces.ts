export interface Absensi {
    loadingAbsensi : boolean
    allAbsensi : any
    riwayatAbsensi : any
    msgAbsensi : any
    status : string
    hasAbsen : string
}

export interface Gaji {
    allGaji : any
    bulanPenggajian : string[]
    loadingGaji : boolean
    msgGaji : any
    status : string
}

export interface GetGajiByBulan {
    nupy:string
    bulan:string
}

export interface AddAbsensi {
    nupy : string
}

export interface Auth {
    token : string
    username : string
    role : string
    lembaga : string
    nama : string
    loadingAuth : boolean
    msgAuth : any
    status : string
}