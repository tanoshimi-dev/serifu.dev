import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import type { RootState  } from '../store'
import { User } from '@/lib/types/user';
import { ApiArgsUserLogin, ApiArgsAccount, ApiArgsCustomerUpsert } from '@/lib/types/api_args';

const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const tokenKey = process.env.ACCESS_TOKEN??'';

const initialState: AccountState = {
  user: {} as User,
  accessToken: null,
  fetchStatus: "",
  updateStatus: "",

  updateError: undefined,
  updateErrorData: [],
  reLoginRequired: false,  
};


export const login = createAsyncThunk("account/login", async (params: ApiArgsUserLogin) => {

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
    const email = params.email;
    const password = params.password;

    console.log('★API★ login url', `${apiUrl}login`, params);
    //console.log('★API★ xsrfToken', xsrfToken);
    
    const response = await fetch(`${apiUrl}login`, {
      // fetch("https://rehop.jp/demo/trade_back/public/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
      },
      credentials: 'include',
      body: JSON.stringify({
        email:   email,
        password: password
      }),

    });


    console.log('★API★ login response', response);


    if (!response.ok) {
      return;
    }

    //console.log('★API★ login response', response)
    const data = await response.json(); // Extract JSON data from the response
    //console.log('★API★ login ', data);
    return data;

  } catch (error) {
    console.error('★API★ login error', error);
    return error;
  }


});

export const logout = createAsyncThunk("account/logout", async () => {
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

    const response = await fetch(`${apiUrl}logout`,{
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


export const rememberMeLogin = createAsyncThunk("account/remember-me-login", async () => {

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


export const getAuthUser = createAsyncThunk("account/authuser", async () => {

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


export const getUser = createAsyncThunk("account/user", async () => {

  try {

    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }

    const response = await fetch(`${apiUrl}api/user`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
            
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json(); // Extract JSON data from the response
    return data;

  } catch (error) {
    console.error('★API★ getUser error', error);
  }


});


const accountSlice = createSlice({
    name: 'accountSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

      // login
      builder.addCase(login.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.user = {} as User
        state.accessToken = null
      });
      builder.addCase(login.fulfilled, (state, action) => {
        //action: PayloadAction<{ message?: string, data?: User, access_token?: string } | undefined>) => {
        
        state.fetchStatus = 'success'

        if(action.payload && action.payload.data) {
          state.user = action.payload.data
        }
        // if(action.payload && action.payload.access_token) {
        //   state.accessToken = action.payload.access_token
        //   localStorage.setItem(tokenKey, action.payload.access_token); 
        //   console.log('tokenKey', tokenKey, action.payload.access_token)
        // }

      });
      builder.addCase(login.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });


      // rememberMeLogin
      builder.addCase(rememberMeLogin.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.user = {} as User
      });
      builder.addCase(rememberMeLogin.fulfilled, (state, action) => {
        state.fetchStatus = 'success'
        console.log('rememberMeLogin.fulfilled★ action.payload', action.payload)

        if(action.payload && action.payload.data) {
          state.user = action.payload.data
        }
      });
      builder.addCase(rememberMeLogin.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

      // logout
      builder.addCase(logout.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.user = {} as User
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
        state.user = {} as User
      });
      builder.addCase(getAuthUser.fulfilled, (state, action) => {
        state.fetchStatus = 'success'
        console.log('getAuthUser.fulfilled★ action.payload', action.payload)

        if(action.payload && action.payload.data) {
          state.user = action.payload.data
        }
      });
      builder.addCase(getAuthUser.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

      // gethUser
      builder.addCase(getUser.pending, (state, action) => {
        state.fetchStatus = 'pending'
        state.user = {} as User
      });
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.fetchStatus = 'success'
        //console.log('getUser.fulfilled★ action.payload', action.payload)

        if(action.payload && action.payload) {
          state.user = action.payload
        }
      });
      builder.addCase(getUser.rejected, (state, action) => {
        state.fetchStatus = 'failed'
      });

    }

})

export const fetchStatus       = (state: RootState) => state.account.fetchStatus;
export const user              = (state: RootState) => state.account.user;
export const accessToken       = (state: RootState) => state.account.accessToken;
export const isLoggedIn        = (state: RootState) => (state.account.user?.id) ? true : false;

export const updateStatus      = (state: RootState) => state.account.updateStatus;
export const updateError       = (state: RootState) => state.account.updateError;
export const updateErrorData   = (state: RootState) => state.account.updateErrorData;
export const reLoginRequired   = (state: RootState) => state.account.reLoginRequired;


//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default accountSlice.reducer;


interface AccountState {
  user:         User | null;
  accessToken:  string | null;
  fetchStatus:  string;
  updateStatus: string;
  
  updateError: boolean | undefined;
  updateErrorData: string[];
  reLoginRequired: boolean;  
}
