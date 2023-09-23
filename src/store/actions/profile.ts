import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiProfile } from "../../api/profile";


export const getProfile= createAsyncThunk(
    'ptk/profile',
    async(nupy:string,{rejectWithValue})=>{
        try{
            const res =  await ApiProfile.get(nupy)
            if(res.status === 200){
                return res.data
            }
        }
        catch(err:any){
            return rejectWithValue(err.response.data.msg)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'ptk/reset/password',
    async(data:any,{rejectWithValue})=>{
        try{
            const res = await ApiProfile.putPassword(data)
            if(res.status === 200){
                return res.data
            }
        }
        catch(err:any){
            return rejectWithValue(err.response.data.msg)
        }
    }
)