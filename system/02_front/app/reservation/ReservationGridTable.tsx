import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RowInnerContents from './RowInnerContents';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';

// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number,
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('1-India', 'IN', 1324171354, 3287263),
//   createData('2-China', 'CN', 1403500365, 9596961),
//   createData('3-Italy', 'IT', 60483973, 301340),
//   createData('4-United States', 'US', 327167434, 9833520),
//   createData('5-Canada', 'CA', 37602103, 9984670),
//   createData('6-Australia', 'AU', 25475400, 7692024),
//   createData('7-Germany', 'DE', 83019200, 357578),
//   createData('8-Ireland', 'IE', 4857000, 70273),
//   createData('9-Mexico', 'MX', 126577691, 1972550),
//   createData('10-Japan', 'JP', 126317000, 377973),
//   createData('11-France', 'FR', 67022000, 640679),
//   createData('12-United Kingdom', 'GB', 67545757, 242495),
//   createData('13-Russia', 'RU', 146793744, 17098246),
//   createData('14-Nigeria', 'NG', 200962417, 923768),
//   createData('15-Brazil', 'BR', 210147125, 8515767),
// ];


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

export default function ReservationGridTable() {

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
    <Paper sx={{ width: '100%' }}>

      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-title" sx={{ fontSize: 18 }} >
              以下の内容で予約しますか？
            </Typography>
          </Box>
          <Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5" component="h2">
              {reserveDateTime}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' , justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              onClick={handleClose}
              sx={{ width: 96, mx: 1 }}
            >
              予約
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              type="submit"
              onClick={handleClose}
              sx={{ width: 96, mx: 1 }}
            >
              キャンセル
            </Button>
          </Box>
        </Box>
      </Modal>

      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table" 
          sx={{ minWidth: '640px' }} size="small" >
          
          <TableHead >
            <TableRow >
              <TableCell align="center"
                sx={{ 
                  position: 'sticky', left: 0, zIndex: 300, 
                  width:'8px', px: 0, pt: 0.75, backgroundColor: 'hsl(0, 0%, 99%)' }}>
                <Box>
                  Time
                </Box>
              </TableCell>
              <TableCell key={`mon`} align={`center`}>
                <Box>
                  <Box>2/17</Box>
                  <Box>月</Box>
                </Box>
              </TableCell>
              <TableCell key={`tue`} align={`center`}>
                <Box>
                  <Box>2/18</Box>
                  <Box>火</Box>
                </Box>
              </TableCell>
              <TableCell key={`wed`} align={`center`}>
                <Box>
                  <Box>2/19</Box>
                  <Box>水</Box>
                </Box>
              </TableCell>
              <TableCell key={`thu`} align={`center`}>
                <Box>
                  <Box>2/20</Box>
                  <Box>木</Box>
                </Box>
              </TableCell>
              <TableCell key={`fri`} align={`center`}>
                <Box>
                  <Box>2/21</Box>
                  <Box>金</Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            
            {/* 09:00 - 09:15 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                  09:00
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="button"
                      onClick={()=> { handleReservation('2/17', '09:00') }}
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="button"
                      onClick={()=> { handleReservation('2/18', '09:00') }}
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="button"
                      onClick={()=> { handleReservation('2/19', '09:00') }}
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 09:15 - 09:30 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                09:15
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 09:30 - 09:45 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                09:30
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：3
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：1
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>                    
                  </Box>
                </Box>
              </TableCell>            
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 09:45 - 10:00 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                09:45
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 10:00 - 10:15 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                  10:00
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：5
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 10:15 - 10:30 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                10:15
                </Box>
              </TableCell>

              {/* Monday */}
              {/* <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：4
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>                    
                  </Box>
                </Box>
              </TableCell>
              
              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 10:30 - 10:45 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                10:30
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：3
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    {/* <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button> */}
                  </Box>
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：1
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>                    
                  </Box>
                </Box>
              </TableCell>            
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 10:45 - 11:00 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                10:45
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 11:00 - 11:15 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                  11:00
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 11:15 - 11:30 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                11:15
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 11:30 - 11:45 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                11:30
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：3
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：1
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>                    
                  </Box>
                </Box>
              </TableCell>            
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 11:45 - 12:00 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                11:45
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 13:00 - 13:15 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                  13:00
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：5
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 13:15 - 13:30 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                13:15
                </Box>
              </TableCell>

              {/* Monday */}
              {/* <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 13:30 - 13:45 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                13:30
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：3
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    {/* <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button> */}
                  </Box>
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：1
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>                    
                  </Box>
                </Box>
              </TableCell>            
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 14:45 - 14:00 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                13:45
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 14:00 - 14:15 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                  14:00
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 14:15 - 14:30 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                14:15
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }} rowSpan={2}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 14:30 - 14:45 */}
            <TableRow>
              <TableCell align="center"
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                14:30
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：3
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              {/* <TableCell align="center" width={80}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }} >
                <Box sx={{ my:1 }} >
                    空き：1
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell> */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：2
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>                    
                  </Box>
                </Box>
              </TableCell>            
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>

            {/* 14:45 - 15:00 */}
            <TableRow>
              <TableCell align="center" 
                sx={{ position: 'sticky', left: 0, width: '8px', px: 0, pt: 0.65, zIndex: 1, backgroundColor: 'hsla(220, 20%, 97.6%, 1)' }}>
                <Box>
                14:45
                </Box>
              </TableCell>

              {/* Monday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Tuesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：3
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              
              {/* Wednesday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：1
                  </Box>
                  <Box sx={{ my:0.5 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                    >
                      予約
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Thursday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}> 
                  </Box>
                </Box>
              </TableCell>

               {/* Friday */}
              <TableCell align="center" width={60} sx={{ p: 0 }}>
                <Box>
                  <Box sx={{ my:0.5 }}>
                    空き：0
                  </Box>
                  <Box sx={{ my:0.5 }}>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>


          </TableBody>


        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}