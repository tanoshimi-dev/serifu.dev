import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Box } from '@mui/material';
import Link from 'next/link'
import { User } from '@/lib/types/user';

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


interface Props {
  currentUrl: string;
  currentUser: User;
}
export default function MainMenu({ currentUrl, currentUser }: Props): React.JSX.Element {

  console.log('MENU currentUser', currentUser) 

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
      
      <Link href={`/serifu`} passHref >
        { (currentUrl && currentUrl.startsWith('/serifu/'))
          ?
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            みんなが使ったセリフ
          </Typography>
          :
          <>みんなが使ったセリフ</>
        }
      </Link>
      {currentUser?.id &&
        <Link href={`/use`} passHref >
          { (currentUrl && currentUrl.startsWith('/use/'))
            ?
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
              使う
            </Typography>
            :
            <>使う</>
          }
        </Link>
      }
    </Box>
  );
}
