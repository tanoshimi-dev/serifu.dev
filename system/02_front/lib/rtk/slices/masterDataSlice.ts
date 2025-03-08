import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState  } from '../store'
import { Customer } from '@/types/customer';
import { MasterData } from '@/types/master_data';
import { MBranch } from '@/types/m_branch';
import { MMachineModel } from '@/types/m_machine_model';
import { MMaintContract } from '@/types/m_maint_contract';
import { MServiceAgent } from '@/types/m_service_agent';
import { MShiten } from '@/types/m_shiten';
import { MMaintenanceItem } from '@/types/m_maintenanceitem';

import { ApiArgsCustomer, ApiArgsCustomerUpsert, ApiArgsMShitenUpsert } from '@/types/api_args';

import { boolean } from "zod";
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const initialState: MasterDataState = {
  
  fetchAllDataStatus: '',

  fetchMachineModelsStatus: '',
  updateMachineModelStatus: '',
  
  fetchBranchesStatus: '',
  updateBranchStatus: '',
  fetchMShitensStatus: '',
  updateMShitenStatus: '',
  
  branches:          [] as MBranch[],
  machineModels:     [] as MMachineModel[],
  maintContracts:    [] as MMaintContract[],
  serviceAgents:     [] as MServiceAgent[],
  mShitens:          [] as MShiten[],
  mMaintenanceItems: [] as MMaintenanceItem[],

  serverErrorOccurred: undefined,
  serverErrorData:   [],
  reLoginRequired: false,

};


export const getAllData = createAsyncThunk(
  "masterData/get-all-data", 
  async (thankApi) => {

    console.log('★API★ getAllData');

    const response = await fetch(`${apiUrl}api/masterdata`, {
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

export const getBranches = createAsyncThunk(
  "masterData/get-branches", 
  async (thankApi) => {

    console.log('★API★ getBranches');

    const response = await fetch(`${apiUrl}api/masterdata/branches`, {
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

export const getMShitens = createAsyncThunk(
  "masterData/get-shitens", 
  async (thankApi) => {

    console.log('★API★ getMShitens');

    const response = await fetch(`${apiUrl}api/masterdata/shitens`, {
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



export const getMachineModels = createAsyncThunk(
  "masterData/get-machine-models", 
  async (thankApi) => {

    console.log('★API★ getMachineModels');

    const response = await fetch(`${apiUrl}api/masterdata`, {
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

export const upsertCustomer = createAsyncThunk(
  "customer/upsert", 
  async (params: ApiArgsCustomerUpsert) => {

  const formData = new FormData();


  if (params.customer_new_flag) {
    formData.append('mu_usercode', params!.customer!.mu_usercode!.toString());
  }
  formData.append('customer_new_flag', params.customer_new_flag ? '0' : '1');
  formData.append('mu_mnumber',        params.customer!.mu_mnumber ?? '');
  formData.append('mu_username',       params.customer!.mu_username ?? '');
  formData.append('mu_usernamek',      params.customer!.mu_usernamek ?? '');
  formData.append('mu_userperseon',    params.customer!.mu_userperseon ?? '');
  formData.append('mu_dealerperson',   params.customer!.mu_dealerperson ?? '');
  formData.append('mu_hosyucode',      params.customer!.mu_hosyucode ?? '');

  if (params.maintenance_new_flag) {
    formData.append('tm_recnum', params!.maintenance!.tm_recnum!.toString());
  }
  formData.append('maintenance_new_flag', params.maintenance_new_flag ? '0' : '1');
  formData.append('tm_repaircont', params!.maintenance!.tm_repaircont ?? '');


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




export const upsertMShiten = createAsyncThunk(
  "masterData/upsert-shiten", 
  async (params: ApiArgsMShitenUpsert) => {  

  const formData = new FormData();

  if (params?.id){
    formData.append('id', params!.id);
  }
  formData.append('m_shitencode', params!.m_shitencode ?? '');
  formData.append('m_shitenname', params!.m_shitenname ?? '');

  let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN??''));

  if (xsrfToken) {
      xsrfToken = xsrfToken.split('=')[1]
  }
  const response = await fetch(`${apiUrl}api/masterdata/shiten/upsert`, {
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



const masterDataSlice = createSlice({
    name: 'masterData',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      

      // getAllData
      builder.addCase(getAllData.pending, (state, action) => {
        state.fetchAllDataStatus = 'pending'
        state.branches           = [] as MBranch[]
        state.machineModels      = [] as MMachineModel[]
        state.maintContracts     = [] as MMaintContract[]
        state.serviceAgents      = [] as MServiceAgent[]
        state.mMaintenanceItems  = [] as MMaintenanceItem[]
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getAllData.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, masterData?: MasterData, serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        // action) => {

        console.log('getAllData.fulfilled', action.payload)
        state.fetchAllDataStatus = 'success'
        
        if(action.payload?.masterData){
          state.branches          = action.payload.masterData.branches ?? []
          state.machineModels     = action.payload.masterData.machinModels ?? []
          state.maintContracts    = action.payload.masterData.maintContracts ?? []
          state.serviceAgents     = action.payload.masterData.serviceAgents ?? []
          state.mMaintenanceItems = action.payload.masterData.mMaintenanceItems ?? []
        }

      });
      builder.addCase(getAllData.rejected, (state, action) => {
        state.fetchAllDataStatus = 'failed'
      });

  
      // getBranches
      builder.addCase(getBranches.pending, (state, action) => {
        state.fetchBranchesStatus = 'pending'
        state.branches            = [] as MBranch[]
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getBranches.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, branches?: MBranch[], serverError?: boolean, serverErrorData?: string[] } | undefined>) => {

        console.log('getBranches.fulfilled', action.payload)
        state.fetchBranchesStatus = 'success'
        
        if(action.payload?.branches){
          state.branches = action.payload.branches ?? []
        }

      });
      builder.addCase(getBranches.rejected, (state, action) => {
        state.fetchBranchesStatus = 'failed'
      });
  
      // getMShitens
      builder.addCase(getMShitens.pending, (state, action) => {
        state.fetchMShitensStatus = 'pending'
        state.mShitens            = [] as MShiten[]
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getMShitens.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, mShitens?: MShiten[], serverError?: boolean, serverErrorData?: string[] } | undefined>) => {

        console.log('getBranches.fulfilled', action.payload)
        state.fetchMShitensStatus = 'success'
        
        if(action.payload?.mShitens){
          state.mShitens = action.payload.mShitens ?? []
        }

      });
      builder.addCase(getMShitens.rejected, (state, action) => {
        state.fetchMShitensStatus = 'failed'
      });

      // getMachineModels
      builder.addCase(getMachineModels.pending, (state, action) => {
        state.fetchMachineModelsStatus = 'pending'
        state.machineModels = [] as MMachineModel[]
        state.serverErrorOccurred = undefined

      });
      builder.addCase(getMachineModels.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, masterData?: MasterData, serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        // action) => {

        console.log('getMachineModels.fulfilled', action.payload)
        state.fetchMachineModelsStatus = 'success'
        
        if(action.payload?.masterData){
          state.machineModels = action.payload.masterData.machinModels ?? []
        }

      });
      builder.addCase(getMachineModels.rejected, (state, action) => {
        state.fetchMachineModelsStatus = 'failed'
      });


      // upsertMShiten
      builder.addCase(upsertMShiten.pending, (state, action) => {
        state.updateMShitenStatus = 'pending'
        state.mShitens = [] as MShiten[]
        state.serverErrorOccurred = false
      });
      builder.addCase(upsertMShiten.fulfilled, (state, 
        action: PayloadAction<{ reLoginRequired?: boolean, mShitens?: MShiten[], serverError?: boolean, serverErrorData?: string[] } | undefined>) => {
        //action) => {
        state.updateMShitenStatus = 'success'
          console.log('★API★ upsertMShiten', action.payload);

        if(action.payload?.mShitens){
          state.mShitens = action.payload.mShitens
        }
        if(action.payload?.serverError){
          state.serverErrorOccurred = action.payload.serverError
        }
        if(action.payload?.serverErrorData){
          state.serverErrorData = action.payload.serverErrorData
        }

      });
      builder.addCase(upsertMShiten.rejected, (state, action) => {
        state.updateMShitenStatus = 'failed'
      });

    }

})


export const fetchAllDataStatus        = (state: RootState) => state.masterData.fetchAllDataStatus;

export const fetchMachineModelsStatus  = (state: RootState) => state.masterData.fetchMachineModelsStatus;
export const updateMachineModelStatus  = (state: RootState) => state.masterData.updateMachineModelStatus;

export const fetchBranchesStatus       = (state: RootState) => state.masterData.fetchBranchesStatus;
export const updateBranchStatus        = (state: RootState) => state.masterData.updateBranchStatus;

export const fetchMShitensStatus       = (state: RootState) => state.masterData.fetchMShitensStatus;
export const updateMShitenStatus       = (state: RootState) => state.masterData.updateMShitenStatus;

export const branches                  = (state: RootState) => state.masterData.branches;
export const machineModels             = (state: RootState) => state.masterData.machineModels;
export const maintContracts            = (state: RootState) => state.masterData.maintContracts;
export const serviceAgents             = (state: RootState) => state.masterData.serviceAgents;
export const mShitens                  = (state: RootState) => state.masterData.mShitens;
export const mMaintenanceItems         = (state: RootState) => state.masterData.mMaintenanceItems;

export const serverErrorOccurred       = (state: RootState) => state.masterData.serverErrorOccurred;
export const serverErrorData           = (state: RootState) => state.masterData.serverErrorData;
export const reLoginRequired           = (state: RootState) => state.masterData.reLoginRequired;


export default masterDataSlice.reducer;


// interfaces
interface MasterDataState {
  fetchAllDataStatus: string;
  
  fetchMachineModelsStatus: string;
  updateMachineModelStatus: string;

  fetchBranchesStatus: string;
  updateBranchStatus: string;
  
  fetchMShitensStatus: string;
  updateMShitenStatus: string;

  branches:          MBranch[];
  machineModels:     MMachineModel[];
  maintContracts:    MMaintContract[];
  serviceAgents:     MServiceAgent[];
  mShitens:          MShiten[];
  mMaintenanceItems:  MMaintenanceItem[];

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
