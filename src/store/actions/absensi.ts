import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiAbsensi } from "../../api/absensi";
import { AddAbsensi } from "../interfaces";


export const getAllAbsensi = createAsyncThunk(
    'ptk/absensi/get',
    async(nupy:string,{rejectWithValue})=>{
        try{
            const res = await ApiAbsensi.getAbsensi(nupy)
            if(res.status === 200){
                return res.data
            }
        }
        catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)

export const addAbsensi = createAsyncThunk(
    'ptk/absensi/post',
    async(data:AddAbsensi,{rejectWithValue})=>{
        try{
            const res = await ApiAbsensi.postAbsensi(data)
            if(res.status === 200){
                return res.data
            }
        }
        catch(err){
            return rejectWithValue(err.response.data.msg)
        }
    }
)