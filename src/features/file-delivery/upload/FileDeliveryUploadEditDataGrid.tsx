import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/material";

interface UploadedFile {
  id: string;
  name: string;
  publishDate: Date | null;
  creationDeadline: Date | null;
  file: File;
}

interface FileDeliveryUploadEditDataGridProps {
  uploadedFile: UploadedFile[];
  onDeleteFile: (id: string) => void;
}

const FileDeliveryUploadEditDataGrid: React.FC<
  FileDeliveryUploadEditDataGridProps
> = ({ uploadedFile, onDeleteFile }) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "アップロードファイル", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => onDeleteFile(params.id)}
          color="inherit"
        />,
      ],
    },
  ];

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
        rows={uploadedFile}
        columns={columns}
        disableRowSelectionOnClick
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};

export default FileDeliveryUploadEditDataGrid;
