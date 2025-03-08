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
import { Box, Button } from '@mui/material';
import Link from 'next/link';

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

export default function HistoriesTable() {
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
    <div >
      <TableContainer sx={{ height: 560, width: '100%' }}>
        <Table 
          size="small" 
          sx={{ minWidth: 1600 }}
          //stickyHeader
          //sx={{ minWidth: 650 }} size="small" 
          // https://teratail.com/questions/326167
          // https://mui.com/material-ui/react-list/#sticky-subheader
          >
          <TableHead sx={{ backgroundColor: '#e1e5f2' }} >
            <TableRow >
              <TableCell sx={{ width: '20' }} rowSpan={2}>
              </TableCell>
              <TableCell >
                メンテ項目
              </TableCell>
              <TableCell >
                受付日
              </TableCell>
              <TableCell >
                受付者
              </TableCell>
              <TableCell >
                完了日
              </TableCell>
              <TableCell >
                エラー内容
              </TableCell>
              <TableCell >
                修理内容
              </TableCell>
              <TableCell >
                作業日
              </TableCell>
              <TableCell >
                作業者
              </TableCell>
              <TableCell >
                交換部品
              </TableCell>
              <TableCell >
                Pro.Ver.
              </TableCell>
            </TableRow>
            <TableRow sx={{ top: 32}}>
              <TableCell >
               定期点検
              </TableCell>
              <TableCell colSpan={5} >
               作業特記
              </TableCell>
              <TableCell colSpan={3} >
               お客様コメント
              </TableCell>
              <TableCell >
               添付書類
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody 
            
          >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <>
                    <RowInnerContents 
                      rowNumber={index} rowName={row.name}/>
                  </>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 4 }}>
        <Link href={`/maintenance`} passHref>
          <Button variant="outlined" sx={{ mx:2, borderColor: 'gray', color: 'black' }} >戻る</Button>
        </Link>
        <Button variant="outlined" sx={{ borderColor: 'gray', color: 'black' }} >CSV</Button>
      </Box>
    </div>
  );
}