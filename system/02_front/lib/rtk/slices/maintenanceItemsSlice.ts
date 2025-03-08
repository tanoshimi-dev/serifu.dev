import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store";

// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const initialState: CustomerState = {
  fetchtSatus: '',
  updateItemStatus: '',
  item: {} as MaintenanceItem,
  items: [] as MaintenanceItem[],  
  updateError: undefined,
  updateErrorData: [],
  reLoginRequired: false,
};

export const getAllItems = createAsyncThunk(
  "maintenanceItems/get", 
  async (thunkApi) => {

    const response = await fetch(`${apiUrl}api/maintenance-items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    
    });

    let returnData = {};
    if (response.status === 419) {
      returnData = { reLoginRequired: true };
      return returnData;
  
    } else if (!response.ok) {
      returnData = await response.json();
  
    } else {
      returnData = await response.json();
    }
  
    return returnData;    

  }
);



const maintenanceItemsSlice = createSlice({
    name: 'maintenanceItems',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {


      builder.addCase(getAllItems.pending, (state, action) => {
        state.fetchtSatus = 'pending'
        state.items = [] as MaintenanceItem[]
      });

      builder.addCase(getAllItems.fulfilled, (state, action: PayloadAction<{ reLoginRequired?: boolean, maintenanceItems?: MaintenanceItem[], updateError?: boolean }>) => {

        state.fetchtSatus = 'success'

        if(action.payload?.reLoginRequired){
          state.reLoginRequired = action.payload.reLoginRequired
          state.reLoginRequired = true

        } else if(action.payload?.maintenanceItems){
          state.items = action.payload.maintenanceItems
        }
        
      });

      builder.addCase(getAllItems.rejected, (state, action) => {
        state.fetchtSatus = 'failed'
      }); 

    }

    
})

export const fetchtSatus            = (state: RootState) => state.maintenanceItems.fetchtSatus;
export const updateItemStatus       = (state: RootState) => state.maintenanceItems.updateItemStatus;
export const item                   = (state: RootState) => state.maintenanceItems.item;
export const items                  = (state: RootState) => state.maintenanceItems.items;

export const updateError            = (state: RootState) => state.maintenanceItems.updateError;
export const updateErrorData        = (state: RootState) => state.maintenanceItems.updateErrorData;
export const reLoginRequired        = (state: RootState) => state.maintenanceItems.reLoginRequired;

export default maintenanceItemsSlice.reducer;

// interfaces
interface CustomerState {
  fetchtSatus: string;
  updateItemStatus: string;
  item: MaintenanceItem;
  items: MaintenanceItem[];
  
  updateError: boolean | undefined;
  updateErrorData: string[];
  reLoginRequired: boolean;
}


interface MaintenanceItem {
  m_itemcode?: number|null;
  m_itemname?: number|null;
}
