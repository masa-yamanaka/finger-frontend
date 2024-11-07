"use client";
import React from "react";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ProgramListSearchAccordion from "@/features/program-list/search-accordion/SearchAccordion";

const ProgramListPage = () => {
  const router = useRouter();
  const handleUpload = () => {
    router.push(`/program-list/upload`);
  };

  return (
    <DefaultPageLayout title="番組確認一覧連携">
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ mb: 2 }}
      >
        アップロード
      </Button>
      <ProgramListSearchAccordion />
    </DefaultPageLayout>
  );
};

export default ProgramListPage;
