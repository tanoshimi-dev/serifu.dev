'use client'
import React, { useState, useEffect, useCallback, use, Suspense } from "react";

import { useRouter } from "next/navigation";

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
          alignItems: 'center', justifyContent: 'center', height: '60vh'
         }}>

          <Box>
            <Box>
              <Image src="/images/no_image_square.jpg" alt="logo" width={180} height={120} />
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography>
              ようこそ
              </Typography>
            </Box>
            <Box>
              <Typography>
              XXXXXXXXXXXXXXXXXXXXXXXXです。
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography>
              以下よりメニューを選択してください。
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button
              sx={{ minWidth: '360px' }}
              variant="outlined" color="primary" onClick={() => router.push("/customer/histories")}>
              個人情報を登録する
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button
              sx={{ minWidth: '360px' }}
              variant="outlined" color="primary" onClick={() => router.push("/customer/histories")}>
              予約/変更
            </Button>

          </Box>

          <Box sx={{ mb: 2}}>
            <Button
              sx={{ minWidth: '360px' }}
              variant="outlined" color="primary" onClick={() => router.push("/customer/histories")}>
              予約の確認/キャンセル
            </Button>
          </Box>


        </Box>
      </TemplateFrame>
    </Suspense>
  );
}
