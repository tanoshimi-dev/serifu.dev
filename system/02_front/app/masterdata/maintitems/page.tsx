'use client'

import * as React from 'react';
import { useEffect } from "react";
import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from '@mui/material/styles';

// 

import { useRouter } from "next/navigation";

import Image from "next/image";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';

import getDashboardTheme from '../../../apptheme/getDashboardTheme';
import TemplateFrame from '../../TemplateFrame';

import CustomerTable from "./CustomerTable";
import HistoriesTable from "./HistoriesTable";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/rtk/store';
import { 
  getMShitens, fetchMShitensStatus, mShitens, upsertMShiten, 
  serverErrorOccurred, serverErrorData, reLoginRequired,
} from '@/lib/rtk/slices/masterDataSlice';
import { MShiten } from '@/types/m_shiten';


const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [
  // {
  //   id: randomId(),
  //   m_shitencode: '',
  //   m_shitenname: '',
  // },
];

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    console.log('handleClick', id)
    setRows((oldRows) => [
      ...oldRows,
      { id, m_shitencode: '', m_shitenname: '', isNew: true },
    ]);

    ///console.log('rowModesModel', rowModesModel)
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'm_shitencode' },
    // }));
 
    setRowModesModel((oldModel) => {
      console.log('setRowModesModel oldModel', oldModel);
      console.log('setRowModesModel id', id);

      return { ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'm_shitencode' },
      };
    });
    
 

  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Customers() {
  const router = useRouter();

  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });  

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const dispatch: AppDispatch = useDispatch();
  const apiResFetchStatus  = useSelector(fetchMShitensStatus);
  const apiResMShitens     = useSelector(mShitens);

  const [rows, setRows] = React.useState(initialRows);
  //const [rows, setRows] = React.useState(apiResMShitens as GridRowsProp);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  console.log('apiResFetchStatus', apiResFetchStatus, apiResMShitens);
  console.log('rows', rows);


  // data fetch
  useEffect(() => {
    
    console.log('data fetch ' )
    dispatch(getMShitens());
    
  }, [])

  useEffect(() => {
    
    console.log('setRows')
    if (apiResFetchStatus === 'success') {
      // setRows(apiResMShitens as TableRow[]);
      setRows(apiResMShitens as GridRowsProp);
    }

  }, [apiResFetchStatus, apiResMShitens])



  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    console.log('handleSaveClick', id)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    console.log('processRowUpdate', newRow)
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  
    dispatch(upsertMShiten(newRow as MShiten));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'm_shitencode', headerName: 'code', width: 180, editable: true },
    { field: 'm_shitenname', headerName: 'name', width: 180, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="save"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];



  return (
    <TemplateFrame>
      <CssBaseline enableColorScheme />    
      <Box sx={{ m: 4 }}>
        <Box sx={{ mx: 2 }}>
          <Typography variant="h5">
            【マスタ編集　m_branch】
          </Typography>
        </Box>
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            density='compact'
            loading={apiResFetchStatus !== 'success'}
          />
        </Box>

      </Box>
    </TemplateFrame>          

  );
}




interface TableRow extends MShiten {
  isNew?: boolean | null;
}
