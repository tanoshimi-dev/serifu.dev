'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

import Demo from "./Demo"; 
import DenseTable from "./DenseTable";
import DetailTable from "./DetailTable";


export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ m: 6 }}>
      <DetailTable />
    </Box>

  );
}
