import * as React from 'react';
import Box from '@mui/material/Box';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import {
//   DataGrid,
//   GridColDef,
//   GridRowsProp,
//   useGridApiContext,
//   GridRenderEditCellParams,
//   GRID_DATE_COL_DEF,
//   GRID_DATETIME_COL_DEF,
//   GridColTypeDef,
//   GridFilterInputValueProps,
//   getGridDateOperators,
// } from '@mui/x-data-grid';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  useGridApiContext,
  GridRenderEditCellParams,
  GRID_DATE_COL_DEF,
  GRID_DATETIME_COL_DEF,
  GridColTypeDef,
  GridFilterInputValueProps,
  getGridDateOperators,
} from '@mui/x-data-grid';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS as locale } from 'date-fns/locale';
import { format } from 'date-fns';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

// https://mui.com/x/react-data-grid/custom-columns/

const dateColumnType: GridColTypeDef<Date, string> = {
  ...GRID_DATE_COL_DEF,
  resizable: false,
  renderEditCell: (params) => {
    return <GridEditDateCell {...params} />;
  },
  filterOperators: getGridDateOperators(false).map((item) => ({
    ...item,
    InputComponent: GridFilterDateInput,
    InputComponentProps: { showTime: false },
  })),
  valueFormatter: (value) => {
    if (value) {
      return format(value, 'MM/dd/yyyy', { locale });
    }
    return '';
  },
};

function GridEditDateCell({
  id,
  field,
  value,
  colDef,
  hasFocus,
}: GridRenderEditCellParams<any, Date | null, string>) {
  const apiRef = useGridApiContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const Component = colDef.type === 'dateTime' ? DateTimePicker : DatePicker;

  const handleChange = (newValue: unknown) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current!.focus();
    }
  }, [hasFocus]);

  return (
    <Component
      value={value}
      autoFocus
      onChange={handleChange}
      slotProps={{
        textField: {
          inputRef,
          variant: 'standard',
          fullWidth: true,
          sx: {
            padding: '0 9px',
            justifyContent: 'center',
          },
          InputProps: {
            disableUnderline: true,
            sx: { fontSize: 'inherit' },
          },
        },
      }}
    />
  );
}

function GridFilterDateInput(
  props: GridFilterInputValueProps & { showTime?: boolean },
) {
  const { item, showTime, applyValue, apiRef } = props;

  const Component = showTime ? DateTimePicker : DatePicker;

  const handleFilterChange = (newValue: unknown) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <Component
      value={item.value ? new Date(item.value) : null}
      autoFocus
      label={apiRef.current.getLocaleText('filterPanelInputLabel')}
      slotProps={{
        textField: {
          variant: 'standard',
        },
        inputAdornment: {
          sx: {
            '& .MuiButtonBase-root': {
              marginRight: -1,
            },
          },
        },
      }}
      onChange={handleFilterChange}
    />
  );
}


const dateTimeColumnType: GridColTypeDef<Date, string> = {
  ...GRID_DATETIME_COL_DEF,
  resizable: false,
  renderEditCell: (params) => {
    return <GridEditDateCell {...params} />;
  },
  filterOperators: getGridDateOperators(true).map((item) => ({
    ...item,
    InputComponent: GridFilterDateInput,
    InputComponentProps: { showTime: true },
  })),
  valueFormatter: (value) => {
    if (value) {
      return format(value, 'MM/dd/yyyy hh:mm a', { locale });
    }
    return '';
  },
};



const slotTimesLookup = {
  0: '09:00 - 10:00',
  1: '10:00 - 11:00',
  2: '11:00 - 12:00',
  3: '12:00 - 13:00',
  4: '13:00 - 14:00',
  5: '14:00 - 15:00',
  6: '15:00 - 16:00',
  7: '16:00 - 17:00',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

type Subject =
  | 'Maths'
  | 'English'
  | 'Lab'
  | 'Chemistry'
  | 'Physics'
  | 'Music'
  | 'Dance';

type Row = { id: number; time: string; slots: Array<Subject | ''> };

const rows: Array<Row> = [
  {
    id: 0,
    time: slotTimesLookup[0],
    slots: ['Maths', 'Chemistry', 'Physics', 'Music', 'Maths'],
  },
  {
    id: 1,
    time: slotTimesLookup[1],
    slots: ['English', 'Chemistry', 'English', 'Music', 'Dance'],
  },
  {
    id: 2,
    time: slotTimesLookup[2],
    slots: ['English', 'Chemistry', 'Maths', 'Chemistry', 'Dance'],
  },
  {
    id: 3,
    time: slotTimesLookup[3],
    slots: ['Lab', 'Physics', 'Maths', 'Chemistry', 'Physics'],
  },
  {
    id: 4,
    time: slotTimesLookup[4],
    slots: ['', '', '', '', ''],
  },
  {
    id: 5,
    time: slotTimesLookup[5],
    slots: ['Lab', 'Maths', 'Chemistry', 'Chemistry', 'English'],
  },
  {
    id: 6,
    time: slotTimesLookup[6],
    slots: ['Music', 'Lab', 'Chemistry', 'English', ''],
  },
  {
    id: 7,
    time: slotTimesLookup[7],
    slots: ['Music', 'Dance', '', 'English', ''],
  },
];

const slotColumnCommonFields: Partial<GridColDef> = {
  sortable: false,
  filterable: false,
  pinnable: false,
  hideable: false,
  cellClassName: (params) => params.value,
};

const columns: GridColDef<Row>[] = [
  {
    field: 'time',
    headerName: 'Time',
    width: 120,
  },
  {
    field: '0',
    headerName: days[0],
    valueGetter: (value, row) => row?.slots[0],
    ...slotColumnCommonFields,
  },
  {
    field: '1',
    headerName: days[1],
    valueGetter: (value, row) => row?.slots[1],
    ...slotColumnCommonFields,
    // editable: true,
  },
  {
    field: '2',
    headerName: days[2],
    valueGetter: (value, row) => row?.slots[2],
    ...slotColumnCommonFields,
  },
  {
    field: '3',
    headerName: days[3],
    valueGetter: (value, row) => row?.slots[3],
    ...slotColumnCommonFields,
  },
  {
    field: '4',
    headerName: days[4],
    valueGetter: (value, row) => row?.slots[4],
    ...slotColumnCommonFields,
  },
  {
    field: 'lastLogin',
    ...dateTimeColumnType,
    headerName: 'Last Login',
    width: 230,
    editable: true,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {

      return [
        // <GridActionsCellItem
        //   key="edit"
        //   icon={<EditIcon />}
        //   label="Edit"
        //   className="textPrimary"
        //   onClick={()=>{console.log('edit')}}
        //   color="inherit"
        // />,
        // <GridActionsCellItem
        //   key="delete"
        //   icon={<DeleteIcon />}
        //   label="Delete"
        //   onClick={()=>{console.log('delete')}}
        //   color="inherit"
        // />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={()=>{console.log('delete')}}
          color="inherit"
        />,
      ];
    },
  },
];

const rootStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  '& .Maths': {
    backgroundColor: 'rgba(157, 255, 118, 0.49)',
  },
  '& .English': {
    backgroundColor: 'rgba(255, 255, 10, 0.49)',
  },
  '& .Lab': {
    backgroundColor: 'rgba(150, 150, 150, 0.49)',
  },
  '& .Chemistry': {
    backgroundColor: 'rgba(255, 150, 150, 0.49)',
  },
  '& .Physics': {
    backgroundColor: 'rgba(10, 150, 255, 0.49)',
  },
  '& .Music': {
    backgroundColor: 'rgba(224, 183, 60, 0.55)',
  },
  '& .Dance': {
    backgroundColor: 'rgba(200, 150, 255, 0.49)',
  },
};

export default function RowSpanningCalendar() {
  return (
    <Box sx={rootStyles}>
      <DataGrid
        columns={columns}
        rows={rows}
        unstable_rowSpanning
        disableRowSelectionOnClick
        hideFooter
        showCellVerticalBorder
        showColumnVerticalBorder
        sx={{
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'transparent',
          },
        }}
      />
    </Box>
  );
}