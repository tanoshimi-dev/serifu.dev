import { configureStore } from "@reduxjs/toolkit"
import maintenanceItemsSlice from "@/lib/rtk/slices/maintenanceItemsSlice"
import customerSlice from "@/lib/rtk/slices/customerSlice"
import customersSlice from "@/lib/rtk/slices/customersSlice"
import masterDataSlice from "@/lib/rtk/slices/masterDataSlice"
import accountSlice from "@/lib/rtk/slices/accountSlice"

export const store = configureStore({
    reducer: {
        maintenanceItems: maintenanceItemsSlice,
        customer:         customerSlice,
        customers:        customersSlice,
        masterData:       masterDataSlice,
        account:          accountSlice,
    }
})


export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;