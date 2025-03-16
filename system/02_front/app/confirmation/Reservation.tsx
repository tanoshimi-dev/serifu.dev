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

export default function Reservation() {

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
      <Box sx={{ xl: {width: '75%'}, sm: {width: '100%'} }} >
      
      {/* 予約 */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 80 }}>
            <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              予約日時：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            <Box>東京都新宿区 新宿健診プラザ</Box>
            <Box>2025/02/18　09:45 - 10:00</Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }}/>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 80 }}>
          <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              予約日時：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            <Box>東京都新宿区 新宿健診プラザ</Box>
            {/* <Box>山形県山形市 山形健康管理センター</Box> */}
            <Box>2025/02/19　10:45 - 11:00</Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }}/>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'start', my: 0.25 }}>
          <Box sx={{ minWidth: 80 }}>
          <FormLabel htmlFor="email" sx={{ fontWeight: 600 }}>
              予約日時：
            </FormLabel>
          </Box>
          <Box sx={{ margin: '0 4px' }}>
            <Box>東京都新宿区 新宿健診プラザ</Box>
            {/* <Box>栃木県小山市 とちぎ健診プラザ</Box> */}
            <Box>2025/02/21　14:30 - 14:45</Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }}/>

    </Box>
  );
}