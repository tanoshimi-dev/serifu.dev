import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider, FormLabel, Modal, Stack, Typography } from '@mui/material';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Link from 'next/link'


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

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [reserveDateTime, setReserveDateTime] = React.useState('');


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleReservation = (data:string, time:string) => {
    setReserveDateTime(data + ' ' + time);
    setOpen(true);
  }

  return (
    <Box sx={{ px: 2 }} >
      
    {/* <Box sx={{ xl: {width: '75%'}, sm: {width: '100%'} }} > */}
      
      {/* プロフィール */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              メールアドレス：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            abcdefghijklmn@opqr.stuvw.xyz
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              パスワード：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            ********
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }}/>

      {/* プロフィール1 */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              名前：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            山岡 士郎
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              名前（カナ）：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            ヤマオカ シロウ
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            生年月日：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            1980/01/01
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            性別：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            男
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            電話番号：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            012-3456-7890
          </Box>
        </Box>

      </Box>
      <Divider sx={{ my: 1 }}/>

      {/* プロフィール2 */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              企業名：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
          東西新聞社
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            事業所名：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
          本社 文化部
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            保険証区分：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            本人
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            保険証記号：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            12345678
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            保険証番号：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            123
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }}/>

      {/* 同意書 */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              個人情報：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
          ✔
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              利用規約：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
          ✔
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
            プライバシーポリシー：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            ✔
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 1 }}/>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href={`/account/edit`} passHref >
          <Button
            sx={{ minWidth: '320px' }}
            variant="outlined" color="primary">
            変更
          </Button>
        </Link>
      </Box>

    </Box>
  );
}