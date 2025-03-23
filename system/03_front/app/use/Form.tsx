"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  getGenres, fetchGenresStatus, genres, 
  getTitles, fetchTitlesStatus, titles, 
  getSerifus, fetchSerifusStatus, serifus, 
} from '@/lib/rtk/slices/serifuUseSlice';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider, FormControl, 
  FormControlLabel, FormHelperText, FormLabel, Modal, OutlinedInput, RadioGroup, Stack, Typography, Radio, 
  /*Select,*/ 
  MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';

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

import Select from 'react-select'


const SmallRadio = styled(Radio)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    fontSize: 20, // Adjust the size as needed
  },
}));


export default function Form() {
  
  const defaultOptions = [
    // { label: '美味しんぼ', value: '0' },
    // { label: '笑うせぇるすまん', value: '1' },
    // { label: '葬送のフリーレン', value: '2' },
    // { label: 'ポケモン', value: '3' },
    '美味しんぼ',
    '笑うせぇるすまん',
    '葬送のフリーレン',
    'ポケモン',
  ]


  const defaultValues = {
    sex: '0',
    kubun: '0',
    kubuns: [
      { label: '美味しんぼ', value: '0' },
      { label: '笑うせぇるすまん', value: '1' },
      { label: '葬送のフリーレン', value: '2' },
      { label: 'ポケモン', value: '3' },
    ],
    title: '',
    serifu: '',
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
  
  const dispatch: AppDispatch = useDispatch();

  const apiResFetchTitlesStatus  = useSelector(fetchTitlesStatus);
  const apiResTitles    = useSelector(titles);
  const apiResFetchSerifusStatus  = useSelector(fetchSerifusStatus);
  const apiResSerifus    = useSelector(serifus);

  console.log('apiResFetchTitlesStatus=>', apiResFetchTitlesStatus)
  console.log('apiResTitles=>', apiResTitles)
  console.log('apiResFetchSerifusStatus=>', apiResFetchSerifusStatus)
  console.log('apiResSerifus=>', apiResSerifus)

  interface OptionType {
    value: string;
    label: string;
  }
  const [titleOptions, setTitleOptions] = React.useState<OptionType[] | null>(null);
  const [serifuOptions, setSerifuOptions] = React.useState<OptionType[] | null>(null);
  const [serifuDetail, setSerifuDetail] = React.useState<string | null>(null);


  useEffect(() => {
    dispatch(getTitles(''));
  }, []);

  useEffect(() => {
    if (apiResFetchTitlesStatus && apiResTitles.length > 0) {
      const formattedOptions: OptionType[] = apiResTitles
        .filter((row) => row.id && row.name) // Ensure id and name are not null or undefined
        .map((row) => ({
          value: row.id as string, // Type assertion to string
          label: row.name as string, // Type assertion to string
        }));

      setTitleOptions(formattedOptions)
    }
    
    if (apiResFetchSerifusStatus && apiResSerifus.length > 0) {
      const formattedOptions: OptionType[] = apiResSerifus
        .filter((row) => row.id && row.serifu) // Ensure id and name are not null or undefined
        .map((row) => ({
          value: row.id as string, // Type assertion to string
          label: row.serifu as string, // Type assertion to string
        }));

      setSerifuOptions(formattedOptions)
    }

  }, [dispatch, apiResFetchTitlesStatus, apiResTitles, apiResFetchSerifusStatus, apiResSerifus]);


  const handleTitleChange = (value: string | undefined) => {
    console.log('selectedOption:', value)
    if (value) {
      setValue('title', value);
    }
    dispatch(getSerifus(value ?? ''));
  }

  const handleSerifuChange = (value: string | undefined) => {
    console.log('selectedOption:', value)
    if (value) {
      setValue('serifu', value);

      const serifuDetail = apiResSerifus.find((row) => row.id === value)?.detail;
      console.log('Detail for id:', value, 'is:', serifuDetail);
      setSerifuDetail(serifuDetail ?? '');
    }
    //dispatch(getSerifus(value ?? ''));
  }
  

  return (
    <Box sx={{ px: 2 }} >

      <form className="min-h-96 " onSubmit={()=>{}}>

        {/* ジャンル */}
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', my: 0.5 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              ジャンル
              </FormLabel>
            </Box>
            <Box>
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
                          <SmallRadio sx={{ pt: 1  }} />}
                        label="マンガ" 
                        sx={{ fontSize: 'small', fontColor: 'hsl(220, 20%, 35%)' }}
                      />

                      <FormControlLabel {...field} value="1" 
                        control={
                          <SmallRadio sx={{ pt: 1  }} />
                        } 
                        label="アニメ" 
                        sx={{ fontSize: 'small', fontColor: 'hsl(220, 20%, 35%)' }}
                        />
                    </RadioGroup>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
            
          </Box>
        </Box>

        {/* 作品名 */}
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', my: 0.5 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="title" sx={{ fontWeight: 600 }}>
              作品名
              </FormLabel>
            </Box>
            <Box>
              
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Select<OptionType>
                    {...field}
                    options={titleOptions || []}
                    value={titleOptions?.find(option => option.value === field.value) || null}
                    onChange={(selectedOption) => handleTitleChange(selectedOption?.value)}
                  />
                )}
              />

            </Box>
            
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', my: 0.5 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="serifu" sx={{ fontWeight: 600 }}>
              セリフ
              </FormLabel>
            </Box>
            <Box >
              
              <Controller
                name="serifu"
                control={control}
                render={({ field }) => (
                  <Select<OptionType>
                    {...field}
                    options={serifuOptions || []}
                    value={serifuOptions?.find(option => option.value === field.value) || null}
                    onChange={(selectedOption) => handleSerifuChange(selectedOption?.value)}
                  />
                )}
              />

            </Box>
            
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', my: 0.5, py: 1, maxWidth: '375px' }}>
            <Box sx={{ height: '100%', p:1, mx: 0.25, borderLeftStyle: 'solid ', borderBlockColor: 'hsl(219, 53.10%, 44.30%)' }}>
              <Typography
                variant="caption"
                color="text.secondary"
                gutterBottom
                sx={{
                  whiteSpace: 'pre-line', // Preserve line breaks
                }}
              >
                {serifuDetail}
              </Typography>
            </Box>
            
          </Box>

        {/* つぶやき */}
        <Box sx={{ display: 'flex', flexDirection: 'column', my: 0.5 }}>
          <Box>
            <FormLabel htmlFor="kubun" sx={{ fontWeight: 600 }}>
            つぶやき
            </FormLabel>
          </Box>

          <Box>
            <TextField
              id="tm_userctmment"
              multiline
              minRows={4}
              maxRows={4}
              variant="filled"
              sx={{
                width: '375px',
                '& .MuiFilledInput-root': {
                  paddingTop: '0.5rem',
                  backgroundColor: 'hsl(0, 0%, 99%)',
                  border: '1px solid hsla(220, 20%, 80%, 0.4)'
                },
              }}
            />
          </Box>

        </Box>

        </Box>
        <Divider sx={{ my: 1 }}/>


        <Box sx={{ mt: 2, textAlign: 'center'  }}>
          <Button
            sx={{ minWidth: '320px' }}
            variant="contained" color="primary">
            つぶやく
          </Button>
        </Box>

        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Link href={`/account/`} passHref >
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