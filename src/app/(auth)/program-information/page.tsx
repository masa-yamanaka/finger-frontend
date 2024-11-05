"use client";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import MessageBox from "@/components/messageBox/MessageBox";
import { Typography, Box, Button, Stack, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { mockProgramInfo } from "@/constants/program-information";
import ProgramInformationAccordion from "@/features/program-information/Accordion";
import ConfirmDialog from "@/components/modals/Confirm/ConfirmDialog";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "放送局",
    width: 180,
  },
  {
    field: "broadcastPeriodStart",
    headerName: "対象放送期間(Start)",
    type: "date",
    width: 150,
    editable: true,
  },
  {
    field: "broadcastPeriodEnd",
    headerName: "対象放送期間(End)",
    type: "date",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "ステータス",
    type: "singleSelect",
    valueOptions: ["作成完了", "確定", "差戻し"],
  },
  {
    field: "fileName",
    headerName: "ファイル名",
    renderCell: (params) => {
      const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(`Downloading file: ${params.value}`);
      };

      return (
        <Link
          component="button"
          variant="body2"
          onClick={handleDownload}
          sx={{
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          {params.value}
        </Link>
      );
    },
  },
  {
    field: "uploadDate",
    headerName: "アップロード日時",
    type: "date",
  },
  {
    field: "message",
    headerName: "通信欄",
    width: 240,
    editable: true,
  },
  {
    field: "reason",
    headerName: "差戻し理由",
    width: 240,
    editable: true,
  },
];

const ProgramInformation = () => {
  const router = useRouter();
  const [rows, setRows] = useState(mockProgramInfo);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>(
    []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const handleUpload = () => {
    router.push(`/program-information/upload`);
  };

  const handleDeleteSelected = () => {
    // Add API here to delete
    console.log("Deleted row ids: ", selectedRows);
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    closeDeleteModal();
  };

  const handleDownloadSelected = () => {
    // Add logic here for handling Downloads
    console.log("Downloading rows with ids: ", selectedRows);

    const selectedRowsFileNames = rows
      .filter((row) => selectedRows.includes(row.id))
      .map((row) => row.fileName);

    console.log("Downloading files: ", selectedRowsFileNames);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <DefaultPageLayout title="番組情報連携">
      <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>
      <Button
        variant="contained"
        color="primary"
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
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleDownloadSelected}
              disabled={selectedRows.length === 0}
            >
              ダウンロード
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={openDeleteModal}
              disabled={selectedRows.length === 0}
            >
              削除
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained">確定</Button>
            <Button variant="contained">差戻し</Button>
          </Stack>
        </Stack>
        <ConfirmDialog
          open={isDeleteModalOpen}
          title="削除の確認"
          description="選択した行を削除してもよろしいですか？この操作は元に戻せません。"
          onClose={closeDeleteModal}
          onConfirm={handleDeleteSelected}
          confirmButtonText="OK"
          cancelButtonText="キャンセル"
        />
      </Box>
    </DefaultPageLayout>
  );
};

export default ProgramInformation;
