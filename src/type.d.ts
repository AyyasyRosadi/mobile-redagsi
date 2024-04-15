type TimeAttributes = {
    start?: Date;
    end?: Date;
}
type LocationAttributes = {
    langitude?: number;
    longitude?: number;
}

export type AbsensiAttributes = {
    masuk?: boolean;
    start?: boolean;
    end?: boolean;
    total_absen?: number;
    absen?: TimeAttributes;
    location?: LocationAttributes;
    msg?: string | null
}

export type RiwayatAbsensiAttributes = {
    nupy?: string;
    nama?: string;
    absensi_mobile_users?: Array<TimeAttributes>
}

export type GajiAttributes = {
    nupy?: string;
    nama?: string;
    tugasTambahans?: Array<{
        kode_tugasTambahan?: number,
        listTugasTambahan?: {
            nama_tugasTambahan?: string;
            nominal?: number;
        }
    }>;
    statusPtk?: {
        uuid?: string;
        status_kepegawaian?: number;
        masa_kerja?: number;
        golongan?: string;
        kode_satker?: number;
        kode_tugasPokok?: number;
        id_location?: number;
        kode_lembaga?: number;
        listSatker?: {
            nama_satker?: string;
        };
        listTugasPokok?: {
            nama_tugasPokok?: string;
            nominal?: number;
        }
    };
    gaji_approvals?: Array<
        {
            uuid?: string;
            gapok?: number;
            tugas_pokok?: number;
            total_tugas_tambahan?: number;
            absensi?: number;
            thp?: number;
            bulan?: string;
            tahun?: string;
            total_potongan?: number;
            finalTHP?: number;
            uuid_ptk?: string;
        }
    >;
    titipan_potongans?: Array<
        {
            ket?: string;
            nominal?: number;
            bulan?: string;
            tahun?: string;
            uuid_ptk?: string
        }
    >;
    pinjaman_ptks?: Array<{
        uuid?: string;
        nominal?: number;
        potongan?: number;
        optional_potongan?: number;
        ket?: string;
        proses?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
        uuid_ptk?: string;
        pembayaran_ptks?: Array<
            {
                uuid?: string;
                nominal?: number;
                tahun?: string;
                bulan?: string;
                createdAt?: Date
                updatedAt?: Date
                uuid_pinjaman?: string
            }
        >
    }>
}

export type BulanPenggajianAttributes = Array<
    {
        uuid?: string;
        index_bulan?: number;
        bulan?: string;
        tahun_ajar?: string;
        status?: number;
        show_mobile?: Date;
        createdAt?: Date;
        updatedAt?: Date;
    }
>

export type ProfileAttributes = {
    uuid?: string;
    nupy?: string;
    nama?: string;
    tempat_lahir?: string;
    tanggal_lahir?: string;
    alamat?: string;
    kecamatan?: string;
    kabupaten?: string;
    provinsi?: string;
    gender?: string;
    no_hp?: string;
    status_pernikahan?: string;
    pendidikan_terakhir?: string;
    gelar?: string;
    gol_darah?: string;
    createdAt?: Date;
    updatedAt?: Date;
    statusPtk?: {
        uuid?: string;
        status_kepegawaian?: number;
        active?: boolean;
        masa_kerja?: number;
        golongan?: string;
        createdAt?: Date;
        updatedAt?: Date;
        kode_satker?: number;
        kode_tugasPokok?: number;
        id_location?: number;
        kode_lembaga?: number;
        uuid_ptk?: string;
        listSatker?: {
            nama_satker?: string
        };
        lembaga?: {
            nama?: string
        };
        listTugasPokok?: {
            nama_tugasPokok?: string
        }
    }
}

type InformationAttributes = Array<{
    uuid?: string;
    title?: string;
    informasi?: string;
    statusInformasi?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}>

export type PostLogin = {
    username?: string
    password?: string
    sistem?: string
}

export type PostRiwayatAbsensi = {
    nupy?: string
    start?: string
    end?: string
}

export type PostAbsensi = {
    nupy?: string
}

export type PostResetPassword = {
    nama: string;
    username: string;
    new_pass: string;
    old_pass: string;
}