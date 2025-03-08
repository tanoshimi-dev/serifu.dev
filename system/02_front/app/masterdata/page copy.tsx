'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

import CustomerTable from "./CustomerTable";
import HistoriesTable from "./HistoriesTable";

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ m: 4 }}>
      <Box sx={{ mx: 2 }}>
        <Typography variant="h5">
          {/* 【顧客別登録情報一覧】 */}
          【サンプル　一覧】
        </Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <CustomerTable />
      </Box>
      <Box sx={{ mt:4, mx: 2 }}>
        <HistoriesTable />
      </Box>
    </Box>

  );
}
