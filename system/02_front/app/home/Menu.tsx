import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link'

import Topics from './internals/Topics';

type Menu = { id: number; label: string; link: string, adminOnly: boolean };

const menus: Array<Menu> = [
  {
    id: 0,
    label: 'メンテナンス情報仮登録',
    link: './search/temporary',
    adminOnly: false,
  },
  {
    id: 1,
    label: 'メンテナンス情報本登録',
    link: './temporary/list',
    adminOnly: false,
  },
  {
    id: 2,
    label: 'メンテナンス情報照会',
    link: './search/permanent',
    adminOnly: false,
  },
  // {
  //   id: 3,
  //   label: 'トピックス情報編集',
  //   link: '/home',
  //   adminOnly: true,
  // },
  // {
  //   id: 4,
  //   label: 'ログ参照',
  //   link: '/home',
  //   adminOnly: true,
  // },
];


const rootStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};

export default function Menu() {
  return (
    <Box sx={rootStyles}>
      <List>
        {menus.map((menu) => (
          <ListItem key={menu.id} disablePadding sx={{ display: 'block' }}>

            <Link href={`/${menu.link}`} passHref >
              <ListItemText primary={menu.label}  
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontSize: '1rem', // Change primary text font size
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '1rem', // Change secondary text font size
                  },
                }}
              />
            </Link>

          </ListItem>
        ))}
      </List>
      <Topics/>     
    </Box>
  );
}