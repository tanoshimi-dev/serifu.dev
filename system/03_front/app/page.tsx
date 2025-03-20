'use client'

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';

import { 
  fetchStatus as fetchUserStatus, user
} from '@/lib/rtk/slices/accountSlice';

import { 
  fetchGenresStatus,  genres, userVerified, 
  getGenres
} from '@/lib/rtk/slices/serifuUseSlice';

import { useRouter, useSearchParams, usePathname } from 'next/navigation'


import Image from "next/image";
import styles from "./page.module.css";
import { Backdrop, Button, Box, Typography, CssBaseline } from "@mui/material";

import Header from '../components/Header';
import TemplateFrame from './TemplateFrame';

export default function Home() {
  
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  
  const apiResFetchUserStatus = useSelector(fetchUserStatus);
  const apiResUserData = useSelector(user);

  const apiResFetchGenresStatus = useSelector(fetchGenresStatus);
  const apiResGenresData = useSelector(genres);
  const apiResUserVerified = useSelector(userVerified);

  useEffect(() => {
    console.log('ジャンル -----------------------')    
    dispatch(getGenres());
    
  }, []);

  useEffect(() => {

  }, [apiResFetchUserStatus, apiResFetchGenresStatus]);

  return (
    <Suspense>
      <TemplateFrame>
        <CssBaseline enableColorScheme />
        <Header />
        <Box sx={{ mx:3, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'start', height: '60vh'
         }}>

          <Box sx={{ my: 2 }}>
            <Box>
              <Image src="/images/no_image_square.jpg" alt="logo" width={180} height={120} />
            </Box>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1rem' }}>
                { (apiResUserData && apiResUserData?.name)  &&
                  apiResUserData?.name + ` さん`
                }
              </Typography>
            </Box>
            
            <Box sx={{ mt:2, textAlign: 'center' }}>
            { (apiResFetchGenresStatus && !apiResUserVerified)  &&
              <Typography variant="caption" sx={{ color: 'text.primary', fontSize: '1rem' }}>
                メールアドレスが未検証です
              </Typography>
            }
            </Box>

          </Box>
          {/* <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Box>東京都新宿区 新宿健診プラザ</Box>
            <Box>2025/02/18　09:45 - 10:00</Box>
          </Box> */}


        </Box>
      </TemplateFrame>
    </Suspense>
  );
}
