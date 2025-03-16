'use client'

import { Suspense, useEffect, useState } from "react";
import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from '@mui/material/styles';

import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';

import Image from "next/image";
import Typography from '@mui/material/Typography';
import { Box, CssBaseline, Divider, Button } from "@mui/material";
import getDashboardTheme from '../../../apptheme/getDashboardTheme';

import { ComponentArgsTCustomersTable } from '@/types/component_args';
import Header from "@/components/Header";
import SearchTemporaryListPanel from "./SearchTemporaryListPanel";
import TemplateFrame from "@/app/TemplateFrame";
import Link from 'next/link';

const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;


export default function SearchTemporary() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();


  const [showCustomTheme, setShowCustomTheme] = useState(true);


  const handleGotoNewCustomer = () => {
    console.log('handleGotoNewCustomer')
    // router.push(`/customer/edit/?new`);
    window.location.href = "/customer/edit/";
  }

  return (
    <Suspense>
      <TemplateFrame>
        <CssBaseline enableColorScheme />
        <Header />
        <Box sx={{ mx: 4 , mt: 1 }}>
          <Box sx={{ mx: 2 }}>
            <Typography variant="h5">
            【仮登録情報検索】
            </Typography>
            <Divider sx={{ mt:1 }}/>
          </Box>
          <Box sx={{ mx: 2 }}>
            {/* <Link href={`/customer/edit/?new`} passHref>
            </Link> */}

            <Button 
              onClick={handleGotoNewCustomer}
              variant="outlined" sx={{ mr:2, my:2 ,borderColor: 'gray', color: 'black' }} >顧客情報新規登録
            </Button>

            <SearchTemporaryListPanel key={`searchTemporary`}/>
            <Divider sx={{ mt:1, mb:2}}/>
            <Link href={`/home`} passHref>
              <Button variant="outlined" sx={{ mr:2, borderColor: 'gray', color: 'black' }} >戻る</Button>
            </Link>

          </Box>
        </Box>
      </TemplateFrame>
    </Suspense>
  );
}
