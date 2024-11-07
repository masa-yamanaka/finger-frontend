import DefaultPageLayout from "@/components/layouts/DefaultPageLayout";
import FileTable from "@/features/program-list/download/DownloadTable";
import { Typography } from "@mui/material";
import React from "react";

const recentFiles = [
  {
    id: 1,
    userName: "John Doe",
    fileName: "program1.mp4",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    uploadDate: "2024-11-07",
  },
  {
    id: 2,
    userName: "Jane Smith",
    fileName: "program2.mp4",
    fileUrl: "",
    uploadDate: "2024-11-06",
  },
];

const historyFiles = [
  {
    id: 1,
    userName: "Alice Brown",
    fileName: "old_program1.mp4",
    fileUrl: "",
    uploadDate: "2024-10-20",
  },
  {
    id: 2,
    userName: "Bob Green",
    fileName: "old_program2.mp4",
    fileUrl: "",
    uploadDate: "2024-09-15",
  },
  {
    id: 3,
    userName: "Charlie White",
    fileName: "old_program3.mp4",
    uploadDate: "2024-08-10",
  },
  {
    id: 4,
    userName: "David Black",
    fileName: "old_program4.mp4",
    fileUrl: "",
    uploadDate: "2024-07-05",
  },
  {
    id: 5,
    userName: "Eve Red",
    fileName: "old_program5.mp4",
    fileUrl: "",
    uploadDate: "2024-06-30",
  },
];

const ProgramListDownloadPage = () => {
  return (
    <DefaultPageLayout title="番組確認一覧ダウンロード">
      <Typography variant="h6">ファイルが複数見つかりました​</Typography>

      {/* Recent Files Table */}
      <FileTable title="最新ファイル​" data={recentFiles} />

      {/* History Table */}
      <FileTable title="履歴​" data={historyFiles} />
    </DefaultPageLayout>
  );
};

export default ProgramListDownloadPage;
