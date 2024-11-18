import React, { useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Button, Stack } from "@mui/material";
import DatePickerDialog from "@/components/modals/DatePicker/DatePickerDialog";
import dayjs from "dayjs";

interface UploadedFile {
  id: string;
  name: string;
  publishDate: Date | null;
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
  const [openPublishDateDialog, setOpenPublishDateDialog] = useState(false);
  const [openCreationDeadlineDialog, setOpenCreationDeadlineDialog] =
    useState(false);

  const handlePublishDateAll = () => {
    setOpenPublishDateDialog(true);
  };

  const handleCreationDeadlineAll = () => {
    setOpenCreationDeadlineDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenPublishDateDialog(false);
    setOpenCreationDeadlineDialog(false);
  };

  const handlePublishDateConfirm = (date: Date | null) => {
    if (date) {
      uploadedFiles.forEach((file) => {
        const updatedFile = {
          ...file,
          publishDate: date,
        };
        onRowEdit(updatedFile);
      });
    }
  };

  const handleCreationDeadlineConfirm = (date: Date | null) => {
    if (date) {
      uploadedFiles.forEach((file) => {
        const updatedFile = {
          ...file,
          creationDeadline: date,
        };
        onRowEdit(updatedFile);
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "アップロードファイル", flex: 1 },
    {
      field: "publishDate",
      renderHeader: () => (
        <Stack direction={"row"} spacing={4} alignItems={"center"}>
          <Box>公開日時</Box>
          <Button
            size="small"
            variant="contained"
            onClick={handlePublishDateAll}
            disabled={uploadedFiles.length === 0}
          >
            一括反映
          </Button>
        </Stack>
      ),
      type: "dateTime",
      flex: 1,
      editable: true,
      sortable: false,
      renderCell: (params) => {
        return params.value
          ? dayjs(params.value).format("YYYY-MM-DD HH:mm")
          : "";
      },
    },
    {
      field: "creationDeadline",
      renderHeader: () => (
        <Stack direction={"row"} spacing={4} alignItems={"center"}>
          <Box>作成完了期限</Box>
          <Button
            size="small"
            variant="contained"
            onClick={handleCreationDeadlineAll}
            disabled={uploadedFiles.length === 0}
          >
            一括反映
          </Button>
        </Stack>
      ),
      type: "date",
      flex: 1,
      editable: true,
      sortable: false,
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
      sortable: false,
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
        // editMode="row"
        columns={columns}
        disableRowSelectionOnClick
        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        processRowUpdate={processRowUpdate}
      />

      {/* DatePickerDialog for publishDate */}
      <DatePickerDialog
        open={openPublishDateDialog}
        onClose={handleCloseDialog}
        onConfirm={handlePublishDateConfirm}
        type="datetime"
        title="公開日時を一括設定"
      />

      {/* DatePickerDialog for creationDeadline */}
      <DatePickerDialog
        open={openCreationDeadlineDialog}
        onClose={handleCloseDialog}
        onConfirm={handleCreationDeadlineConfirm}
        type="date"
        title="作成完了期限を一括設定"
      />
    </Box>
  );
};

export default ProgramListUploadDataGrid;
