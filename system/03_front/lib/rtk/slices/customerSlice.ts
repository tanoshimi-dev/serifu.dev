import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState  } from '../store'
import { Customer } from '@/types/customer';
import { TMenteinfo } from '@/types/t_menteinfo';
import { ApiArgsCustomer, ApiArgsCustomerHistories, ApiArgsCustomerUpsert, ApiArgsCustomerWithMaintenance } from '@/types/api_args';

import { boolean } from "zod";
import { stat } from "fs";
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const initialState: CustomerState = {
  fetchCustomerStatus: '',
  updateCustomerStatus: '',
  customer: {} as Customer,
  
  fetchMaintenanceStatus: '',
  updateMaintenanceStatus: '',
  maintenance: {} as TMenteinfo,
  
  fetchMaintenancesStatus: '',
  maintenances: [] as TMenteinfo[],

  serverErrorOccurred: undefined,
  serverErrorData: [],
  reLoginRequired: false,
};


export const getCustomer = createAsyncThunk(
  "customer/get-customer", 
  async (args: ApiArgsCustomer, thankApi) => {

    if (!args.mu_usercode) return;

    const response = await fetch(`${apiUrl}api/customer/${args.mu_usercode}`, {
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

export const getWithMaintenance = createAsyncThunk(
  "customer/get-with-maintenance", 
  async (args: ApiArgsCustomerWithMaintenance, thankApi) => {


    console.log(`★getWithMaintenance★ ${args.mu_usercode}-${args.tm_recnum}`);

    if (!args.mu_usercode) return;
    const tm_recnum = args.tm_recnum ?? '';
    
    const response = await fetch(`${apiUrl}api/customer-with-maintenance/?mu_usercode=${args.mu_usercode}&tm_recnum=${tm_recnum}`, {
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

// export const getCustomerWithoutMaintenance: any = createAsyncThunk(
//   "customer/get-with-mantenance", 
//   async (args: ApiArgsCustomer, thankApi) => {

//     if (!args.mu_usercode) return;

//     const response = await fetch(`${apiUrl}api/customer-without-maintenance/${args.mu_usercode}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         //'Authorization': `Bearer ${localStorage.getItem('token')}`
//         //'Accept': 'application/json',
//       }
//     });

//     let returnData = {};
//     if (response.status === 419) {
//       returnData = { reLoginRequired: true };
//       return returnData;
  
//     } else if (!response.ok) {
//       returnData = await response.json();
  
//     } else {
//       returnData = await response.json();
//     }
  
//     return returnData;  

//   }

// );

export const upsertCustomer = createAsyncThunk(
  "customer/upsert", 
  async (params: ApiArgsCustomerUpsert) => {

  const formData = new FormData();


    console.log('★API★ upsertCustomer', params);

  if (params.customer_new_flag) {
    formData.append('mu_usercode', params!.customer!.mu_usercode!.toString());
  }
  formData.append('customer_new_flag',  params.customer_new_flag ? '0' : '1');
  formData.append('mu_mnumber',         params!.customer!.mu_mnumber ?? '');
  formData.append('mu_username',        params.customer!.mu_username ?? '');
  formData.append('mu_usernamek',       params.customer!.mu_usernamek ?? '');
  formData.append('mu_userperseon',     params.customer!.mu_userperseon ?? '');
  formData.append('mu_modelnum',        params.customer!.mu_modelnum ?? '');
  formData.append('mu_shitencode',      params.customer!.mu_shitencode ?? '');
  formData.append('mu_deliveryperson',  params.customer!.mu_deliveryperson ?? '');
  formData.append('mu_dealername',      params.customer!.mu_dealername ?? '');

  formData.append('mu_dealerperson',       params.customer!.mu_dealerperson ?? '');
  formData.append('mu_hosyucode',       params.customer!.mu_hosyucode ?? '');
  
  formData.append('mu_deliveryyear',    params.customer!.mu_deliveryyear ?? '');
  formData.append('mu_deliverymonth',   params.customer!.mu_deliverymonth ?? '');
  formData.append('mu_deliveryday',     params.customer!.mu_deliveryday ?? '');
  formData.append('mu_nextyear',        params.customer!.mu_nextyear ?? '');
  formData.append('mu_nextmonth',       params.customer!.mu_nextmonth ?? '');
  formData.append('mu_nextday',         params.customer!.mu_nextday ?? '');

  if (params.maintenance_new_flag) {
    formData.append('tm_recnum', params!.maintenance!.tm_recnum!.toString());
  }
  formData.append('maintenance_new_flag', params.maintenance_new_flag ? '0' : '1');
  formData.append('tm_repaircont',        params!.maintenance!.tm_repaircont ?? '');
  formData.append('tm_regularcheck',      params!.maintenance!.tm_regularcheck ?? '');
  formData.append('tm_userctmment',       params!.maintenance!.tm_userctmment ?? '');
  formData.append('tm_pdffilecheck',      params!.maintenance!.tm_pdffilecheck ?? '');

  if (params.input_pdf_file) {
    formData.append('input_pdf_file', params.input_pdf_file);
  }

  let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN??''));
  // console.log('★API★ xsrfToken', xsrfToken);

  if (xsrfToken) {
      xsrfToken = xsrfToken.split('=')[1]
  }
  const response = await fetch(`${apiUrl}api/customer/upsert`, {
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

export const getWithMaintenances = createAsyncThunk(
  "customer/get-with-maintenances", 
  async (args: ApiArgsCustomerHistories, thankApi) => {

    const response = await fetch(`${apiUrl}api/customer-with-maintenances?mu_usercode=${args.mu_usercode}`, {
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


const customerSlice = createSlice({
    name: 'customer',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      
      // getWithMaintenance
      builder.addCase(getWithMaintenance.pending, (state, action) => {
        state.fetchCustomerStatus = 'pending'
        state.customer = {} as Customer
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getWithMaintenance.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, customer?: Customer, maintenance?: TMenteinfo, serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        // action) => {

        state.fetchCustomerStatus = 'success'
        
        console.log('payload', action.payload)
        
        console.log('payload', action.payload?.customer)
        console.log('payload', action.payload?.maintenance)

        // if (action.payload) {
        //   console.log('payload', action.payload?.customer)
        //   console.log('payload', action.payload?.maintenance)
        // }
        if(action.payload?.customer){
          state.customer = action.payload.customer
        }
        if(action.payload?.maintenance){
          state.maintenance = action.payload.maintenance
        }

      });
      builder.addCase(getWithMaintenance.rejected, (state, action) => {
        state.fetchCustomerStatus = 'failed'
      });

      // upsertCustomer
      builder.addCase(upsertCustomer.pending, (state, action) => {
        state.updateCustomerStatus = 'pending'
        state.customer = {} as Customer
        state.serverErrorOccurred = false
      });
      builder.addCase(upsertCustomer.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, customer?: Customer, maintenance?: TMenteinfo, serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        //action) => {
        state.updateCustomerStatus = 'success'
          console.log('★API★ upsertCustomer', action.payload);

        if(action.payload?.customer){
          state.customer = action.payload.customer
        }
        if(action.payload?.maintenance){
          state.maintenance = action.payload.maintenance
        }
        if(action.payload?.serverError){
          state.serverErrorOccurred = action.payload.serverError
        }
        if(action.payload?.serverErrorData){
          state.serverErrorData = action.payload.serverErrorData
        }

      });
      builder.addCase(upsertCustomer.rejected, (state, action) => {
        state.updateCustomerStatus = 'failed'
      });

      // getHistories
      builder.addCase(getWithMaintenances.pending,   (state, action) => {
        state.fetchCustomerStatus = 'pending'
        state.customer = {} as Customer
        state.maintenances = [] as TMenteinfo[]
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getWithMaintenances.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, customer?: Customer, maintenances?: TMenteinfo[], serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        // action) => {

        state.fetchCustomerStatus = 'success'
        
        console.log('payload', action.payload)
        
        console.log('payload', action.payload?.customer)
        console.log('payload', action.payload?.maintenances)

        // if (action.payload) {
        //   console.log('payload', action.payload?.customer)
        //   console.log('payload', action.payload?.maintenance)
        // }
        if(action.payload?.customer){
          state.customer = action.payload.customer
        }
        if(action.payload?.maintenances){
          state.maintenances = action.payload.maintenances
        }

      });
      builder.addCase(getWithMaintenances.rejected,  (state, action) => {
        state.fetchCustomerStatus = 'failed'
      });


    }

})

export const fetchCustomerStatus     = (state: RootState) => state.customer.fetchCustomerStatus;
export const updateCustomerStatus    = (state: RootState) => state.customer.updateCustomerStatus;
export const customer                = (state: RootState) => state.customer.customer;

export const fetchMaintenanceStatus  = (state: RootState) => state.customer.fetchMaintenanceStatus;
export const updateMaintenanceStatus = (state: RootState) => state.customer.updateMaintenanceStatus;
export const maintenance             = (state: RootState) => state.customer.maintenance;

export const fetchMaintenancesStatus = (state: RootState) => state.customer.fetchMaintenancesStatus;
export const maintenances            = (state: RootState) => state.customer.maintenances;

export const serverErrorOccurred     = (state: RootState) => state.customer.serverErrorOccurred;
export const serverErrorData         = (state: RootState) => state.customer.serverErrorData;
export const reLoginRequired         = (state: RootState) => state.customer.reLoginRequired;


export default customerSlice.reducer;


// interfaces
interface CustomerState {
  fetchCustomerStatus: string;
  updateCustomerStatus: string;
  customer: Customer;
  
  fetchMaintenanceStatus: string;
  updateMaintenanceStatus: string;
  maintenance: TMenteinfo;

  fetchMaintenancesStatus: string;
  maintenances: TMenteinfo[],

  serverErrorOccurred: boolean | undefined;
  serverErrorData: string[];
  reLoginRequired: boolean;
}



// interface Maintenance {
//   id: number;
//   name: string | null;
//   memo: string | null;
//   contract_start_date: string | null;
//   contract_end_date: string | null;
// }
