import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';

import Search from './Search';

import OptionsMenu from './OptionsMenu';
import ToggleColorMode from './ToggleColorMode';
import ColorModeIconDropdown from './ColorModeIconDropdown';
import { Box, BoxProps } from '@mui/material';
import MainMenu from './MainMenu';
import Account from './Account';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          bgcolor: '#fff',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}


export default function Header() {
  return (
    // <Stack
    //   direction="row"
    //   sx={{
    //     display: { xs: 'none', md: 'flex' },
    //     width: '100%',
    //     alignItems: { xs: 'flex-start', md: 'center' },
    //     justifyContent: 'space-between',
    //     backgroundColor: '#f5f5f5',
    //     height: '40px'
    //   }}
    //   spacing={2}
    // >     
    //   <Stack direction="row" sx={{ gap: 1,  }}>
    //     <LeftMenu />
    //   </Stack>
    //   <Stack direction="row" sx={{ gap: 1 }}>
    //     <OptionsMenu />
    //     <MenuButton showBadge aria-label="Open notifications">
    //       <NotificationsRoundedIcon />
    //     </MenuButton>
    //     <ToggleColorMode mode={'dark'} toggleColorMode={()=>{ console.log('mode changed') }} />
    //     <ColorModeIconDropdown />
    //   </Stack>
    // </Stack>

  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {'lg':'repeat(4, 1fr)', 'sm':'repeat(2, 1fr)'},
      gap: 1,
      gridTemplateRows: 'auto',
      gridTemplateAreas: `"mainManu . . subMenu"`,
      backgroundColor: '#f5f5f5',
    }}
  >
    <Box sx={{ gridArea: 'mainManu', }}>
      {/* <MainMenu /> */}
    </Box>
    {/* <Box sx={{ gridArea: 'subMenu', alignSelf: 'center', justifySelf: 'end' }}>
      <MenuButton showBadge aria-label="Open notifications">
        <NotificationsRoundedIcon />
      </MenuButton>
    </Box> */}
    <Box sx={{ gridArea: 'subMenu', alignSelf: 'center', justifySelf: 'end', pr: 4 }}>
      <OptionsMenu />
      <Account />
    </Box>
  </Box>

  );
}
