'use client'
import React, { useState, useEffect, useCallback, use, Suspense } from "react";

import { useRouter, useSearchParams } from 'next/navigation'

import Image from "next/image";
import styles from "./page.module.css";
import { Backdrop, Button, Box, Typography, CssBaseline } from "@mui/material";

import Header from '../components/Header';
import TemplateFrame from './TemplateFrame';

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   // Redirect to the /products page
  //   router.push("/home");
  // }, [router]);


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
                山岡 士郎 さん
              </Typography>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography>
              次回の検診予定日は以下の通りです。
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Box>東京都新宿区 新宿健診プラザ</Box>
            <Box>2025/02/18　09:45 - 10:00</Box>
          </Box>

          {/* <Box sx={{ mb: 2 }}>
            <Button
              sx={{ minWidth: '360px' }}
              variant="outlined" color="primary" onClick={() => router.push("/reservation")}>
              予約/変更
            </Button>

          </Box>

          <Box sx={{ mb: 2}}>
            <Button
              sx={{ minWidth: '360px' }}
              variant="outlined" color="primary" onClick={() => router.push("/customer/histories")}>
              予約の確認/キャンセル
            </Button>
          </Box> */}


        </Box>
      </TemplateFrame>
    </Suspense>
  );
}
