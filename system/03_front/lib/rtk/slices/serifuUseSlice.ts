import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import type { RootState  } from '../store'
import { Genre } from '@/lib/types/genre';
import { Title } from '@/lib/types/title';
import { Serifu } from '@/lib/types/serifu';
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
  fetchTitlesStatus: '',
  titles:  [] as Title[],
  fetchSerifusStatus: '',
  serifus: [] as Serifu[],
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

export const getTitles = createAsyncThunk(
  'serifuUseSlice/getTitles',
  async ( genre_id: string, thankApi) => {

    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }

    const response = await fetch(`${apiUrl}api/serifu/titles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
    });

    console.log('getTitles:response', response)

    let returnData = {};
      
    if (response.status === 403) { 
      returnData = { userNotVerified: true };

    } else {
      returnData = await response.json();
    }
  
    return returnData;

  }
);

export const getSerifus = createAsyncThunk(
  'serifuUseSlice/getSerifus',
  async ( title_id: string, thankApi) => {

    let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN ?? ''));

    if (xsrfToken) {
        xsrfToken = xsrfToken.split('=')[1]
    }

    console.log('getSerifus:title_id=', title_id)

    const response = await fetch(`${apiUrl}api/serifu/serifus?title=${title_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include'
    });

    console.log('getSerifus:response', response)

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

      // getTitles
      builder.addCase(getTitles.pending, (state, action) => {
        state.fetchTitlesStatus = 'pending'
        state.genres = [] as Genre[]

      });
      builder.addCase(getTitles.fulfilled, (state, 
        action: PayloadAction<{ titles?: Title[]  } | undefined>) => {

        state.fetchTitlesStatus = 'success'

        if(action.payload?.titles){
          state.titles = action.payload.titles
        }

      });
      builder.addCase(getTitles.rejected, (state, action) => {
        state.fetchTitlesStatus = 'failed'
      });

      // getSerifus
      builder.addCase(getSerifus.pending, (state, action) => {
        state.fetchSerifusStatus = 'pending'
        state.serifus = [] as Serifu[]

      });
      builder.addCase(getSerifus.fulfilled, (state, 
        action: PayloadAction<{ serifus?: Serifu[] } | undefined>) => {

        state.fetchSerifusStatus = 'success'
        
        console.log('getSerifus:payload', action.payload)
        if(action.payload?.serifus){
          state.serifus = action.payload.serifus
        }

      });
      builder.addCase(getSerifus.rejected, (state, action) => {
        state.fetchSerifusStatus = 'failed'
      });


    }

})

export const fetchGenresStatus   = (state: RootState) => state.serifuUse.fetchGenresStatus;
export const genres              = (state: RootState) => state.serifuUse.genres;
export const fetchTitlesStatus   = (state: RootState) => state.serifuUse.fetchTitlesStatus;
export const titles              = (state: RootState) => state.serifuUse.titles;
export const fetchSerifusStatus = (state: RootState) => state.serifuUse.fetchSerifusStatus;
export const serifus             = (state: RootState) => state.serifuUse.serifus;
export const userVerified        = (state: RootState) => state.serifuUse.userVerified;


//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default serifuUseSlice.reducer;


interface SerifuUseState {
  fetchGenresStatus: string;
  genres : Genre[];
  fetchTitlesStatus: string;
  titles : Title[];
  fetchSerifusStatus: string;
  serifus : Serifu[];
  userVerified: boolean;
}
