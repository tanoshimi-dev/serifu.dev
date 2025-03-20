'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login as accountLogin, fetchStatus, user, isLoggedIn, logout as accountLogout,
  getUser
} from '@/lib/rtk/slices/accountSlice';

import Link from 'next/link'

import { Box, Typography, Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';


import { User } from '@/lib/types/user';


interface Props {
  currentUrl: string;
  currentUser: User;
}
export default function Login({ currentUrl, currentUser }: Props): React.JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const apiResStatus = useSelector(fetchStatus);
  const apiResData = useSelector(user);
  const apiResIsLoggedIn = useSelector(isLoggedIn);

  const [logoffOperation, setLogoffOperation] = React.useState(false);
  const [loginOperation, setLoginOperation] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  console.log('アカウントapiResStatus', apiResStatus) 
  console.log('アカウントapiResIsLoggedIn', apiResIsLoggedIn) 
  console.log('アカウントapiResData', apiResData) 
  console.log('currentUser', currentUser) 

  // useEffect(() => {
  //   // dispatch(getAuthUser());
  //   console.log('アカウント -----------------------')    
  //   dispatch(getUser());
    
  // }, []);

  const handleSignOut = () => {
    console.log('handleSignOut');
    setLogoffOperation(true);
    setErrorMessage(null);

    dispatch(accountLogout());
  }

  useEffect(() => {
    if ( (loginOperation || logoffOperation) && apiResStatus === 'success' && apiResData) {
      console.log('apiResData', apiResData);

      setErrorMessage(null);

      if (logoffOperation) {
        console.log('Account Logged out');
        setLogoffOperation(false);
        setLoginOperation(false);
        router.push("/");
      }

    }
  }, [apiResStatus]);


  return (
    <Box sx={{ py: 0, my:0, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
      
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={logoffOperation}
      >  
        <CircularProgress color="inherit" />
      </Backdrop>

      {(currentUser?.id) ? 
        <>
          <Box sx={{ pt: '1px' }}>
            {currentUser?.name}
          </Box>
          <Box sx={{ ml: 0.5}} onClick={handleSignOut}>
            <LoginRoundedIcon/>
          </Box>
        </>
        :
        <>
          <Box sx={{ pt: '1px' }}>
            ゲスト
          </Box>
          <Box sx={{ ml: 0.5}}>
            <Link href={`/login`} passHref >
              <LogoutRoundedIcon/>
            </Link>
          </Box>
        </>
      }
    </Box>
  );
}
