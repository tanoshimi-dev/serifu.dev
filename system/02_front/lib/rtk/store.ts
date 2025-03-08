import { configureStore } from "@reduxjs/toolkit"
import maintenanceItemsSlice from "@/lib/rtk/slices/maintenanceItemsSlice"
import customerSlice from "@/lib/rtk/slices/customerSlice"
import customersSlice from "@/lib/rtk/slices/customersSlice"
import masterDataSlice from "@/lib/rtk/slices/masterDataSlice"
import accountSlice from "@/lib/rtk/slices/accountSlice"
import temporaryListSlice from "@/lib/rtk/slices/temporaryListSlice"

export const store = configureStore({
    reducer: {
        maintenanceItems: maintenanceItemsSlice,
        customer:         customerSlice,
        customers:        customersSlice,
        masterData:       masterDataSlice,
        account:          accountSlice,
        temporaryList:    temporaryListSlice,
    }
})


export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>;