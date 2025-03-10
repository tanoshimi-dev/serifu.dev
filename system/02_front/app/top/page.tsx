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
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
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
              <Header />
              {/* <MainGrid /> */}
              <RowSpanningCalendar/>
              <RowSpanningClassSchedule/>

            </Stack>
          </Box>
         

          

        </Box>


      </ThemeProvider>
    </TemplateFrame>
  );
}
