import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link'

export default function Topics(props: any) {
  return (
    <Box  sx={{ mt:2 }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 800, border: 1, borderRadius: 1}}>
          <Table stickyHeader aria-label="sticky table" 
            sx={{ minWidth: 800 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ backgroundColor: 'blue', color: 'white' }}>
                メンテ項目
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box>★OED-100S Plusのマニュアルを作成しました。</Box>
                  <Box sx={{ py:1 }} />
                  <Box><Link href="/about">・Ver1.2 OED-1000S Plus納入マニュアル.pdf</Link></Box>
                  <Box><Link href="/about">・Ver1.2 OED-1000S Plusサービスマニュアル.pdf</Link></Box>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
