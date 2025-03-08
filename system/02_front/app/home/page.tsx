'use client';
import { Suspense, useEffect } from "react";
import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import getDashboardTheme from '../../apptheme/getDashboardTheme';
import Header from '../../components/Header';
import TemplateFrame from '../TemplateFrame';
import Toolbar from '@mui/material/Toolbar';
import Menu from './Menu';


export default function Home() {

  return (
    <Suspense>
      <TemplateFrame>
        <CssBaseline enableColorScheme />
        <Header />
        <Box sx={{ flexGrow: 1, mx:3 }}>
          <Menu />
        </Box>
      </TemplateFrame>
    </Suspense>
  );
}
