"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { mockFileDeliveryDownload } from "@/constants/file-delivery";
import FileDeliveryDownloadTable from "@/features/file-delivery/download/FileDeliveryDownloadTable";
import { Button, Stack, Typography } from "@mui/material";

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

  return (
    <DefaultPageLayout title="納品ファイル連携ダウンロード画面​">
      <Typography variant="body1">ファイルが複数見つかりました​</Typography>

      <FileDeliveryDownloadTable
        title="納品ファイル​"
        data={mockFileDeliveryDownload}
        onSelectFiles={setSelectedFiles}
      />

      <Stack direction={"row"} mt={2} justifyContent={"space-between"}>
        <Button variant="contained" color="error" onClick={handleReturn}>
          閉じる
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadSelectedFiles}
          disabled={selectedFiles.length === 0}
        >
          ダウンロード
        </Button>
      </Stack>
    </DefaultPageLayout>
  );
};

export default FileDeliveryDownloadPage;
