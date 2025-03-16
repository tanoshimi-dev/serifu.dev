import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Stack } from '@mui/material';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('1-India', 'IN', 1324171354, 3287263),
  createData('2-China', 'CN', 1403500365, 9596961),
  createData('3-Italy', 'IT', 60483973, 301340),
  createData('4-United States', 'US', 327167434, 9833520),
  createData('5-Canada', 'CA', 37602103, 9984670),
  createData('6-Australia', 'AU', 25475400, 7692024),
  createData('7-Germany', 'DE', 83019200, 357578),
  createData('8-Ireland', 'IE', 4857000, 70273),
  createData('9-Mexico', 'MX', 126577691, 1972550),
  createData('10-Japan', 'JP', 126317000, 377973),
  createData('11-France', 'FR', 67022000, 640679),
  createData('12-United Kingdom', 'GB', 67545757, 242495),
  createData('13-Russia', 'RU', 146793744, 17098246),
  createData('14-Nigeria', 'NG', 200962417, 923768),
  createData('15-Brazil', 'BR', 210147125, 8515767),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" 
          sx={{ minWidth: 650 }} size="small">
          <TableBody>

            <TableRow>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                メンテ項目
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                受付日
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                受付者
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                完了日
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                エラー内容
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                修理内容
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                保守点検
              </TableCell>
              <TableCell>
                2019/09/18
              </TableCell>
              <TableCell>
                ○○　山中
              </TableCell>
              <TableCell>
                2019/09/18
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                保守１　排水
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                作業日
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                作業者
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }} colSpan={2} >
                交換部品
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }} colSpan={2} >
                Ver.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
               2019/09/18
              </TableCell>
              <TableCell>
                AB　中沢
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                0302
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }}>
                定期点検
              </TableCell>
              <TableCell align="left" sx={{ backgroundColor: 'lightgray' }} colSpan={5} >
                作業特記
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
               済
              </TableCell>
              <TableCell>
                <Stack>
                  <Box>運転プログラム　v1→v2変更</Box>
                  <Box>エアフィルタ　交換</Box>
                  <Box>バルブ　変更</Box>
                </Stack>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}