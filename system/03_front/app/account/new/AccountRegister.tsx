import React, { createContext, useContext, useState, useEffect, Suspense, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login, fetchStatus, user, logout, register as userRegister,
  getUser, isLoggedIn, 
  emailVerify
} from '@/lib/rtk/slices/accountSlice';
import { ApiArgsUserEmailVerify, ApiArgsUserLogin, ApiArgsUserRegister } from '@/lib/types/api_args';

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


export default function AccountRegister() {

  const dispatch: AppDispatch = useDispatch();
  //const { login, logout } = useAuth();
  const router = useRouter();

  const handleUserRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('handleUserRegister');

    const data = new FormData(event.currentTarget);
    const name   = data.get('name');
    const email   = data.get('email');
    const password = data.get('password');

    dispatch(userRegister({name, email, password} as ApiArgsUserRegister));

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
      {/* プロフィール */}
      <form className="min-h-96 " onSubmit={handleUserRegister}>

        <Box sx={{ display: 'flex', alignItems: 'start', my: 3 }}>
          <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1rem' }}>
            アカウント情報を入力してください
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
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

          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="password" sx={{ fontWeight: 600 }} required>
                パスワード：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="password"
                name="password"
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

        {/* プロフィール1 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="name" sx={{ fontWeight: 600 }}>
                名前：
              </FormLabel>
            </Box>            
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="name"
                name="name"
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`山岡 士郎`}
                />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
                名前（カナ）：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="mu_mnumber"
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`ヤマオカ シロウ`}
                />
            </Box>          
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              生年月日：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <Controller
                name="dummy_contract_date"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label=""
                      format="YYYY/MM/DD" 
                      value={field.value ? dayjs(field.value) : null} // Ensure the value is a Day.js object
                      onChange={(date) => field.onChange(date ? dayjs(date).toISOString() : null)} // Convert the date to ISO string
                      sx={{ width: 212, fontSize: 12 }}
                    />
                  </LocalizationProvider>
                )}
              >
              </Controller>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              性別：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <Controller
                name="sex"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <FormControl {...field} >
                    <RadioGroup row aria-labelledby="radio-group-label"
                      name="sex"
                      value={field.value} 
                      sx={{ ml: 1 }}
                    >
                      <FormControlLabel {...field} value="0" 
                        control={
                          <SmallRadio sx={{ pt: 1  }} />
  } 
                        label="男" 
                        sx={{ fontSize: 'small', fontColor: 'hsl(220, 20%, 35%)' }}
                      />

                      <FormControlLabel {...field} value="1" 
                        control={
                          <SmallRadio sx={{ pt: 1  }} />
                        } 
                        label="女" 
                        sx={{ fontSize: 'small', fontColor: 'hsl(220, 20%, 35%)' }}
                        />
                    </RadioGroup>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                )}
              />
            </Box>

            
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              電話番号：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="mu_mnumber"
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`012-3456-7890`}
              />
            </Box>          
          </Box>

        </Box>
        <Divider sx={{ my: 1 }}/>

        {/* プロフィール2 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
                企業名：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="mu_mnumber"
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`東西新聞社`}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              事業所名：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="mu_mnumber"
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`本社 文化部`}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="kubun" sx={{ fontWeight: 600 }}>
              保険証区分：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              
              <Controller
                name="kubun"
                control={control}
                render={({ field }) => (
                  <Select {...field}
                    sx={{ 
                      backgroundColor: 'hsl(0, 0%, 99%)' ,
                      border: '1px solid hsla(220, 20%, 80%, 0.4)',
                      width: 214, 
                      fontSize: 12,
                      paddingRight: 4,
                    }}
                    
                  >
                    {(getValues('kubuns')) && (getValues('kubuns')).map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.value}                          
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

            </Box>
            
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              保険証記号：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="mu_mnumber"
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`12345678`}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              保険証番号：
              </FormLabel>
            </Box>
            <Box sx={{ margin: '0 4px' }}>
              <OutlinedInput
                id="mu_mnumber"
                type="text"
                autoComplete=""
                required
                size="small"
                defaultValue={`123`}
              />
            </Box>          
          </Box>
        </Box>
        <Divider sx={{ my: 1 }}/>

        <Box sx={{ mt: 2, textAlign: 'center'  }}>
          <Button
            sx={{ minWidth: '320px' }}
            variant="contained" color="primary"
            type='submit'>
            登録
          </Button>
        </Box>

        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Link href={`/login/`} passHref >
            <Button
              sx={{ minWidth: '320px' }}
              variant="outlined" color="primary">
              キャンセル
            </Button>
          </Link>
        </Box>

    </form>    
    </Box>
  );
}