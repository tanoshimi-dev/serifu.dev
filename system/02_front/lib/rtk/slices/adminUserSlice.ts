import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

interface AdminUserState {
  status: string;
  adminUser: AdminUser|null;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  memo?: string;
  rate: number|null;
}


const initialState: AdminUserState = {
  status: '',
  adminUser: null,
};

export const login = createAsyncThunk(
  "adminuser/login", 
  async (params, thankApi) => {


  console.log('★API★ login url', params);

  try {
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
    // @ts-ignore
    const email = params.email;
    // @ts-ignore
    const password = params.password;

    const response = await fetch(`${apiUrl}login`, {
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
        email: email,
        password: password
      }),
      // email: 'demo2@example.com',
      // password: 'password'
    });

    if (!response.ok) {
      //console.error('💀💀　HTTP error2', response.status);
      return;
    }

    // console.log('★API★ login response', response)
    const data = await response.json(); // Extract JSON data from the response
    //console.log('★API★ login ', data);
    return data;

  } catch (error) {
    //console.error('★API★ login error', error);
    //return error;
  }


});

export const logout = createAsyncThunk("user/logout", async (params) => {
  //console.log('★API★ logout url', params);

  try {

    console.log('★API★ logout url', params);

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

export const getUser:any = createAsyncThunk("user/profile", async (params) => {

  console.log('★API★ getUser url', `${apiUrl}api/user`);

  //let xsrfToken = document.cookie.split('; ').find(row => row.startsWith("XSRF-TOKEN"));
  let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));
  
  if (xsrfToken) {
      xsrfToken = xsrfToken.split('=')[1]
  }

  console.log('★API★ getUser xsrfToken', xsrfToken);
  console.log('★API★ getUser apiUrl', apiUrl);
  
  // const res = await fetch(`${apiUrl + apiUrlSuffix}api/user/profile`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     //'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   }
  
  // });

  try {
    const response = await fetch(`${apiUrl}api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
         referrer: `${apiUrl}`,
      },
      credentials: "include",
      
    });

    if (!response.ok) {
      //console.error('💀　HTTP error', response.status);
      return;
    }
    
    //console.log('★API★ getUser response', response)
    const data = await response.json(); // Extract JSON data from the response
    //console.log('★API★ getUser ', data);
    return data;

  } catch (error) {
    //console.error('★API★ getUser error', error);
    return {};
    //return error;
  }


});


const adminUserSlice = createSlice({
    name: 'adminUser',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

      // getUser
      builder.addCase(getUser.pending, (state, action) => {
        state.status = 'pending'
        state.adminUser = null
      });
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.status = 'success'
        console.log('getUser.fulfilled★ action.payload', action.payload)
        // state.adminUser = action.payload.data;
        state.adminUser = action.payload;
      });
      builder.addCase(getUser.rejected, (state, action) => {
        state.status = 'failed'
      }); 

      // login
      builder.addCase(login.pending, (state, action) => {
        state.status = 'pending'
        state.adminUser = null
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.status = 'success'
        console.log('★login.fulfilled★ action.payload', action.payload)
        // state.user = action.payload.data;
        if(action.payload && action.payload.data) {
          state.adminUser = action.payload.data
        }
      });
      builder.addCase(login.rejected, (state, action) => {
        state.status = 'failed'
      });

      // logout
      builder.addCase(logout.pending, (state, action) => {
        state.status = 'pending'
        state.adminUser = null
      });
      builder.addCase(logout.fulfilled, (state, action) => {
        state.status = 'success'
        console.log('getUser.fulfilled★ action.payload', action.payload)
        //console.log('logout.fulfilled★ action.payload', action.payload)
      });
      builder.addCase(logout.rejected, (state, action) => {
        state.status = 'failed'
      });

    }

})

export const status = (state: any) => state.adminUser.status;
export const adminUser = (state: any) => state.adminUser.adminUser;
export const isLoggedIn = (state: any) => (state.adminUser.adminUser !== null);

//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default adminUserSlice.reducer;