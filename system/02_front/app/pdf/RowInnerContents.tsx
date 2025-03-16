import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Stack } from '@mui/material';


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
    <>
      <TableRow>
        <TableCell align="center" colSpan={2} rowSpan={2}
          sx={{ backgroundColor: 'gray' }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit"
          >
            詳細
          </Button>
        </TableCell>
        <TableCell align="center" colSpan={2} rowSpan={2}>
          {Props.rowName} 
        </TableCell>
        <TableCell align="center">
          保守点検
        </TableCell>
        <TableCell align="center">
          2019/09/18
        </TableCell>
        <TableCell align="center">
          ○○　山中
        </TableCell>
        <TableCell align="center">
          2019/09/18
        </TableCell>
        <TableCell align="center">

        </TableCell>
        <TableCell align="center">
          保守１　排水
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
      </TableRow>
    </>
  );
}

// 

interface Props {
  rowNumber?: number;
  rowName?: string;
}
