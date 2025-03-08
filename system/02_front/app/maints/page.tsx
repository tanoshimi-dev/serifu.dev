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
import getDashboardTheme from '../../apptheme/getDashboardTheme';
import Header from '../../components/Header';
import TemplateFrame from '../TemplateFrame';
import Toolbar from '@mui/material/Toolbar';
import ListPanel from './ListPanel';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
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
    <TemplateFrame>
      <CssBaseline enableColorScheme />
      <Box sx={{ m: 4, display: 'flex', flexDirection: 'column' }}>
                      
        <Box >
          <Typography variant="h5">
            【サンプル　検索条件入力】
          </Typography>
        </Box>
        
        {/* <Box>
          【本当登録情報検索】
          <Divider />
        </Box> */}
        
        {/* Main content  */}
        <Box
          component="main"
          sx={(theme) => ({
            mt: 4, 
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
              mx: 12,
              // pb: 10,
              // mt: { xs: 8, md: 0 },
              mt: { m: 0, p: 0 },
            }}
          >
            {/* <Header />
              */}


            {/* <MainGrid /> */}
            <ListPanel/>

          </Stack>
        </Box>
      </Box>
    </TemplateFrame>
  );
}
