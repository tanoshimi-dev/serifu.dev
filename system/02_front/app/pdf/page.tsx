'use client';

import * as React from 'react';
import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from '@mui/material/styles';
import Image from 'next/image';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import getDashboardTheme from './theme/getDashboardTheme';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import TemplateFrame from './TemplateFrame';

import { useRouter } from "next/navigation";
import RowSpanningCalendar from './components/RowSpanningCalendar';
import RowSpanningClassSchedule from './components/RowSpanningClassSchedule';

import ReservationGridTable from './ReservationGridTable';
import { Button, Checkbox, Modal, Typography } from '@mui/material';
import { Divider, FormControl, FormControlLabel, MenuItem, Popover, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material";

import PDFViewer from './PDFViewer';


export default function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pdf1Read, setPdf1Read] = React.useState(false);
  const [pdf2Read, setPdf2Read] = React.useState(false);
  //const handlePdfRead = () => setPdfRead(true);
  const handleScrollPdf1 = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    console.log(scrollTop, scrollHeight, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight) {
      setPdf1Read(true);
    }
  };

  const handleScrollPdf2 = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    console.log(scrollTop, scrollHeight, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight) {
      setPdf2Read(true);
    }
  };

  return (
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

          <Box
            onScroll={handleScrollPdf1}
            component="main"
            sx={(theme) => ({
              my: 2,
              /*flexGrow: 1,*/
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto', // Enable scrolling
              height: '300px', // Full height
              maxWidth: '375px', // Full width
            })}
          >

            <Box sx={{ mb: 2 }}>
              <PDFViewer />
            </Box>

          </Box>

          <FormControlLabel
            control={
              <Checkbox 
                name="tm_regularcheck" 
                sx={{
                  my: 2,
                  p: 0,
                }}
                size="small" 
              />
            }
            disabled={!pdf1Read}
            label="同意する"
            sx={{ 
              '& .MuiTypography-root': { 
                fontSize: 'small',
                color: 'hsl(220, 20%, 35%)' 
              }
            }}
          />

        <Box
          onScroll={handleScrollPdf2}
          component="main"
          sx={(theme) => ({
            /*flexGrow: 1,*/
            my: 2,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto', // Enable scrolling
            height: '300px', // Full height
            maxWidth: '375px', // Full width
          })}
        >

          <Box sx={{ mb: 2 }}>
            <PDFViewer />
          </Box>

        </Box>
        <FormControlLabel
            control={
              <Checkbox 
                name="tm_regularcheck" 
                sx={{
                  my: 2,
                  p: 0,
                }}
                size="small" 
              />
            }
            disabled={!pdf2Read}
            label="同意する"
            sx={{ 
              '& .MuiTypography-root': { 
                fontSize: 'small',
                color: 'hsl(220, 20%, 35%)' 
              }
            }}
          />



      
      </Box>

    </TemplateFrame>
  );
}