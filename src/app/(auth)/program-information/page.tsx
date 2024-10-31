"use client";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import MessageBox from "@/components/messageBox/MessageBox";
import { Typography, Box, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { mockProgramInfo } from "@/constants/program-information";
import ProgramInformationAccordion from "@/features/program-information/Accordion";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "放送局",
    width: 180,
  },
  {
    field: "airStart",
    headerName: "Air Start",
    type: "date",
    // width: 100,
  },
  {
    field: "airEnd",
    headerName: "Air End",
    type: "date",
    // width: 100,
  },
  {
    field: "status",
    headerName: "ステータス",
    // width: 150,
    type: "singleSelect",
    valueOptions: ["作成完了", "確定", "差戻し"],
  },
  {
    field: "fileName",
    headerName: "ファイル名",
    // width: 240
  },
  {
    field: "uploadDate",
    headerName: "アップロード日時",
    type: "date",
    // width: 150,
  },
  {
    field: "message",
    headerName: "通信欄",
    width: 240,
  },
  {
    field: "reason",
    headerName: "差戻し理由",
    width: 240,
  },
];

const ProgramInformation = () => {
  const [rows, setRows] = useState(mockProgramInfo);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>(
    []
  );
  const router = useRouter();

  const handleUpload = () => {
    router.push(`/program-information/upload`);
  };

  const handleDeleteSelected = () => {
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  return (
    <DefaultPageLayout title="番組情報連携">
      {/* <MessageBox title="" message="important notice of information" /> */}
      <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />}
        onClick={handleUpload}
        sx={{ mb: 2 }}
      >
        アップロード
      </Button>

      <ProgramInformationAccordion />

      <Box sx={{ width: "100%", mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
            sx={{ mt: 2 }}
          >
            削除
          </Button>
        </Box>
      </Box>
    </DefaultPageLayout>
  );
};

export default ProgramInformation;
