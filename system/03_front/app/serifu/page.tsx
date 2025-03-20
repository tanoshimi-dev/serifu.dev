'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  login, fetchStatus, user, logout, register as userRegister,
  getUser, isLoggedIn, 
  emailVerify, emailVerified
} from '@/lib/rtk/slices/accountSlice';


import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

//import Header from './components/Header';
// import TemplateFrame from './TemplateFrame';
import Header from '../../components/Header';
import TemplateFrame from '../TemplateFrame';

import SerifuForm from './SerifuForm';

import { Button, Modal, Typography } from '@mui/material';

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

  return (
    <TemplateFrame>
      <CssBaseline enableColorScheme />
      <Header />
      <Box sx={{ p: 1}} >

      </Box>

      <Box sx={{ display: 'flex' }}>

        {/* Main content  */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            // overflow: 'auto',
            overflow: 'hidden',
          })}
        >
          <Stack
            // spacing={2}
            spacing={1}
            sx={{
              alignItems: 'center',
              mx: 3,
              // pb: 10,
              // mt: { xs: 8, md: 0 },
              mt: { m: 0, p: 0 },
            }}
          >
            {/* <MainGrid /> */}
            <SerifuForm/>
          
          </Stack>
        </Box>
      </Box>

    </TemplateFrame>
  );
}
