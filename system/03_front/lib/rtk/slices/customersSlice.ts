import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState  } from '../store'
import { Customer } from '@/types/customer';
import { TMenteinfo } from '@/types/t_menteinfo';
import { ApiArgsCustomer, ApiArgsCustomersUpdateToPermanent, ApiArgsCustomerUpsert, ApiArgsGetCustomers } from '@/types/api_args';

import { boolean } from "zod";
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const initialState: CustomersState = {
  fetchCustomersStatus: '',
  updateCustomersStatus: '',
  customers: [] as Customer[],
  
  serverErrorOccurred: undefined,
  serverErrorData: [],
  reLoginRequired: false,
};


export const getCustomers = createAsyncThunk(
  "customer/get-customers", 
  async (args: ApiArgsGetCustomers, thankApi) => {

    let queryParam = '?';
    for (const key in args) {
      if (args.hasOwnProperty(key)) {
        console.log(`${key}: ${args[key as keyof ApiArgsGetCustomers]}`);
        queryParam += `${key}=${args[key as keyof ApiArgsGetCustomers]}&`;
      }
    }

    const response = await fetch(`${apiUrl}api/customers/${queryParam}`, {
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


export const updateToPermanent = createAsyncThunk(
  "customer/update-to-permanent", 
  async (params: ApiArgsCustomersUpdateToPermanent) => {

  const formData = new FormData();
  console.log('★API★ updateToPermanent', params);

  // if (params.customer_new_flag) {
  //   formData.append('mu_usercode', params!.customer!.mu_usercode!.toString());
  // }
  // formData.append('customer_new_flag',  params.customer_new_flag ? '0' : '1');
  // formData.append('mu_mnumber',         params!.customer!.mu_mnumber ?? '');

  let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN??''));
  // console.log('★API★ xsrfToken', xsrfToken);

  if (xsrfToken) {
      xsrfToken = xsrfToken.split('=')[1]
  }
  // const response = await fetch(`${apiUrl}api/customer/upsert`, {
  //   method: 'POST',
  //   headers: {
  //     'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
  //   },
  //   credentials: "include",
  //   body: formData
    
  // });

  // let returnData = {};
  // if (response.status === 419) {
  //   returnData = { reLoginRequired: true };
  //   return returnData;

  // } else if (!response.ok) {
  //   returnData = await response.json();

  // } else {
  //   returnData = await response.json();
  // }

  // return returnData;  


});



const customersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      
      // getWithMaintenance
      builder.addCase(getCustomers.pending, (state, action) => {
        state.fetchCustomersStatus = 'pending'
        state.customers = [] as Customer[]
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getCustomers.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, customers?: Customer[], serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        // action) => {

        state.fetchCustomersStatus = 'success'
        
        console.log('payload', action.payload)
        
        console.log('payload', action.payload?.customers)

        // if (action.payload) {
        //   console.log('payload', action.payload?.customer)
        //   console.log('payload', action.payload?.maintenance)
        // }
        if(action.payload?.customers){
          state.customers = action.payload.customers
        }

      });
      builder.addCase(getCustomers.rejected, (state, action) => {
        state.fetchCustomersStatus = 'failed'
      });

      // // upsertCustomer
      // builder.addCase(upsertCustomer.pending, (state, action) => {
      //   state.updateCustomerStatus = 'pending'
      //   state.customer = {} as Customer
      //   state.serverErrorOccurred = false
      // });
      // builder.addCase(upsertCustomer.fulfilled, (state, 
      //   action: PayloadAction<{ reLoginRequired?: boolean, customer?: Customer, maintenance?: TMenteInfo, serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
      //   //action) => {
      //   state.updateCustomerStatus = 'success'
      //     console.log('★API★ upsertCustomer', action.payload);

      //   if(action.payload?.customer){
      //     state.customer = action.payload.customer
      //   }
      //   if(action.payload?.maintenance){
      //     state.maintenance = action.payload.maintenance
      //   }
      //   if(action.payload?.serverError){
      //     state.serverErrorOccurred = action.payload.serverError
      //   }
      //   if(action.payload?.serverErrorData){
      //     state.serverErrorData = action.payload.serverErrorData
      //   }

      // });
      // builder.addCase(upsertCustomer.rejected, (state, action) => {
      //   state.updateCustomerStatus = 'failed'
      // });

    }

})

export const fetchCustomersStatus    = (state: RootState) => state.customers.fetchCustomersStatus;
export const updateCustomersStatus   = (state: RootState) => state.customers.updateCustomersStatus;
export const customers               = (state: RootState) => state.customers.customers;

export const serverErrorOccurred     = (state: RootState) => state.customers.serverErrorOccurred;
export const serverErrorData         = (state: RootState) => state.customers.serverErrorData;
export const reLoginRequired         = (state: RootState) => state.customers.reLoginRequired;


export default customersSlice.reducer;


// interfaces
interface CustomersState {
  fetchCustomersStatus: string;
  updateCustomersStatus: string;
  customers: Customer[];
  
  serverErrorOccurred: boolean | undefined;
  serverErrorData: string[];
  reLoginRequired: boolean;
}

