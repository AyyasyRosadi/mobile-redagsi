import { createSlice } from "@reduxjs/toolkit";
import { Gaji } from "../interfaces";
import { getBulanPenggajian, getGaji } from "../actions/gaji";

const initialState: Gaji = {
  allGaji: {},
  loadingGaji: false,
  status: "IDDLE",
  msgGaji: "",
  bulanPenggajian : []
};

export const gajiStore = createSlice({
  name: "gaji",
  initialState,
  reducers: {
    clearGaji: (state) => {
      state.allGaji = {};
      state.msgGaji = "";
      state.status = "IDDLE";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGaji.pending, (state) => {
        state.loadingGaji = true;
        state.status = "PENDING";
      })
      .addCase(getGaji.fulfilled, (state, action) => {
        state.loadingGaji = false;
        state.allGaji = action.payload;
        state.status = "SUCCES";
      })
      .addCase(getGaji.rejected, (state, action) => {
        state.loadingGaji = false;
        state.status = "ERROR";
        state.allGaji = {};
        state.msgGaji = 'Invalid token';
      })
      .addCase(getBulanPenggajian.pending, (state) => {
        state.loadingGaji = true;
        state.status = "PENDING";
      })
      .addCase(getBulanPenggajian.fulfilled, (state, action) => {
        state.loadingGaji = false;
        state.bulanPenggajian = action.payload;
        state.status = "SUCCES";
      })
      .addCase(getBulanPenggajian.rejected, (state, action) => {
        state.loadingGaji = false;
        state.status = "ERROR";
        state.allGaji = {};
        state.msgGaji = 'Invalid token';
      });
  },
});

export const gajiActions = gajiStore.actions;
export default gajiStore.reducer;
