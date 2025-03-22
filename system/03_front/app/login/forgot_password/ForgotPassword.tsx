import React, { createContext, useContext, useState, useEffect, Suspense, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login, fetchStatus, user, logout, register as userRegister,
  getUser, isLoggedIn, 
  emailVerify, sendResetLink
} from '@/lib/rtk/slices/accountSlice';
import { ApiArgsUserEmailVerify, ApiArgsUserLogin, ApiArgsPasswordReset } from '@/lib/types/api_args';

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


const SmallRadio = styled(Radio)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: 20, // Adjust the size as needed
  },
}));


export default function ForgotPassword() {

  const dispatch: AppDispatch = useDispatch();
  //const { login, logout } = useAuth();
  const router = useRouter();

  const handleResetLink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email   = data.get('email');
    
    dispatch(sendResetLink({email} as ApiArgsPasswordReset));

  };


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

      <form className="min-h-96 " onSubmit={handleResetLink}>

        <Box sx={{ display: 'flex', alignItems: 'start', mt: 3, mb:1 }}>
          <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1rem' }}>
            パスワードリセット
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }}/>

        <Box sx={{ display: 'flex', alignItems: 'start', my: 1 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }} required>
              メールアドレス：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            <OutlinedInput
              id="email"
              name="email"
              type="text"
              autoComplete=""
              required
              size="small"
              />
          </Box>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center'  }}>
          <Button
            sx={{ minWidth: '320px' }}
            variant="contained" color="primary"
            type='submit'
          >
            リンク送信
          </Button>
        </Box>

    </form>    
    </Box>
  );
}