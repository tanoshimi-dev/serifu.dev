import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

interface UsersState {
  status: string;
  users: User[];
  selectedUserStatus: string;
  selectedUser: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  memo?: string;
}


const initialState: UsersState = {
  status: 'idle',
  users: [],
  selectedUser: {} as User,
  selectedUserStatus: ""
};

export const getUsers = createAsyncThunk("users/get", async (params) => {

  let queryParams = `?`
  if (params !== undefined) {
    Object.keys(params).forEach((key, i) => {
      queryParams += `${key}=${params[key]}`
      if (i < Object.keys(params).length - 1) {
        queryParams += `&`
      }
    });
  }
  console.log('★API★ getUsers url', `${apiUrl}api/users${queryParams}`);

  const res = await fetch(`${apiUrl}api/users${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  
  });
  const data = await res.json(); // Extract JSON data from the response
  //console.log('★API★ getUsers ', data);
  return data;
});

export const selectUser: any = createAsyncThunk("user/select", async (params) => {

  let queryParams = `?`
  if (params !== undefined) {
    Object.keys(params).forEach((key, i) => {
      queryParams += `${key}=${params[key]}`
      if (i < Object.keys(params).length - 1) {
        queryParams += `&`
      }
    });
  }
  //('★API★ selectUser url', `${apiUrl}api/users${queryParams}`);

  const res = await fetch(`${apiUrl}api/users${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  
  });
  const data = await res.json(); // Extract JSON data from the response
  //console.log('★API★ selectUser ', data);
  return data;
});

export const updateUser: any = createAsyncThunk("user/update", async (params: any) => {

  //console.log('★API★ select update url', `${apiUrl}api/users/update`, params);
  
  // let xsrfToken = document.cookie.split('; ').find(row => row.startsWith("XSRF-TOKEN"));
  let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN??''));

  if (xsrfToken) {
      xsrfToken = xsrfToken.split('=')[1]
  }

  //console.log('★API★ token', decodeURIComponent(xsrfToken ?? ''));

  const res = await fetch(`${apiUrl}api/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
      // 'X-XSRF-TOKEN': xsrfToken ?? '',
      'Accept': 'application/json'  
      //'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    credentials: "include",
    body: JSON.stringify({
      id: params.id,
      name: params.name,
    }),
    
  });
  const data = await res.json(); // Extract JSON data from the response
  //console.log('★API★ updateUser ', data);
  return data;

});


const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getUsers.pending, (state, action) => {
        state.status = 'pending'
        state.users = []
      });
      builder.addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'success'
        //console.log('payload', action.payload.data)
        state.users = action.payload.data
      });
      builder.addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
      }); 
      
      // selectUser
      builder.addCase(selectUser.pending, (state, action) => {
        state.selectedUserStatus = 'pending'
        state.selectedUser = {} as User
      });
      builder.addCase(selectUser.fulfilled, (state, action) => {
        state.selectedUserStatus = 'success'
        state.selectedUser = action.payload.data
      });
      builder.addCase(selectUser.rejected, (state, action) => {
        state.selectedUserStatus = 'failed'
      });

      // updateUser
      builder.addCase(updateUser.pending, (state, action) => {
        state.selectedUserStatus = 'pending'
        state.selectedUser = {} as User
      });
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUserStatus = 'success'
        state.selectedUser = action.payload.data
      });
      builder.addCase(updateUser.rejected, (state, action) => {
        state.selectedUserStatus = 'failed'
      });

    }

})

export const status = (state: any) => state.users.status;
export const users = (state: any) => state.users.users;

export const selectedUserStatus = (state: any) => state.users.selectedUserStatus;
export const selectedUser = (state: any) => state.users.selectedUser;

//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default usersSlice.reducer;