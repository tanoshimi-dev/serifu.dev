import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import type { RootState  } from '../store'
import { MAccount } from '@/types/m_account';
import { ApiArgsAccount, ApiArgsCustomerUpsert } from '@/types/api_args';

const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const tokenKey = process.env.ACCESS_TOKEN??'';

const initialState: AccountState = {
  account: {} as MAccount,
  accessToken: null,
  fetchStatus: "",
  updateStatus: "",

  updateError: undefined,
  updateErrorData: [],
  reLoginRequired: false,  
};


export const login = createAsyncThunk("user/login", async (params: ApiArgsAccount) => {

  //console.log('★API★ login url', params);

  try {
    const sanctumResponse = await fetch(`${apiUrl}sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });

    if (!sanctumResponse.ok) {
      //console.error('💀　HTTP error1', sanctumResponse.status);
      return;
    }

    //let xsrfToken = document.cookie.split('; ').find(row => row.startsWith("XSRF-TOKEN"));
    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }
    const userid = params.userid;
    const password = params.password;

    const response = await fetch(`${apiUrl}api/login`, {
      // fetch("https://rehop.jp/demo/trade_back/public/login", {
      method: 'POST',
      cache: 'no-store',
      headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
          // 'X-XSRF-TOKEN': xsrfToken ?? '',
          'Accept': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        userid:   userid,
        password: password
      }),

    });

    if (!response.ok) {
      return;
    }

    //console.log('★API★ login response', response)
    const data = await response.json(); // Extract JSON data from the response
    //console.log('★API★ login ', data);
    return data;

  } catch (error) {
    //console.error('★API★ login error', error);
    //return error;
  }


});

export const logout = createAsyncThunk("user/logout", async () => {
  //console.log('★API★ logout url', params);

  try {

    //console.log('★API★ logout url', params);

    const sanctumResponse = await fetch(`${apiUrl}sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });

    if (!sanctumResponse.ok) {
      console.error('💀　HTTP error1', sanctumResponse.status);
      return;
    }

    // let xsrfToken = document.cookie.split('; ').find(row => row.startsWith("XSRF-TOKEN"));
    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }

    const response = await fetch(`${apiUrl}api/logout`,{
      // fetch("https://rehop.jp/demo/trade_back/public/login", {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
            // 'X-XSRF-TOKEN': xsrfToken ?? '',
            'Accept': 'application/json'
        },
        credentials: "include",
    
    });

    if (!response.ok) {
      //console.error('💀💀　HTTP error2', response.status);
      return;
    }

    //console.log('★API★ logout response', response)
    const data = await response.json(); // Extract JSON data from the response
    //console.log('★API★ logout ', data);
    return data;

  } catch (error) {
    //console.error('★API★ logout error', error);
    //return error;
  }

});


export const rememberMeLogin = createAsyncThunk("user/remember-me-login", async () => {

  //console.log('★API★ login url', params);

  try {
    const sanctumResponse = await fetch(`${apiUrl}sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });

    if (!sanctumResponse.ok) {
      //console.error('💀　HTTP error1', sanctumResponse.status);
      return;
    }

    //let xsrfToken = document.cookie.split('; ').find(row => row.startsWith("XSRF-TOKEN"));
    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }

    const response = await fetch(`${apiUrl}api/remember-me-login`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
          'Accept': 'application/json'
      },

    });

    if (!response.ok) {
      return;
    }

    //console.log('★API★ login response', response)
    const data = await response.json(); // Extract JSON data from the response
    //console.log('★API★ login ', data);
    return data;

  } catch (error) {
    //console.error('★API★ login error', error);
    //return error;
  }


});


export const getAuthUser = createAsyncThunk("user/authuser", async () => {

  try {
    const token = localStorage.getItem(tokenKey);

    console.log('★API★ getAuthUser token', token);

    const response = await fetch(`${apiUrl}api/get-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
        //'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json(); // Extract JSON data from the response
    return data;

  } catch (error) {
  }


});


export const getUser = createAsyncThunk("user/user", async () => {

  try {

    // const sanctumResponse = await fetch(`${apiUrl}sanctum/csrf-cookie`, {
    //   method: 'GET',
    //   credentials: 'include',
    //   cache: 'no-store',
    // });

    // console.error('sunctum response', sanctumResponse);
      
    // if (!sanctumResponse.ok) {
    //   return;
    // }

    //let xsrfToken = document.cookie.split('; ').find(row => row.startsWith("XSRF-TOKEN"));
    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }

    //console.log('★API★ getUser xsrfToken', xsrfToken);

    // const response = await fetch(`${apiUrl}api/get-user`, {
    const response = await fetch(`${apiUrl}api/user`, {
        // method: 'POST',
      // cache: 'no-store',
      // headers: {
      //     'Content-Type': 'application/json',
      //     'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
      //     'Accept': 'application/json'
      // },

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
            
    });

    // const response = axios.get(`${apiUrl}api/user`)

    if (!response.ok) {
      return;
    }

    const data = await response.json(); // Extract JSON data from the response
    return data;

  } catch (error) {
  }


});


const accountSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

      // login
      builder.addCase(login.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.account = {} as MAccount
        state.accessToken = null
      });
      builder.addCase(login.fulfilled, (state, 
        action: PayloadAction<{ message?: string, data?: MAccount, access_token?: string } | undefined>) => {
        
        state.fetchStatus = 'success'

        if(action.payload && action.payload.data) {
          state.account = action.payload.data
        }
        if(action.payload && action.payload.access_token) {
          state.accessToken = action.payload.access_token
          localStorage.setItem(tokenKey, action.payload.access_token); 
          console.log('tokenKey', tokenKey, action.payload.access_token)
        }

      });
      builder.addCase(login.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });


      // rememberMeLogin
      builder.addCase(rememberMeLogin.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.account = {} as MAccount
      });
      builder.addCase(rememberMeLogin.fulfilled, (state, action) => {
        state.fetchStatus = 'success'
        console.log('rememberMeLogin.fulfilled★ action.payload', action.payload)

        if(action.payload && action.payload.data) {
          state.account = action.payload.data
        }
      });
      builder.addCase(rememberMeLogin.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

      // logout
      builder.addCase(logout.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.account = {} as MAccount
      });
      builder.addCase(logout.fulfilled, (state, action) => {
        state.fetchStatus = 'success'
      });
      builder.addCase(logout.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

      // getAuthUser
      builder.addCase(getAuthUser.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.account = {} as MAccount
      });
      builder.addCase(getAuthUser.fulfilled, (state, action) => {
        state.fetchStatus = 'success'
        console.log('getAuthUser.fulfilled★ action.payload', action.payload)

        if(action.payload && action.payload.data) {
          state.account = action.payload.data
        }
      });
      builder.addCase(getAuthUser.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

      // gethUser
      builder.addCase(getUser.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.account = {} as MAccount
      });
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.fetchStatus = 'success'
        //console.log('getUser.fulfilled★ action.payload', action.payload)

        if(action.payload && action.payload) {
          state.account = action.payload
        }
      });
      builder.addCase(getUser.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

    }

})

export const fetchStatus       = (state: RootState) => state.account.fetchStatus;
export const account           = (state: RootState) => state.account.account;
export const accessToken       = (state: RootState) => state.account.accessToken;
export const isAccountLoggedIn = (state: RootState) => (state.account.account?.userid) ? true : false;

export const updateStatus      = (state: RootState) => state.account.updateStatus;
export const updateError       = (state: RootState) => state.account.updateError;
export const updateErrorData   = (state: RootState) => state.account.updateErrorData;
export const reLoginRequired   = (state: RootState) => state.account.reLoginRequired;


//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default accountSlice.reducer;


interface AccountState {
  account:      MAccount | null;
  accessToken:  string | null;
  fetchStatus:  string;
  updateStatus: string;
  
  updateError: boolean | undefined;
  updateErrorData: string[];
  reLoginRequired: boolean;  
}
