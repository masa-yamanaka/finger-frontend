"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import ProgramListDownloadTable from "@/features/program-list/download/DownloadTable";
import { mockHistoryFiles, mockRecentFiles } from "@/constants/program-list";

const ProgramListDownloadPage = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.push("/program-list/");
  };

  return (
    <DefaultPageLayout title="番組確認一覧ダウンロード">
      <Typography variant="body1">ファイルが複数見つかりました​</Typography>

      {/* Recent Files Table */}
      <ProgramListDownloadTable title="最新ファイル​" data={mockRecentFiles} />

      {/* History Table */}
      <ProgramListDownloadTable title="履歴​" data={mockHistoryFiles} pagination />

      <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleReturn}>
        戻る
      </Button>
    </DefaultPageLayout>
  );
};

export default ProgramListDownloadPage;
