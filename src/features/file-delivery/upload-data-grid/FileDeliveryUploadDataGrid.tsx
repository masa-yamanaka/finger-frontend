import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/material";
import { mockTvStations } from "@/constants/file-delivery";

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
      field: "description",
      headerName: "ファイル説明欄​",
      flex: 1,
      editable: true,
    },

    {
      field: "tvStation",
      headerName: "放送局​",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: mockTvStations,
    },
    {
      field: "deliveryType",
      headerName: "納品種別",
      editable: true,
      type: "singleSelect",
      valueOptions: ["定時", "臨時"],
    },

    {
      field: "broadcastDate",
      headerName: "放送年月",
      width: 120,
      type: "date",
      editable: true,
    },
    {
      field: "publishDate",
      headerName: "公開日時",
      width: 200,
      type: "dateTime",
      editable: true,
    },
    { field: "message", headerName: "通信欄", flex: 1, editable: true },
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

export default FileDeliveryUploadDataGrid;
