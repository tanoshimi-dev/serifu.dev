import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState  } from '../store'
import { Customer } from '@/types/customer';
import { TMenteinfo } from '@/types/t_menteinfo';
import { TemporaryData } from '@/types/temporary_data';
import { ApiArgsCustomer, ApiArgsCustomerUpsert, ApiArgsGetCustomers, ApiArgsTemporaryListUpdateStatus } from '@/types/api_args';

import { boolean } from "zod";
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const initialState: TemporaryListState = {
  fetchStatus: '',
  updateStatus: '',
  list:            [] as TemporaryData[],
  
  serverErrorOccurred: undefined,
  serverErrorData: [],
  reLoginRequired: false,
};


export const getTemporaryList = createAsyncThunk(
  "temporary-list/get-list", 
  async (thankApi) => {

    // let queryParam = '?';
    // for (const key in args) {
    //   if (args.hasOwnProperty(key)) {
    //     console.log(`${key}: ${args[key as keyof ApiArgsGetCustomers]}`);
    //     queryParam += `${key}=${args[key as keyof ApiArgsGetCustomers]}&`;
    //   }
    // }

    const response = await fetch(`${apiUrl}api/temporary/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
        //'Accept': 'application/json',
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


export const update = createAsyncThunk(
  "temporary-list/update-status", 
  async (params: ApiArgsTemporaryListUpdateStatus) => {

  const formData = new FormData();
  params.updateList?.forEach((item, index) => {
    formData.append(`updateList[${index}]`, JSON.stringify(item));
  });
  let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN??''));
  // console.log('★API★ xsrfToken', xsrfToken);

  if (xsrfToken) {
      xsrfToken = xsrfToken.split('=')[1]
  }
  const response = await fetch(`${apiUrl}api/temporary/list-update`, {
    method: 'POST',
    headers: {
      'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
    },
    credentials: "include",
    body: formData
    
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


});



const temporaryListSlice = createSlice({
    name: 'temporaryList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      
      // getTemporaryList
      builder.addCase(getTemporaryList.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.list = [] as TemporaryData[]
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getTemporaryList.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, list?: TemporaryData[], serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        // action) => {

        state.fetchStatus = 'success'
        
        console.log('payload', action.payload)
        
        console.log('payload', action.payload?.list)

        // if (action.payload) {
        //   console.log('payload', action.payload?.customer)
        //   console.log('payload', action.payload?.maintenance)
        // }
        if(action.payload?.list){
          state.list = action.payload.list
        }

      });
      builder.addCase(getTemporaryList.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

      // // update
      builder.addCase(update.pending, (state, action) => {
        state.updateStatus = 'pending'
        state.list = [] as TemporaryData[]
        state.serverErrorOccurred = false
      });
      builder.addCase(update.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, list?: TemporaryData[], serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
          //action) => {
        state.updateStatus = 'success'
          console.log('★API★ update', action.payload);

        if(action.payload?.list){
          state.list = action.payload.list
        }

        if(action.payload?.serverError){
          state.serverErrorOccurred = action.payload.serverError
        }
        if(action.payload?.serverErrorData){
          state.serverErrorData = action.payload.serverErrorData
        }

      });
      builder.addCase(update.rejected, (state, action) => {
        state.updateStatus = 'failed'
      });

    }

})

export const fetchStatus             = (state: RootState) => state.temporaryList.fetchStatus;
export const updateStatus            = (state: RootState) => state.temporaryList.updateStatus;
export const list                    = (state: RootState) => state.temporaryList.list;

export const serverErrorOccurred     = (state: RootState) => state.temporaryList.serverErrorOccurred;
export const serverErrorData         = (state: RootState) => state.temporaryList.serverErrorData;
export const reLoginRequired         = (state: RootState) => state.temporaryList.reLoginRequired;


export default temporaryListSlice.reducer;


// interfaces
interface TemporaryListState {
  fetchStatus:    string;
  updateStatus:   string;
  list:           TemporaryData[];
  
  serverErrorOccurred: boolean | undefined;
  serverErrorData: string[];
  reLoginRequired: boolean;
}

