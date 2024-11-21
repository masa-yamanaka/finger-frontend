import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

interface UploadedFile {
  id: string;
  name: string;
  description: string;
  tvStation: string;
  deliveryType: string;
  broadcastDate: Date | null;
  publishDate: Date | null;
  message: string;
  file: File;
}

interface FileDeliveryUploadDataGridProps {
  uploadedFiles: UploadedFile[];
  onDeleteFile: (id: string) => void;
  onRowEdit: (updatedFile: UploadedFile) => void;
}

const FileDeliveryUploadDataGrid: React.FC<FileDeliveryUploadDataGridProps> = ({
  uploadedFiles,
  onDeleteFile,
  onRowEdit,
}) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "アップロードファイル", flex: 1 },
    {
      field: "message",
      headerName: "ファイル説明​",
      flex: 2,
      editable: true,
    },
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

export default FileDeliveryUploadDataGrid;
