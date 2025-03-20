import React, { createContext, useContext, useState, useEffect, Suspense, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login, fetchStatus, user, logout,
  rememberMeLogin, getUser, isLoggedIn,
  emailVerify
} from '@/lib/rtk/slices/accountSlice';
import { ApiArgsUserEmailVerify, ApiArgsUserLogin } from '@/lib/types/api_args';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Modal, OutlinedInput, RadioGroup, Stack, Typography, Radio, Select, MenuItem } from '@mui/material';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';

import { styled } from '@mui/system';

import Link from 'next/link'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'

import { Controller, useForm, SubmitHandler, set } from "react-hook-form"

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

export default function Login() {
  const dispatch: AppDispatch = useDispatch();
  //const { login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // dispatch(getAuthUser());
    //console.log('アカウント -----------------------')

    // if (!logoffOperation && !loginOperation) {
    // }

    //setErrorMessage(null);
    //dispatch(getUser());
    
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email   = data.get('email');
    const password = data.get('password');

    dispatch(login({email, password} as ApiArgsUserLogin));

  };

  const handleLogout = () => {

    console.log('handleLogout');

    dispatch(logout());

  };

  const [emailVerifyUrl, setEmailVerifyUrl] = React.useState('');

  const handleEmailVerify = () => {
    //event.preventDefault();

    console.log('mail_verification=>', emailVerifyUrl);

    dispatch(emailVerify({url: emailVerifyUrl} as ApiArgsUserEmailVerify));

  };

  
  const handleGetUser = () => {
    //event.preventDefault();

    console.log('getUser');

    dispatch(getUser());

  };

  const apiResStatus = useSelector(fetchStatus);
  const apiResData = useSelector(user);
  const apiResIsLoggedIn = useSelector(isLoggedIn);

  console.log('apiResData=>', apiResData)
  console.log('apiResIsLoggedIn=>', apiResIsLoggedIn);
  console.log('apiResStatus=>', apiResStatus);
  
  const defaultValues = {
    sex: '0',
    kubun: '0',
    kubuns: [
      { label: '本人', value: '0' },
      { label: '家族', value: '1' },
    ],
    dummy_contract_date: new Date('1980-01-01'),
    
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    //resolver: zodResolver(userSchema)
  });
  

  return (
    <Box sx={{ px: 2 }} >  
      {/* ログイン */}
      <form className="min-h-96 " onSubmit={handleLogin}>
      
        <Box sx={{ display: 'flex', alignItems: 'start', my: 3 }}>
          <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1rem' }}>
            ログイン情報を入力してください
          </Typography>
        </Box>
  
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 1 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
                メールアドレス：
              </FormLabel>
            </Box>            
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="email"
                name='email'
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`mokon@example.com`}
                />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'start', my: 1 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="password" sx={{ fontWeight: 600 }}>
                パスワード：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="password"
                name='password'
                type="password"
                autoComplete=""
                required
                size="small"
                defaultValue={`password`}
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }}/>

        <Box sx={{ mt: 2, textAlign: 'center'  }}>
          <Button
            sx={{ minWidth: '320px' }}
            variant="outlined" color="primary"
            type="submit">
            ログイン
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center'  }}>
          <Button
            sx={{ minWidth: '320px' }}
            variant="outlined" color="primary"
            type="button"
            onClick={handleLogout}>
            ログアウト
          </Button>
        </Box>
        <Divider sx={{ my: 1 }}/>

       <Link href={`/login`} passHref >
        <Box
        >
          パスワードを忘れた場合
        </Box>
        </Link>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            アカウント未登録の場合{' '}
            <Link href={`/account/new`} passHref >
            新規登録
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }}/>

        <Box sx={{ mt: 2, textAlign: 'center'  }}>
          <Box >
              <OutlinedInput
                sx={{ minWidth: '600px' }}
                id="mail_verification"
                name='mail_verification'
                type="text"
                autoComplete=""
                size="small"
                onInput={(e) => setEmailVerifyUrl((e.target as HTMLInputElement).value)}
              />
          </Box>
          <Button
            sx={{ minWidth: '320px' }}
            variant="contained" 
            color="inherit"
            type="button"
            onClick={handleEmailVerify}>
            メール確認
          </Button>

        </Box>

        <Divider sx={{ my: 1 }}/>

        <Box sx={{ mt: 2, textAlign: 'center'  }}>
          <Button
            sx={{ minWidth: '320px' }}
            variant="contained" 
            color="inherit"
            type="button"
            onClick={handleGetUser}>
            ユーザー情報取得
          </Button>
        
        </Box>
        <Divider sx={{ my: 1 }}/>


      </form>
    </Box>
  );
}