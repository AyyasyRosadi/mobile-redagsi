import { createSlice } from "@reduxjs/toolkit";
import { getAllInformation } from "../actions/informasi";
import { Information } from "../interfaces";

const initialState : Information = {
    allInformation : [],
    loadingInformation : false,
    msgInformation : "",
    status : "IDDLE"
}

export const informasiStore = createSlice({
    name:"informasi",
    initialState,
    reducers : {
        clearInformasi : (state)=>{
            state.allInformation = []
            state.msgInformation = ""
            state.status = "IDDLE"
        }
    },
    extraReducers : builder =>{
        builder
        .addCase(getAllInformation.pending,(state)=>{
            state.loadingInformation = true
            state.status = "PENDING"
        })
        .addCase(getAllInformation.fulfilled,(state,action)=>{
            state.loadingInformation = false
            state.allInformation = action.payload
            state.status = "SUCCES"
        })
        .addCase(getAllInformation.rejected,(state,action)=>{
            state.loadingInformation = false
            state.status = "ERROR"
            state.allInformation = []
            state.msgInformation = 'Invalid token'
        })
    }
})

export const informasiActions = informasiStore.actions
export default informasiStore.reducer