'use client';

import React, { useState, useEffect, useCallback } from "react";

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {
  ThemeProvider,
  createTheme,
  styled,
  PaletteMode,
} from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import getSignInTheme from './theme/getSignInTheme';
import TemplateFrame from './TemplateFrame';

import { useRouter } from 'next/navigation';

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login as accountLogin, fetchStatus, account, isAccountLoggedIn, logout as accountLogout,
  rememberMeLogin, getAuthUser, getUser
} from '@/lib/rtk/slices/accountSlice';

import { useAuth } from '../../lib/context/AuthProvider';

import { MAccount } from '@/types/m_account';
import { ApiArgsAccount } from '@/types/api_args';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignIn() {
  const { isLoggedIn, login, logout } = useAuth();
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [idError, setIdError] = React.useState(false);
  const [idErrorMessage, setIdErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  
  const dispatch: AppDispatch = useDispatch();
  const apiResStatus = useSelector(fetchStatus);
  const apiResData = useSelector(account);
  const apiResIsLoggedIn = useSelector(isAccountLoggedIn);

console.log('apiResStatus', apiResStatus) 
console.log('apiResIsLoggedIn', apiResIsLoggedIn) 
console.log('apiResData', apiResData) 

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!apiResIsLoggedIn) {
      
      const data = new FormData(event.currentTarget);
      const userid   = data.get('userid');
      const password = data.get('password');
  
      dispatch(accountLogin({userid, password} as ApiArgsAccount));
  
    } else {
      dispatch(accountLogout());

    }


  };

  const validateInputs = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const account = document.getElementById('account') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    alert('account: ' + account.value + ', password: ' + password.value);
    // let isValid = true;

    // if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    //   setEmailError(true);
    //   setEmailErrorMessage('Please enter a valid email address.');
    //   isValid = false;
    // } else {
    //   setEmailError(false);
    //   setEmailErrorMessage('');
    // }

    // if (!password.value || password.value.length < 6) {
    //   setPasswordError(true);
    //   setPasswordErrorMessage('Password must be at least 6 characters long.');
    //   isValid = false;
    // } else {
    //   setPasswordError(false);
    //   setPasswordErrorMessage('');
    // }

    // return isValid;

    //router.push("/orders");

  };




  const handleTokenLogin = () => {
    console.log('handleTokenLogin');
    
    dispatch(rememberMeLogin());
  }

  const handleAuthUserInfo = () => {
    console.log('handleUserInfo');
    
    dispatch(getAuthUser());
  }


  const handleUserInfo = () => {
    console.log('handleUserInfo');
    
    dispatch(getUser());
  }



  useEffect(() => {
    // dispatch(getAuthUser());
    dispatch(getUser());
    
  }, []);


  
  const handleSignOut = () => {
    console.log('handleSignOut');
    
    dispatch(accountLogout());
  }


  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h5"
              sx={{ width: '100%', fontSize: 'clamp(1.25rem, 10vw, 2rem)' }}
            >
              ログイン
            </Typography>
            
            <FormControl
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="userid">Email</FormLabel>
                <TextField
                  error={idError}
                  helperText={idErrorMessage}
                  id="userid"
                  type="text"
                  name="userid"
                  // placeholder="your@email.com"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={idError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'userid' }}
                  // defaultValue={`test3`}
                  defaultValue={``}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">Password</FormLabel>

                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  // placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                  defaultValue={`password`}
                  //defaultValue={``}
                />
              </FormControl>
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign in
              </Button>
              <Link
                component="button"
                type="button"
                onClick={()=>{}}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                パスワードを忘れた場合
              </Link>
              <Divider>or</Divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ textAlign: 'center' }}>
                  アカウント未登録の場合{' '}
                  <Link
                    href="/material-ui/getting-started/templates/sign-in/"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    新規登録
                  </Link>
                </Typography>
              </Box>

            {/* { apiResStatus === 'success' && apiResIsLoggedIn === true && apiResData && 
              <div key={apiResData.id}>
                <p>id:{apiResData.id}</p>
                <p>user_id:{apiResData.userid}</p>
                <p>authority:{apiResData.authority}</p>
              </div>
            } */}

            </FormControl>

            {/* <Divider/>


            <Button
              type="button"
                fullWidth
                onClick={handleUserInfo}
                sx={{ backgroundColor: 'gray', color: 'white' }}
              >
              User Info
            </Button> */}

          </Card>
        </SignInContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
