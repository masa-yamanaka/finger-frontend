import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/material";

interface UploadedFile {
  id: string;
  name: string;
  publishedDate: Date | null;
  creationDeadline: Date | null;
  file: File;
}

interface ProgramListUploadDataGridProps {
  uploadedFiles: UploadedFile[];
  onDeleteFile: (id: string) => void;
  onRowEdit: (updatedFile: UploadedFile) => void;
}

const ProgramListUploadDataGrid: React.FC<ProgramListUploadDataGridProps> = ({
  uploadedFiles,
  onDeleteFile,
  onRowEdit,
}) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "アップロードファイル", flex: 1 },
    {
      field: "publishedDate",
      headerName: "公開日時",
      type: "date",
      flex: 1,
      editable: true,
    },
    {
      field: "creationDeadline",
      headerName: "作成完了期限",
      type: "date",
      flex: 1,
      editable: true,
    },
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

export default ProgramListUploadDataGrid;
