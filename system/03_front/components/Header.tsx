'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login as accountLogin, fetchStatus, user, isLoggedIn, logout as accountLogout,
  rememberMeLogin, getUser
} from '@/lib/rtk/slices/accountSlice';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';

import Search from './Search';

import OptionsMenu from './OptionsMenu';
import ToggleColorMode from './ToggleColorMode';
import ColorModeIconDropdown from './ColorModeIconDropdown';
import { Box, BoxProps } from '@mui/material';
import MainMenu from './MainMenu';
import Login from './Login';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Link from 'next/link'

import { User } from '@/lib/types/user';

function Item(props: BoxProps) {

  const { sx, ...other } = props;

  return (
    <Box
      sx={[
        (theme) => ({
          bgcolor: '#fff',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}


export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const apiResStatus = useSelector(fetchStatus);
  const apiResData = useSelector(user);
  const apiResIsLoggedIn = useSelector(isLoggedIn);

  const pathname = usePathname();
  console.log('pathname', pathname);

  useEffect(() => {
    // dispatch(getAuthUser());
    console.log('アカウント -----------------------')    
    dispatch(getUser());
    
  }, [pathname]);

  // useEffect(() => {
  //   if ( apiResStatus === 'success' && apiResData) {
  //     console.log('apiResData', apiResData);

  //     setUser(apiResData);

  //   }
  // }, [apiResStatus, apiResData]);

  return (

  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {'lg':'repeat(4, 1fr)', 'sm':'repeat(2, 1fr)'},
      gap: 1,
      gridTemplateRows: 'auto',
      gridTemplateAreas: `"mainManu . . subMenu"`,
      backgroundColor: '#f5f5f5',
    }}
  >
    <Box sx={{ gridArea: 'mainManu', }}>
      <MainMenu 
        currentUrl={pathname} 
        currentUser={apiResData as User} 
      />
    </Box>
    {/* <Box sx={{ gridArea: 'subMenu', alignSelf: 'center', justifySelf: 'end' }}>
      <MenuButton showBadge aria-label="Open notifications">
        <NotificationsRoundedIcon />
      </MenuButton>
    </Box> */}
    <Box sx={{ minHeight: '40px', display: 'flex', gridArea: 'subMenu', alignSelf: 'center',alignItems: 'center', justifySelf: 'end', pr: 2 }}>
      {/* <OptionsMenu />
       <Link href={`/login`} passHref >
         <LoginRoundedIcon/>
       </Link>
       test
       */}
      <Login 
        currentUrl={pathname} 
        currentUser={apiResData as User} 
      />
    </Box>
  </Box>

  );
}
