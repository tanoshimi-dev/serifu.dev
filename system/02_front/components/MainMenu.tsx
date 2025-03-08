import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Box } from '@mui/material';
import Link from 'next/link'

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 4,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function MainMenu() {
  return (
    <Box sx={{ ml:2, display: 'flex', alignItems: 'center', gap: 1,  height: '40px' }}>
      <Link href={`/home`} passHref >
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          ホーム
        </Typography>
      </Link>
      <Link href={`/search/temporary`} passHref >
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
         仮登録
        </Typography>
      </Link>
      <Link href={`/search/permanent`} passHref >
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          本登録
        </Typography>
      </Link>
    </Box>
  );
}
