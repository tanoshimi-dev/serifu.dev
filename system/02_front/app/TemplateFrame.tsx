import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  styled,
} from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ToggleColorMode from '../components/ToggleColorMode';
import getDashboardTheme from '../apptheme/getDashboardTheme';
import Typography from '@mui/material/Typography';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

interface TemplateFrameProps {
  children: React.ReactNode;
}

export default function TemplateFrame({
  children,
}: TemplateFrameProps) {
  
  const dashboardTheme = createTheme(getDashboardTheme('light'));
  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}
