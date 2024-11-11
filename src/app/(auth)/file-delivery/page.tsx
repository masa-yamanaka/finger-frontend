"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";

import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import FileDeliverySearchAccordion from "@/features/file-delivery/search-accordion/FileDeliverySearchAccordion";

const FileDeliveryPage = () => {
  const router = useRouter();

  const handleUpload = () => router.push(`/file-delivery/upload`);

  return (
    <DefaultPageLayout title="納品ファイル連携画面">
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
    </DefaultPageLayout>
  );
};

export default FileDeliveryPage;
