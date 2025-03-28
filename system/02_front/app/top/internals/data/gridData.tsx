import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Button } from '@mui/material';

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status: 'Online' | 'Offline') {
  const colors: { [index: string]: 'success' | 'default' } = {
    Online: 'success',
    Offline: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [

  {
    field: 'button_edit',
    headerName: '操作',
    sortable: false,
    disableColumnMenu: true,
    minWidth: 24,
    
    headerAlign: 'center',
    //disableClickEventBubbling: true,
    renderCell: (params) => {
      
      return (
        <Button 
          variant="outlined" 
          size="small" 
          color="primary" 
          sx={{ width: '4px', height: '24px', mb: 0, ml: 0.5 }} 
        >
          編集
        </Button>
      )
    }
  },  
  { field: 'col_01', 
    sortable: false, 
    disableColumnMenu: true,
    headerName: '機番',  headerAlign: 'center', flex: 1, minWidth: 80 },
  {
    field: 'col_02',
    sortable: false,
    disableColumnMenu: true,
    headerName: '顧客名',
    headerAlign: 'center',
    flex: 0.5,
    minWidth: 120,
  },
  {
    field: 'col_03',
    sortable: false,    
    disableColumnMenu: true,
    headerName: '顧客名（カナ）',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'col_04',
    sortable: false,
    disableColumnMenu: true,
    headerName: '担当者',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'col_05',
    sortable: false,
    disableColumnMenu: true,
    headerName: '電話番号',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'col_06',
    sortable: false,
    disableColumnMenu: true,
    headerName: '〒',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'col_07',
    sortable: false,
    disableColumnMenu: true,
    headerName: '住所（県）',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 110,
    // renderCell: renderSparklineCell,
  },


  {
    field: 'col_08',
    sortable: false,
    disableColumnMenu: true,
    headerName: '市区町村',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 160,
  },
  {
    field: 'col_09',
    sortable: false,
    disableColumnMenu: true,
    headerName: '機種',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 60,
  },
  {
    field: 'col_10',
    sortable: false,
    disableColumnMenu: true,
    headerName: '担当支店',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'col_11',
    sortable: false,
    disableColumnMenu: true,
    headerName: '納入担当',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'col_12',
    sortable: false,
    disableColumnMenu: true,
    headerName: '納入日',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'col_13',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'ディーラー',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'col_14',
    sortable: false,
    disableColumnMenu: true,
    headerName: '担当',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'col_15',
    sortable: false,
    disableColumnMenu: true,
    headerName: '保守契約',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'col_16',
    sortable: false,
    disableColumnMenu: true,
    headerName: '次回点検予定日',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'col_17',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'メンテ項目',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'col_18',
    sortable: false,
    disableColumnMenu: true,
    headerName: '修理・クレーム受付日',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'col_19',
    sortable: false,
    disableColumnMenu: true,
    headerName: '受付者',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'col_20',
    sortable: false,
    disableColumnMenu: true,
    headerName: '修理・クレーム完了日',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'col_21',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'エラー内容',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'col_22',
    sortable: false,
    disableColumnMenu: true,
    headerName: '修理内容',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'col_23',
    sortable: false,
    disableColumnMenu: true,
    headerName: '作業日',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'col_24',
    sortable: false,
    disableColumnMenu: true,
    headerName: '作業者',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },  {
    field: 'col_25',
    sortable: false,
    disableColumnMenu: true,
    headerName: '交換部品',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },  {
    field: 'col_26',
    sortable: false,
    disableColumnMenu: true,
    headerName: '酸素濃度',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },  {
    field: 'col_27',
    sortable: false,
    disableColumnMenu: true,
    headerName: '酸素流量',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },  {
    field: 'col_28',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'PSA圧力(上）',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },  {
    field: 'col_29',
    sortable: false,
    disableColumnMenu: true,
    headerName: '(下）',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },  {
    field: 'col_30',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'オゾン水濃度',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },  {
    field: 'col_31',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'Pro.Ver.',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },  {
    field: 'col_32',
    sortable: false,
    disableColumnMenu: true,
    headerName: '定期点検',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },  {
    field: 'col_33',
    sortable: false,
    disableColumnMenu: true,
    headerName: '作業特記',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 200,
  },  {
    field: 'col_34',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'お客様コメント',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 200,
  },  {
    field: 'col_35',
    sortable: false,
    disableColumnMenu: true,
    headerName: 'PDF　NO.',
    headerAlign: 'center',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },

];

export const rows: GridRowsProp = [
  {
    id: 1,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 2,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 3,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 4,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 5,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },  
  {
    id: 6,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 7,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 8,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 9,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 10,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },  

  {
    id: 11,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 12,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 13,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 14,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 15,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },  
  {
    id: 16,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 17,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 18,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 19,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 20,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },

  {
    id: 21,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 22,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 23,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 24,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 25,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },  
  {
    id: 26,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 27,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 28,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 29,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },
  {
    id: 30,
    col_01: '999999',
    col_02: 'ＡＡＡＡＡＡＡ',
    col_03: 'ＡＡＡＡＡＡＡ',
    col_04: 'ＡＡＡＡ',
    col_05: '999-9999-9999',
    col_06: '999-9999',
    col_07: 'ＡＡＡ',
    col_08: 'ＡＡＡＡＡ',
    col_09: '9999',
    col_10: 'ＡＡＡＡ',
    col_11: 'ＡＡＡＡ',
    col_12: '9999/99/99',
    col_13: 'ＡＡＡＡＡＡＡＡ',
    col_14: 'ＡＡＡ',
    col_15: 'ＡＡＡ',
    col_16: 'yyyy/mm/dd',
    col_17: 'ＡＡＡＡＡＡ',
    col_18: '9999/99/99',
    col_19: 'ＡＡＡ',
    col_20: '9999/99/99',
    col_21: 'ＡＡＡＡ',
    col_22: 'ＡＡＡＡ',
    col_23: '9999/99/99',
    col_24: 'ＡＡＡ',
    col_25: 'ＡＡＡＡ',
    col_26: '9999',
    col_27: '9999',
    col_28: '9999',
    col_29: '9999',
    col_30: '9999',
    col_31: '9999',
    col_32: 'ＡＡＡＡＡＡ',
    col_33: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_34: 'ＡＡＡＡＡＡＡＡＡＡＡＡＡＡＡ',
    col_35: 'ＡＡＡＡ',
  },  

];
