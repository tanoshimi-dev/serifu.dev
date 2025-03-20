import { configureStore } from "@reduxjs/toolkit"
import maintenanceItemsSlice from "@/lib/rtk/slices/maintenanceItemsSlice"
import accountSlice from "@/lib/rtk/slices/accountSlice"

export const store = configureStore({
    reducer: {
        maintenanceItems: maintenanceItemsSlice,
        account:          accountSlice,
    }
})


export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;