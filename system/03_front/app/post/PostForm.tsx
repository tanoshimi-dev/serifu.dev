import * as React from 'react';
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

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  // overflow: 'hidden',
  //textOverflow: 'ellipsis',
  overflow: 'auto',
  minHeight: '100%',
});



export default function ProfileEditor() {
  
  const defaultOptions = [
    { label: '美味しんぼ', value: '0' },
    { label: '笑うせぇるすまん', value: '1' },
    { label: '葬送のフリーレン', value: '2' },
    { label: 'ポケモン', value: '3' },
  ]

  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(() => {
    setOptions(defaultOptions)
    console.log('option:', options)
  }
  , []);

  const defaultValues = {
    sex: '0',
    kubun: '0',
    kubuns: [
      { label: '美味しんぼ', value: '0' },
      { label: '笑うせぇるすまん', value: '1' },
      { label: '葬送のフリーレン', value: '2' },
      { label: 'ポケモン', value: '3' },
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
                          <SmallRadio sx={{ pt: 1  }} />
  } 
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
              <FormLabel htmlFor="kubun" sx={{ fontWeight: 600 }}>
              作品名
              </FormLabel>
            </Box>
            <Box>
              

              <Controller
                name="kubun"
                control={control}
                render={({ field }) => (
                  <Select {...field}
                    options={options}
                  >
                    {/* {(getValues('kubuns')) && (getValues('kubuns')).map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))} */}
                  </Select>
                )}
              />

            </Box>
            
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', my: 0.5 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormLabel htmlFor="kubun" sx={{ fontWeight: 600 }}>
              セリフ
              </FormLabel>
            </Box>
            <Box >
              
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

          <Box sx={{ display: 'flex', flexDirection: 'column', my: 0.5, py: 1 }}>
            <Box sx={{ height: '100%', p:1, mx: 0.25, borderLeftStyle: 'solid ', borderBlockColor: 'hsl(219, 53.10%, 44.30%)' }}>
              <Typography
                variant="caption"
                color="text.secondary"
                gutterBottom
              >
                士郎が素朴な家庭料理の味に感動した時に言ったセリフ。高級料理よりも、料理に込められた愛情や心遣いこそが本質だと気付く重要な場面で、作品のテーマを象徴する言葉です。
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