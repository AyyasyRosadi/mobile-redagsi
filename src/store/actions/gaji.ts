import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGaji } from "../../api/gaji";
import { GetGajiByBulan } from "../interfaces";

export const getGaji = createAsyncThunk(
    'ptk/gaji/get',
    async(data:GetGajiByBulan,{rejectWithValue})=>{
        try{
            const res = await ApiGaji.get(data.nupy,data.bulan)
            if(res.status === 200){
                return res.data
            }
        }
        catch(err:any){
            return rejectWithValue(err.response.data.msg)
        }
    }
)
export const getBulanPenggajian = createAsyncThunk(
    'ptk/list-penggajian/get',
    async(_,{rejectWithValue})=>{
        try{
            const res = await ApiGaji.getBulan()
            if(res.status === 200){
                return res.data
            }
        }
        catch(err:any){
            return rejectWithValue(err.response.data.msg)
        }
    }
)