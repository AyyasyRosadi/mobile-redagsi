import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiAuth } from "../../api/auth";
import { Login } from "../../api/interfaces";


export const login = createAsyncThunk(
    'ptk/login',
    async(data:Login,{rejectWithValue})=>{
        try{
            const res = await ApiAuth.isLogin(data)
            if(res.status === 200){
                return res.data
            }
        }
        catch(err:any){
            return rejectWithValue(err.response.data.msg)
        }
    }
)

export const logout = createAsyncThunk(
    'ptk/logout',
    async(_,{rejectWithValue})=>{
        try{
            const res= await ApiAuth.isLogout()
            if(res.status === 200){
                return res.data
            }
        }
        catch(err:any){
            return rejectWithValue(err.response.data.msg)
        }
    }
)