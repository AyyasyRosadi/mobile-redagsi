import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../actions/auth";
import { Auth } from "../interfaces";

const initialState: Auth = {
  token: "",
  username: "",
  role: "",
  lembaga: "",
  nama : "",
  loadingAuth: false,
  msgAuth: "",
  status: "IDDLE",
};

export const authStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.token = "";
      state.username = "";
      state.role = "";
      state.lembaga = "";
      state.msgAuth = "";
      state.nama = ""
    },
    clearStatus: (state) => {
      state.status = "IDDLE";
      state.msgAuth = "";
    },
    setAuth : (state,action)=>{
        state.token = action.payload.token
        state.username = action.payload.nupy
        state.nama = action.payload.nama
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loadingAuth = true;
        state.status = "PENDING";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.status = "SUCCES";
        state.token = action.payload?.token;
        state.username = action.payload?.user?.username;
        state.lembaga = action.payload?.user?.lembaga;
        state.nama = action.payload?.user?.nama
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingAuth = false;
        state.status = "ERROR";
        state.token = "";
        state.username = "";
        state.lembaga = "";
        state.role = "";
        state.nama = ""
        state.msgAuth = 'Username atau Password Salah'
      })
      .addCase(logout.pending, (state) => {
        state.loadingAuth = true;
        state.status = "PENDING";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.status = "SUCCES";
        state.token = "";
        state.username = "";
        state.lembaga = "";
        state.role = "";
        state.nama = ""
      })
      .addCase(logout.rejected, (state, action) => {
        state.loadingAuth = false;
        state.status = "ERROR";
        state.token = "";
        state.username = "";
        state.lembaga = "";
        state.role = "";
        state.nama = ""
        state.msgAuth = 'Error';
      });

  },
});

export const authActions = authStore.actions;
export default authStore.reducer;
