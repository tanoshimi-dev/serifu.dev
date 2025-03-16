
'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login as accountLogin, fetchStatus, account, isAccountLoggedIn, logout as accountLogout,
  rememberMeLogin, getAuthUser, getUser
} from '@/lib/rtk/slices/accountSlice';
import { Typography } from '@mui/material';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

interface MainMenuProps {
  currentUrl: string;
}
export default function Login({ currentUrl }: MainMenuProps): React.JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const apiResStatus = useSelector(fetchStatus);
  const apiResData = useSelector(account);
  const apiResIsLoggedIn = useSelector(isAccountLoggedIn);

  
  // console.log('アカウントapiResStatus', apiResStatus) 
  // console.log('アカウントapiResIsLoggedIn', apiResIsLoggedIn) 
  //console.log('アカウントapiResData', apiResData) 
  
  useEffect(() => {
    // dispatch(getAuthUser());
    //console.log('アカウント -----------------------')
    
    //dispatch(getUser());
    
  }, []);


  return (
    <>
      {/* {(apiResIsLoggedIn && apiResData) ? 
      <>{apiResData?.userid}</> 
      :
      <>ゲスト</> 
      } */}

      <>
        {currentUrl == '/login/' 
          ?
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            未ログイン
          </Typography>
          :
          // <>ログインしてください<LoginRoundedIcon/></>
          <><LogoutRoundedIcon/></>
        }
      </> 
    </>
  );
}
