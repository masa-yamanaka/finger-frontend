export const mockProgramList = [
  {
    id: 1,
    tvStation: "ABC News",
    broadcastPeriodStart: new Date(2021, 6, 15),
    broadcastPeriodEnd: new Date(2021, 6, 20),
    status: "作成完了",
    publishDateTime: new Date(),
    creationDeadline: new Date(),
    // downloadUrl: "",
    // uploadUrl: "",
    lastUploadDate: new Date(),
    reason: "aaaaaaaaaa",
  },
  {
    id: 2,
    tvStation: "ABC News",
    broadcastPeriodStart: new Date(2022, 3, 20),
    broadcastPeriodEnd: new Date(2022, 4, 20),
    status: "確定",
    publishDateTime: new Date(),
    creationDeadline: new Date(),
    // downloadUrl: "",
    // uploadUrl: "",
    lastUploadDate: new Date(),
    reason: "aaaaaaaaaa",
  },
  {
    id: 3,
    tvStation: "ABC News",
    broadcastPeriodStart: new Date(2022, 3, 20),
    broadcastPeriodEnd: new Date(2022, 4, 20),
    status: "確定",
    publishDateTime: new Date(),
    creationDeadline: new Date(),
    // downloadUrl: "",
    // uploadUrl: "",
    lastUploadDate: new Date(),
  },
];

export const mockRecentFiles = [
  {
    id: 1,
    userName: "John Doe",
    fileName: "program1.mp4",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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

export const mockHistoryFiles = [
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
  {
    id: 6,
    userName: "Frank Blue",
    fileName: "old_program6.mp4",
    fileUrl: "",
    uploadDate: "2024-05-25",
  },
  {
    id: 7,
    userName: "Grace Purple",
    fileName: "old_program7.mp4",
    fileUrl: "",
    uploadDate: "2024-04-20",
  },
  {
    id: 8,
    userName: "Holly Pink",
    fileName: "old_program8.mp4",
    fileUrl: "",
    uploadDate: "2024-03-15",
  },
];

export const mockProgramListStatus = ["未公開", "作成完了", "確定", "差戻し"];

export const mockProgramListTvStations = ["ABC News", "BBC", "ESPN", "NBC", "FOX", "MTV", "Discovery Channel"];

export const mockUploadData = {
  tvStation: "AB",
  broadcastPeriod: "2024/09/01～2024/09/08",
  status: "未公開",
  uploadedFileName: "AB_20240701_202040707番組確認一覧.xls",
  uploadedFileUrl: "http://example.com",
};
