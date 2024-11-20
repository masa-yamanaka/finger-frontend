"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import FileDeliverySearchAccordion from "@/features/file-delivery/search-accordion/FileDeliverySearchAccordion";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  mockFileDelivery,
  mockStatus,
  mockTvStations,
} from "@/constants/file-delivery";
import ConfirmDialog from "@/components/modals/Confirm/ConfirmDialog";
import dayjs from "dayjs";

const columns: GridColDef[] = [
  {
    field: "tvStation",
    headerName: "放送局",
    type: "singleSelect",
    valueOptions: mockTvStations,
    editable: true,
  },
  {
    field: "broadcastDate",
    headerName: "放送年月",
    type: "date",
    editable: true,
    renderCell: (params) => {
      return params.value
        ? dayjs(params.value).format("YYYY/MM")
        : "";
    },
  },

  {
    field: "status",
    headerName: "ステータス",
    type: "singleSelect",
    valueOptions: mockStatus,
  },
  {
    field: "downloadUrl",
    headerName: "ダウンロード",
    renderCell: (params) => (
      <Link
        // href={params.value}
        href="/file-delivery/download"
        variant="body2"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", cursor: "pointer" },
        }}
      >
        ダウンロード
      </Link>
    ),
  },
  {
    field: "uploadUrl",
    headerName: "アップロード",
    renderCell: (params) => (
      <Link
        // href={params.value}
        href="/file-delivery/upload/edit"
        variant="body2"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", cursor: "pointer" },
        }}
      >
        アップロード
      </Link>
    ),
  },
  {
    field: "deliveryType",
    headerName: "納品種別​",
    type: "singleSelect",
    valueOptions: ["定時", "臨時"],
    editable: true,
  },
  {
    field: "publishDate",
    headerName: "公開日",
    type: "dateTime",
    editable: true,
  },
  { field: "message", headerName: "通信欄", editable: true, flex: 1 },
];

const FileDeliveryPage = () => {
  const router = useRouter();
  const [rows, setRows] = useState(mockFileDelivery);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [dialogProps, setDialogProps] = useState({
    open: false,
    title: "",
    description: "",
    color: "error",
    onConfirm: () => {},
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));
    // Add API here to delete
    console.log("Deleted rows:  ", selectedRowData);

    setRows((oldRows) =>
      oldRows.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
    closeDeleteModal();
  };

  const handleUpload = () => router.push(`/file-delivery/upload`);

  const handleCsvDownload = () => {
    const selectedRowData = rows.filter((row) => selectedRows.includes(row.id));

    // Add logic here for CSV download
    console.log("Selected row data:", selectedRowData);
  };

  return (
    <DefaultPageLayout title="納品ファイル連携">
      <Typography sx={{ color: "red", mb: 4 }}>メッセージエリア</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mb: 2 }}
      >
        アップロード
      </Button>

      {/* Search Accordion  */}
      <FileDeliverySearchAccordion />

      {/* Data Grid  */}
      <Box sx={{ width: "100%", mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
          sx={{
            height: 500,
            width: "100%",
            "& .actions": { color: "text.secondary" },
            "& .textPrimary": { color: "text.primary" },
          }}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCsvDownload}
            disabled={!selectedRows.length}
          >
            CSV出力
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={openDeleteModal}
            disabled={!selectedRows.length}
          >
            削除
          </Button>
        </Stack>
      </Stack>

      <ConfirmDialog
        open={isDeleteModalOpen}
        title="削除の確認"
        description="選択した行を削除してもよろしいですか？この操作は元に戻せません。"
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        confirmButtonText="OK"
        cancelButtonText="キャンセル"
      />
    </DefaultPageLayout>
  );
};

export default FileDeliveryPage;
