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

interface MainMenuProps {
  currentUrl: string;
}

export default function MainMenu({ currentUrl }: MainMenuProps): React.JSX.Element {
  return (
    <Box sx={{ ml:2, display: 'flex', alignItems: 'center', gap: 1,  height: '40px' }}>
      <Link href={`/`} passHref>
        {currentUrl == '/' 
          ?
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            トップ
          </Typography>
          :
          <>トップ</>
        }
      </Link>
      
      {/* <Link href={`/confirmation`} passHref >
        {currentUrl == '/confirmation/' 
          ?
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            予約確認
          </Typography>
          :
          <>予約確認</>
        }
      </Link>
      <Link href={`/reservation`} passHref >
        { (currentUrl && currentUrl.startsWith('/reservation/'))
          ?
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            受診予約
          </Typography>
          :
          <>受診予約</>
        }
      </Link> */}
      <Link href={`/quote`} passHref >
        { (currentUrl && currentUrl.startsWith('/quote/'))
          ?
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            セリフ
          </Typography>
          :
          <>セリフ</>
        }
      </Link>
    </Box>
  );
}
