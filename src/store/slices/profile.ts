import { createSlice } from "@reduxjs/toolkit";
import { getProfile, resetPassword } from "../actions/profile";
import { Profile } from "../interfaces";


const initialState : Profile={
    profile:{},
    loadingProfile:false,
    status:"IDDLE",
    msgProfile: ""
}

export const profileStore = createSlice({
    name:"profile",
    initialState,
    reducers:{
        clearProfle:(state)=>{
            state.profile = {}
            state.status = "IDDLE"
            state.msgProfile = "" 
        },
        clearStatus : (state)=>{
            state.msgProfile = ""
            state.status = "IDDLE"
        }
    },
    extraReducers: builder=>{
        builder
        .addCase(getProfile.pending,(state)=>{
            state.loadingProfile = true
            state.status = "PENDING"
        })
        .addCase(getProfile.fulfilled,(state,action)=>{
            state.loadingProfile = false
            state.profile = action.payload
        })
        .addCase(getProfile.rejected,(state,action)=>{
            state.loadingProfile = false
            state.profile = {}
            state.msgProfile = 'Invalid token'
        })
        .addCase(resetPassword.pending,(state)=>{
            state.loadingProfile = true
            state.status = "PENDING"
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.loadingProfile = false
            state.status = "SUCCES"
            state.msgProfile = action.payload.msg
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.loadingProfile = false
            state.status = "ERROR"
            state.msgProfile = 'Invalid token'
        })

    }
})

export const profileActions = profileStore.actions
export default profileStore.reducer