"use client";
import React from "react";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import ProgramInformationAccordion from "@/features/program-information/Accordion";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

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
      <div style={{ color: "hotpink" }}>
        is this the same accordion as the program information page?
      </div>
      <ProgramInformationAccordion />
    </DefaultPageLayout>
  );
};

export default ProgramListPage;
