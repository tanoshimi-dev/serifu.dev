'use client';

import * as React from 'react';
import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import getDashboardTheme from './theme/getDashboardTheme';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import TemplateFrame from './TemplateFrame';

import RowSpanningCalendar from './components/RowSpanningCalendar';
import RowSpanningClassSchedule from './components/RowSpanningClassSchedule';

import ReservationGridTable from './ReservationGridTable';
import { Button, Checkbox, Modal, Typography } from '@mui/material';
import { Divider, FormControl, FormControlLabel, MenuItem, Popover, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material";

import PDFViewer from './PDFViewer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pdfRead, setPdfRead] = React.useState(false);
  const handlePdfRead = () => setPdfRead(true);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    console.log(scrollTop, scrollHeight, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight) {
      setPdfRead(true);
    }
  };

  return (
    <TemplateFrame>
      <CssBaseline enableColorScheme />

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gainsboro',
        width: '100vw',
       }}>
        {/* Main content  */}
        <Box
          onScroll={handleScroll}
          component="main"
          sx={(theme) => ({
            /*flexGrow: 1,*/
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto', // Enable scrolling
            height: '300px', // Full height
            maxWidth: '375px', // Full width
          })}
        >

          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              mx: 3,
              mt: { m: 4, p: 0 },
            }}
          >
            <Header />
            
            <PDFViewer />

          </Stack>
        </Box>

        <FormControlLabel
          control={
            <Checkbox 
              name="tm_regularcheck" 
              sx={{
                my: 0,
                p: 0,
              }}
              size="small" 
            />
          }
          disabled={!pdfRead}
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