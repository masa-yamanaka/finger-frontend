import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import dayjs from "dayjs";

interface UploadedFile {
  id: string;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  reason: string;
  file: File;
}

interface UploadDataGridProps {
  uploadedFiles: UploadedFile[];
  onDeleteFile: (id: string) => void;
  onRowEdit: (updatedFile: UploadedFile) => void;
}

const UploadDataGrid: React.FC<UploadDataGridProps> = ({
  uploadedFiles,
  onDeleteFile,
  onRowEdit,
}) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "アップロードファイル", flex: 1 },
    {
      field: "startDate",
      headerName: "対象放送期間(Start)",
      type: "date",
      flex: 1,
      editable: true,
      renderCell: (params) => {
        return params.value
          ? dayjs(params.value).format("YYYY/MM/DD")
          : "";
      },
    },
    {
      field: "endDate",
      headerName: "対象放送期間(End)",
      type: "date",
      flex: 1,
      editable: true,
      renderCell: (params) => {
        return params.value
          ? dayjs(params.value).format("YYYY/MM/DD")
          : "";
      },
    },
    { field: "reason", headerName: "通信欄", flex: 1, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Tooltip title="削除"><DeleteIcon /></Tooltip>}
          label="Delete"
          onClick={() => onDeleteFile(params.id)}
          color="inherit"
        />,
      ],
    },
  ];

  const processRowUpdate = (newRow: UploadedFile) => {
    onRowEdit(newRow);
    return newRow;
  };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={uploadedFiles}
        columns={columns}
        disableRowSelectionOnClick
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
};

export default UploadDataGrid;
