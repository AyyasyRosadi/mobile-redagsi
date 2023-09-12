import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { persistStore,} from "redux-persist"
import thunk, { ThunkDispatch } from "redux-thunk";
import absensiStore from "./slices/absensi";
import gajiStore from "./slices/gaji";
import authStore from "./slices/auth";

export const store = configureStore({
    reducer:{
        auth : authStore,
        absensi : absensiStore,
        gaji : gajiStore
    },
    middleware:[thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const persistor = persistStore(store)