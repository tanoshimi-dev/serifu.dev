'use client';

import React, { useState, useEffect, useCallback, use } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';

import { Theme, useTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid2';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ja from 'dayjs/locale/ja'
import dayjs from 'dayjs'

import Typography from '@mui/material/Typography';

import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, width } from '@mui/system';
import { FormControlLabel, MenuItem, Popover, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material";
import Link from 'next/link';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Controller, useForm, SubmitHandler, set } from "react-hook-form"

import { useRouter, useSearchParams } from 'next/navigation'

const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


const defaultValues = {
  account: '',
  machine_id: '0',
  machines: [{ id: '0', name: '◆機種を選択◆' }],
  prefectures: [{ id: '0', name: '◆県を選択◆' }],
  branches: [{ id: '0', name: '◆支店を選択◆' }],
  plans: [{ id: '0', name: '◆点検契約を選択◆' }],
  maintenance_items: [{ id: '0', name: '◆メンテ項目を選択◆' }],
  contract_end_date: '',
  maintenance_item_id: '0',
  contract_start_date: '',
  branch_id: '0',
  prefecture_id : '0',
  plan_id: '0',

  mu_modelnum: '',
  mu_mnumber: '',
  mu_username: '',
  mu_usernamek: '',
  mu_tel: '',

}



export default function SearchTemporaryListPanel() {
  const router = useRouter();

  // const defaultValues = {
  //   machines: '',
  //   prefectures: '',
  //   prefecture_id: '',
  //   branch_id: '',
  // }

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

  const handleSeach = (data: any) => {

    // console.log('data', data)
    // console.log('data', data.mu_tel)
    // console.log('data', data.machin_id)

    router.push(`/customers/?type=1&mu_modelnum=${data.mu_modelnum}&mu_mnumber=${data.mu_mnumber}&mu_username=${data.mu_username}&mu_usernamek=${data.mu_usernamek}&mu_tel=${data.mu_tel}`);

  }


  return (

      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

        <form className="min-h-96 min-w-[512px]" onSubmit={handleSubmit(handleSeach)}>
          <Stack>

            <Box display="flex" sx={{ pb:1 }}>
              
              <FormLabel htmlFor="mu_modelnum" sx={{ width:140 }}>
                機種
              </FormLabel>
              <Controller
                name="mu_modelnum"
                control={control}
                render={({ field }) => (
                  <Select {...field}
                    sx={{ 
                      width: "300px",
                      backgroundColor: 'hsl(0, 0%, 99%)' ,
                      border: '1px solid hsla(220, 20%, 80%, 0.4)'
                    }}
                  >
                  
                  {(getValues('machines')) && (getValues('machines')).map((machine) => (
                    <MenuItem
                      key={machine.id}
                      value={machine.id}
                    >
                      {machine.name}
                    </MenuItem>
                  ))}
                  </Select>
                )}
              />

            </Box>

            <Box display="flex" sx={{ pb:1 }}>
              <FormLabel htmlFor="mu_mnumber" sx={{ width:140 }}>
                機番
              </FormLabel>
              <FormGrid size={{ xs: 3 }}>
                
                <OutlinedInput
                  id="mu_mnumber"
                  type="text"
                  autoComplete=""
                  size="small"
                  sx={{ width: "300px" }}
                  {...register("mu_mnumber")} 
                />
              </FormGrid>
            </Box>

            <Box display="flex" sx={{ pb:1 }}>
              <FormLabel htmlFor="mu_username" sx={{ width:140 }}>
                顧客名
              </FormLabel>
              <FormGrid size={{ xs: 3 }}>
                
                <OutlinedInput
                  id="mu_username"
                  type="text"
                  autoComplete=""
                  size="small"
                  sx={{ width: "300px" }}
                  {...register("mu_username")} 
                />
              </FormGrid>
            </Box>

            <Box display="flex" sx={{ pb:1 }}>
              <FormLabel htmlFor="mu_usernamek" sx={{ width:140 }}>
                顧客名(カナ)
              </FormLabel>
              <FormGrid size={{ xs: 3 }}>
                
                <OutlinedInput
                  id="mu_usernamek"
                  type="text"
                  autoComplete=""
                  size="small"
                  sx={{ width: "300px" }}
                  {...register("mu_usernamek")} 
                />
              </FormGrid>
            </Box>

            <Box display="flex" sx={{ pb:1 }}>
              <FormLabel htmlFor="mu_tel" sx={{ width:140 }}>
                電話番号
              </FormLabel>
              <FormGrid size={{ xs: 3 }}>
                
                <OutlinedInput
                  id="mu_tel"
                  type="text"
                  autoComplete=""
                  size="small"
                  sx={{ width: "300px" }}
                  {...register("mu_tel")} 
                />
              </FormGrid>
              <Box sx={{ pl:1 , alignContent: 'center' }}>{`[半角]`}</Box>
            </Box>

            <Box display="flex" sx={{ pb:1 }}>
              {/* <Link href={`/customer/histories`} passHref> */}
              <Button 
                variant="outlined" sx={{ mr:2, borderColor: 'gray', color: 'black' }}
                type="submit"
              >
                  検索
              </Button>
            </Box>

          </Stack>
        </form>


      </Box>

  );
}
