"use client";
import React, { createContext, useContext, useState, useEffect, Suspense, use } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login, fetchStatus, user, logout, register as userRegister,
  rememberMeLogin, getAuthUser, getUser, isLoggedIn, 
  emailVerify, emailVerified
} from '@/lib/rtk/slices/accountSlice';
import { ApiArgsUserEmailVerify, ApiArgsUserLogin, ApiArgsUserRegister } from '@/lib/types/api_args';

import { Box, Button, Divider, CircularProgress, Backdrop, 
  FormControl, FormControlLabel, FormHelperText, FormLabel, Modal, OutlinedInput, RadioGroup, Stack, Typography, Radio, Select, MenuItem } from '@mui/material';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/system';


import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'

import { Controller, useForm, SubmitHandler, set } from "react-hook-form"
import { de } from 'date-fns/locale';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};


const SmallRadio = styled(Radio)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: 20, // Adjust the size as needed
  },
}));


export default function EmailVerify() {

  const router = useRouter();
  const pathname = usePathname();
  // Get the current URL
  const currentUrl = pathname;
  console.log('currentUrl:', currentUrl);
  
  const searchParams = useSearchParams() 
  for (const [key, value] of searchParams.entries() as any) {
    console.log(`${key}: ${value}`);
  }

  Array.from(searchParams.entries()).map(([key, value]) => {
    //console.log(`${key}: ${value}`)
    let decodedUrl = decodeURIComponent(value);
    console.log('decodedUrl:', decodedUrl);
  })

  
  console.log('searchParams:', searchParams);


  const dispatch: AppDispatch = useDispatch();
  //const { login, logout } = useAuth();
  const apiResFetchStatus  = useSelector(fetchStatus);
  const apiResEmailVerified = useSelector(emailVerified);

  // http://localhost:3000/account/verify/?q=14/8d06e21be9dc797ca30388367a8039d958a2a6f7?expires=1742420170&amp;signature=01e07e4c1d5e0696462debc18d33e497df60f2c1a3375d9128847838308ded6e
  const searchType = searchParams.get('q') ?? '';
  console.log('URL:', decodeURIComponent(searchType));
  // http://localhost:32011/verify-email/15/37e5340bfdf6cfd7538e9c5c1b7c37872a2ac910?expires=1742423687&amp;signature=b1c796600c84bb27125462329b6fb3561d63be0fe16b9278df15f988d2c9afe3
 // http://localhost:3000/account/verify/?q=15/37e5340bfdf6cfd7538e9c5c1b7c37872a2ac910?expires=1742423687&amp;signature=b1c796600c84bb27125462329b6fb3561d63be0fe16b9278df15f988d2c9afe3

  // Decode the escaped URL
  //http://localhost:3000/account/verify/?q=16/51aee66001eca86b8c2d7c40560871b881211f40?expires=1742428456&amp;signature=37f7435eb800a89b9cc36ba5c8fcfd2dfc0dba052a70348fffe44adac41e2002
  // http://localhost:3000/account/verify/?q=17/acbd321c615a100caa2736c6b354f9da80f38b78?expires=1742429302&amp;signature=d769b01b21ac4e96c9cfc43b2748ea8ff48e87a4cf12a2aa0821cf24a3d301be

  // http://localhost:3000/account/verify/?q=18/acbd321c615a100caa2736c6b354f9da80f38b78?expires=1742430344&amp;signature=7b840d6f6270c6a248d119878346fc11e7ad2eb640f1fda57a82ebb05a549ed7


  useEffect(() => {
    const param = searchParams.get('q') ?? '';
    const signature = searchParams.get('amp;signature') ?? '';
    const emailVerifyUrl = 'http://localhost:32011/verify-email/' + decodeURIComponent(param) + '&signature=' +decodeURIComponent(signature);
    console.log('emailVerifyUrl:', emailVerifyUrl);
    dispatch(emailVerify({url: emailVerifyUrl} as ApiArgsUserEmailVerify));
  },[]);


  useEffect(() => {
    if (apiResFetchStatus === 'success' && apiResEmailVerified) {
      router.push('/account');
    }
  }, [apiResEmailVerified])

  
  return (
    <Box sx={{ px: 2 }} >

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={(apiResFetchStatus !== 'success')}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <form className="min-h-96 ">

        <Box sx={{ display: 'flex', alignItems: 'start', my: 3 }}>
          <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1rem' }}>
            Email確認
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          {searchParams && searchParams.entries() &&
            <Box>
              {Array.from(searchParams.entries()).map(([key, value]) => (
                <Typography
                  key={key}
                  variant="body1"
                  sx={{ color: 'text.primary', fontWeight: 600 }}
                >
                  {key}: {decodeURIComponent(value)}
                </Typography>
              ))}
            </Box>
          }
        </Box>
        <Divider sx={{ my: 1 }}/>

    </form>    
    </Box>
  );
}