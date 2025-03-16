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
import SearchPermanentListPanel from "./SearchPermanentListPanel";
import TemplateFrame from "@/app/TemplateFrame";
import Link from 'next/link';

const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;


export default function SearchTemporary() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();


 const [mode, setMode] = useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  useEffect(() => {
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

  return (
    <Suspense>
      <TemplateFrame>
        <CssBaseline enableColorScheme />
        <Header />
        <Box sx={{ mx: 4 , mt: 1 }}>
          <Box sx={{ mx: 2 }}>
            <Typography variant="h5">
            【登録情報検索】
            </Typography>
            <Divider sx={{ mt:1 }}/>
          </Box>
          <Box sx={{ mt:4, mx: 2 }}>
            <SearchPermanentListPanel key={`searchTemporary`}/>
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
