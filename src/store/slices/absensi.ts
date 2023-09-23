import { createSlice } from "@reduxjs/toolkit";
import { getAllAbsensi,addAbsensi, getAllRiwayat } from "../actions/absensi";
import { Absensi } from "../interfaces";

const initialState : Absensi = {
    allAbsensi : {},
    loadingAbsensi : false,
    riwayatAbsensi : {},
    msgAbsensi : "",
    status : "IDDLE",
    hasAbsen: "WAITING"
}

export const absensiStore = createSlice({
    name:"absensi",
    initialState,
    reducers : {
        clearAbsensi : (state)=>{
            state.allAbsensi = {}
            state.msgAbsensi = ""
            state.hasAbsen = "WAITING"
            state.status = "IDDLE"
        },
        clearRiwayat : (state)=>{
            state.riwayatAbsensi = {}
            state.msgAbsensi = ""
            state.status = "IDDLE"
        },
        clearHasAbsen : (state)=>{
            state.hasAbsen = "WAITING"
        }
    },
    extraReducers : builder =>{
        builder
        .addCase(getAllAbsensi.pending,(state)=>{
            state.loadingAbsensi = true
            state.status = "PENDING"

        })
        .addCase(getAllAbsensi.fulfilled,(state,action)=>{
            state.loadingAbsensi = false
            state.allAbsensi = action.payload
            state.status = "SUCCES"
        })
        .addCase(getAllAbsensi.rejected,(state,action)=>{
            state.loadingAbsensi = false
            state.allAbsensi = action.payload
            state.status = "ERROR"
        })
        .addCase(getAllRiwayat.pending,(state)=>{
            state.loadingAbsensi = true
            state.status = "PENDING"

        })
        .addCase(getAllRiwayat.fulfilled,(state,action)=>{
            state.loadingAbsensi = false
            state.riwayatAbsensi = action.payload
            state.status = "SUCCES"
        })
        .addCase(getAllRiwayat.rejected,(state,action)=>{
            state.loadingAbsensi = false
            state.riwayatAbsensi = []
            state.status = "ERROR"
        })
        .addCase(addAbsensi.pending,(state)=>{
            state.loadingAbsensi = true
            state.status = "PENDING"
            state.hasAbsen = "WAITING"
        })
        .addCase(addAbsensi.fulfilled,(state,action)=>{
            state.loadingAbsensi = false
            state.msgAbsensi = "Berhasil"
            state.status = "SUCCES"
            state.hasAbsen = "SUCCES"
        })
        .addCase(addAbsensi.rejected,(state,action)=>{
            state.loadingAbsensi = false
            state.msgAbsensi = action.payload
            state.status = "ERROR"
            state.hasAbsen = "REJECT"
        })

    }
})

export const absensiActions = absensiStore.actions
export default absensiStore.reducer