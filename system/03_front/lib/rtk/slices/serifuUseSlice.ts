import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import type { RootState  } from '../store'
import { Genre } from '@/lib/types/genre';
import { 
  ApiArgsUserLogin, ApiArgsUserEmailVerify, ApiArgsUserRegister,
  ApiArgsAccount, ApiArgsCustomerUpsert } from '@/lib/types/api_args';

const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

const tokenKey = process.env.ACCESS_TOKEN??'';

const initialState: SerifuUseState = {
  fetchGenresStatus: '',
  genres : [] as Genre[],
  userVerified: false,
};

export const getGenres = createAsyncThunk(
  'serifuUseSlice/getGenres',
  async (thankApi) => {

    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }

    const response = await fetch(`${apiUrl}api/serifu/genres`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
            
    });

    console.log('getGenres:response', response)

    let returnData = {};
      
    if (response.status === 403) { 
      returnData = { userNotVerified: true };

    } else {
      returnData = await response.json();
    }
  
    return returnData;

  }

);


const serifuUseSlice = createSlice({
    name: 'serifuUseSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

      // getGenres
      builder.addCase(getGenres.pending, (state, action) => {
        state.fetchGenresStatus = 'pending'
        state.genres = [] as Genre[]

      });
      builder.addCase(getGenres.fulfilled, (state, 
        action: PayloadAction<{ genres?: Genre[], userNotVerified? : boolean  } | undefined>) => {

        state.fetchGenresStatus = 'success'
        
        console.log('getGenres:payload', action.payload)

        if (action.payload?.userNotVerified) {
          state.userVerified = false
          return state
        }

        if(action.payload?.genres){
          state.userVerified = true
          state.genres = action.payload.genres
        }

      });
      builder.addCase(getGenres.rejected, (state, action) => {
        state.fetchGenresStatus = 'failed'
      });
    }

})

export const fetchGenresStatus   = (state: RootState) => state.serifuUse.fetchGenresStatus;
export const genres              = (state: RootState) => state.serifuUse.genres;
export const userVerified        = (state: RootState) => state.serifuUse.userVerified;


//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default serifuUseSlice.reducer;


interface SerifuUseState {
  fetchGenresStatus: string;
  genres : Genre[];
  userVerified: boolean;
}
