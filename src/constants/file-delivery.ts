export const mockTvStations = ["ABC News", "BBC", "ESPN", "NBC", "FOX", "MTV", "Discovery Channel"];

export const mockFileDeliveryStatus = ["Status1", "Status2", "Status3", "Status4"];

export const mockDeliveryType = ["Delivery Type1", "Delivery Type2", "Delivery Type3"];

export const mockFileDelivery = [
  {
    id: 1,
    tvStation: "ABC News",
    broadcastDate: new Date(2024, 8),
    status: "Status1",
    // downloadUrl: "",
    // uploadUrl: "",
    deliveryType: "Delivery Type1",
    publishDate: new Date(),
    message: "aaaaaaaaaaaa",
  },
  {
    id: 2,
    tvStation: "ABC News",
    broadcastDate: new Date(2024, 8),
    status: "Status2",
    // downloadUrl: "",
    // uploadUrl: "",
    deliveryType: "Delivery Type2",
    publishDate: new Date(),
    message: "aaaaaaaaaaaa",
  },
  {
    id: 3,
    tvStation: "ABC News",
    broadcastDate: new Date(2024, 8),
    status: "Status3",
    // downloadUrl: "",
    // uploadUrl: "",
    deliveryType: "Delivery Type3",
    publishDate: new Date(),
    message: "aaaaaaaaaaaa",
  },
];

export const mockFileDeliveryDownload = [
  {
    id: 1,
    userName: "User1",
    fileName: "Delivery File1",
    fileUrl: "",
    uploadDate: "2024/08/15 HH:MM",
    description: "Description1",
  },
  {
    id: 2,
    userName: "User2",
    fileName:
      "Delivery File2Delivery File2Delivery File2Delivery File2Delivery File2Delivery File2Delivery File2Delivery File2Delivery File2Delivery File2Delivery File2",
    fileUrl: "",
    uploadDate: "2024/08/15 HH:MM",
    description: "Description2",
  },
  {
    id: 3,
    userName: "User3",
    fileName: "Delivery File3",
    fileUrl: "",
    uploadDate: "2024/08/15 HH:MM",
    description: "Description3",
  },
  {
    id: 4,
    userName: "User4",
    fileName: "Delivery File4",
    fileUrl: "",
    uploadDate: "2024/08/15 HH:MM",
    description: "Description4",
  },
  {
    id: 5,
    userName: "User5",
    fileName: "Delivery File5",
    fileUrl: "",
    uploadDate: "2024/08/15 HH:MM",
    description: "Description5",
  },
  {
    id: 6,
    userName: "User6",
    fileName: "Delivery File6",
    fileUrl: "",
    uploadDate: "2024/08/15 HH:MM",
    description: "Description6",
  },
];

export const mockFileDeliveryUploadData = {
  tvStation: "AB",
  targetDate: "2024/09",
  status: "未公開",
  deliveryType: "定時​",
};
