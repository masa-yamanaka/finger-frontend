"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { mockFileDeliveryDownload } from "@/constants/file-delivery";
import FileDeliveryDownloadTable from "@/features/file-delivery/download/FileDeliveryDownloadTable";
import { Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ConfirmDialog from "@/components/modals/Confirm/ConfirmDialog";

const FileDeliveryDownloadPage = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const handleReturn = () => {
    router.push("/file-delivery/");
  };

  const handleDownloadSelectedFiles = () => {
    // Add logic here for handling Downloads

    console.log("Downloading selected files:", selectedFiles);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [rows, setRows] = useState(mockFileDeliveryDownload);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    // Add API here to delete
    console.log("Deleted rows:  ", selectedFiles);

    setRows((rows) =>
      rows.filter(row => !selectedFiles
        .map(selectedFile => selectedFile.id)
        .includes(row.id))
    );

    setSelectedFiles([]);
    closeDeleteModal();
  };

  return (
    <DefaultPageLayout title="納品ファイルダウンロード​">
      <Typography variant="body1">ファイルが複数見つかりました​</Typography>

      <FileDeliveryDownloadTable
        title="納品ファイル​"
        data={rows}
        onSelectFiles={setSelectedFiles}
      />

      <Stack direction={"row"} mt={2} justifyContent={"space-between"}>
        <Button variant="contained" color="error" onClick={handleReturn}>
          戻る
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={openDeleteModal}
              disabled={!selectedFiles.length}
          >
            削除
          </Button>
          <Button
            variant="contained"
            onClick={handleDownloadSelectedFiles}
            disabled={selectedFiles.length === 0}
          >
            ダウンロード
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

export default FileDeliveryDownloadPage;
