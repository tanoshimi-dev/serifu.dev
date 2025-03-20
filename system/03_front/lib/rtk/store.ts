import { configureStore } from "@reduxjs/toolkit"
import accountSlice from "@/lib/rtk/slices/accountSlice"
import serifuUseSlice from "@/lib/rtk/slices/serifuUseSlice"

export const store = configureStore({
    reducer: {
        account:          accountSlice,
        serifuUse:        serifuUseSlice,
    }
})


export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;