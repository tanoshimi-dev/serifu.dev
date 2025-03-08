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

export default function CustomerTable() {
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
      <TableContainer sx={{ height: 100, overflowX: 'scroll' }}>
        <Table 
          size="small" 
          sx={{ minWidth: 3600}}
          // sx={{ minWidth: 1600}}
        >
          <TableHead sx={{ backgroundColor: '#e1e5f2' }}>
            <TableRow >
              <TableCell sx={{ fontSize:12, width: 20 }} >
                機番
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 60 }} >
                機種
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 100 }} >
                顧客名
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 160 }} >
                顧客名(カナ)
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 80 }} >
                担当者
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 120 }} >
                電話番号
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 90 }} >
                郵便番号
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 240 }} >
                住所
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 100 }} >
                担当支店
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 100 }} >
                納入担当
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 100 }} >
                納入日
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 100 }} >
                ディーラー
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 120 }} >
                担当者
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 140 }} >
                サービス業者
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 140 }} >
                サービス業者担当者
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 130 }} >
                点検契約
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 100 }} >
                点検予定日
              </TableCell>
              <TableCell sx={{ fontSize:12, width: 100 }} >
                契約日
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell  sx={{ fontSize: 12 }}>
                500005
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                OED-1000S Plus
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                相坂クリニック
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                アイサカクリニック
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                06-6452-2022
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                553-0002
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
              大阪府大阪市福島区鷲州2-12-20
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                大阪支店
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                和田
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                2018/09/20
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                ニコス株式会社
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                本庄⇒島田様
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                保守点検(OED未契約)
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
                2025/09/25
              </TableCell>
              <TableCell sx={{ fontSize: 12 }}>
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>

      </TableContainer>

    </div>
  );
}