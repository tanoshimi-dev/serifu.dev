import React, { useState, useEffect, useCallback } from "react";
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const mainListItems = [
  { text: '注文', link: 'orders', icon: <HomeRoundedIcon /> },
  { text: '入庫', link: 'inventory', icon: <AssignmentRoundedIcon /> },
];

const masterListItems = [
  { text: '商品', link: 'products', icon: <AnalyticsRoundedIcon /> },
  { text: 'ブランド', link: 'brands', icon: <PeopleRoundedIcon /> },
  { text: '契約プラン', link: 'plans', icon: <IntegrationInstructionsIcon /> },
];


const secondaryListItems = [
  { text: '未選択', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },

];


export default function MenuContent() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

  console.log('★MenuContent★ currentUrl', currentUrl);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 2, mt: 4.5, justifyContent: 'space-start' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              // selected={index === 0}
              selected={ (`/${item.link}/`) === currentUrl}
            >
              
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <Link href={`/${item.link}`} passHref >
                <ListItemText primary={item.text}  
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontSize: '1.125rem', // Change primary text font size
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '1rem', // Change secondary text font size
                    },
                  }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}


{/*
      <Divider />
      <Box sx={{ mx: 2, my: 1, fontSize: '1.125rem' }} >ブランド</Box>
      <Box sx={{ minHeight: '520px', maxHeight: '520px', overflow: 'auto' }}>
        <List dense >
          {secondaryListItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block', pl: '1rem' }}>
              <ListItemButton selected={index === 0}>
                <ListItemText primary={item.text}  
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box> */}

      <Divider sx={{ py: 0, my: 1 }} />

      <List dense sx={{ py: 0, my: 0 }} >
        <ListItem key={`sales_1`} disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={`売上`}  
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontSize: '1.125rem', // Change primary text font size
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '1rem', // Change secondary text font size
                  },
                }}
              />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ py: 0, my: 1 }}>
              <ListItemButton
                selected={ (`/sales/invoice/`) === currentUrl}
              >
                <ListItemIcon>
                </ListItemIcon>
                <Link href={`/sales/invoice/`} passHref >
                  <ListItemText primary="インボイス" sx={{ pl: 1 }} />
                </Link>
              </ListItemButton>
            </List>
            <List component="div" disablePadding sx={{ py: 0, my: 1 }}>
              <ListItemButton 
                sx={{ pl: 4 }}
                selected={ (`/sales/history/`) === currentUrl}
              >
                <ListItemIcon>
                </ListItemIcon>
                <Link href={`/sales/history/`} passHref >
                  <ListItemText primary="売上履歴" sx={{ pl: 1 }} />
                </Link>
              </ListItemButton>
            </List>
          </Collapse>
        </ListItem>
      </List>

      <List dense sx={{ py: 0, my: 0 }} >
        {masterListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              // selected={index === 0}
              selected={ (`/${item.link}/`) === currentUrl}
            >
              
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <Link href={`/${item.link}`} passHref >
                <ListItemText primary={item.text}  
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontSize: '1.125rem', // Change primary text font size
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '1rem', // Change secondary text font size
                    },
                  }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>


    </Stack>
  );
}
