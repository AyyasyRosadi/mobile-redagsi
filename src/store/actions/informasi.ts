import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiInformation } from "../../api/informasi";

export const getAllInformation = createAsyncThunk(
    'ptk/information',
    async(_,{rejectWithValue})=>{
        try{
            const res = await ApiInformation.getInformation()
            if(res.status === 200){
                return res.data
            }
        }
        catch(err:any){
            return rejectWithValue(err.response.data.msg)
        }
    }
)