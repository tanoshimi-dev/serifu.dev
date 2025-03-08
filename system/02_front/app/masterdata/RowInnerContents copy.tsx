import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Link, Stack } from '@mui/material';


export default function RowInnerContents(Props: Props) {
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
    // <div style={{ height: 600, width: '1200px' }}>
    <>
      <TableRow>
        <TableCell align="center" rowSpan={2}>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            type="submit"
          >
            詳細
          </Button>
        </TableCell>
        <TableCell align="center">
          保守点検
        </TableCell>
        <TableCell align="center">
          2019/09/18
        </TableCell>
        <TableCell align="center">
          新鋭　大阪　山中
        </TableCell>
        <TableCell align="center">
          2019/09/18
        </TableCell>
        <TableCell align="center">
        </TableCell>
        <TableCell align="center">
          保守１　触媒　排水栓
        </TableCell>
        <TableCell align="center">
          2019/09/18
        </TableCell>
        <TableCell align="center">
          IAT　中澤
        </TableCell>
        <TableCell align="center">
        </TableCell>
        <TableCell align="center">
          0302
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">
          済
        </TableCell>
        <TableCell align="left" colSpan={5}>
          <Stack>
          <Box>運転プログラム　v1→v2変更</Box>
          <Box>エアフィルタ　交換</Box>
          <Box>バルブ　変更</Box>
          </Stack>
        </TableCell>
        <TableCell align="center" colSpan={3}>
        </TableCell>
        <TableCell align="left">
          <Link href="">OED-SP・50005 相坂クリニック　保守報告書１回目(2019年9月18日).pdf</Link>
        </TableCell>
      </TableRow>
    </>
  );
}

// 

interface Props {
  rowNumber?: number;
  rowName?: string;
}
