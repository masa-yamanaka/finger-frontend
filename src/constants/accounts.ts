export const mockAccounts = [
  {
    id: 11111,
    name: "Alice",
    kana: "alice",
    email: "alice@gmail.com",
    role: "管理者",
    loginId: "1A1A1A",
    tvStation: "ABC News",
    businessName: "AAA TV",
    businessType: "",
  },
  {
    id: 22222,
    name: "Bob",
    kana: "bob",
    email: "bob@example.com",
    role: "NTTD運用",
    loginId: "2B2B2B",
    tvStation: "ABC News",
    businessName: "AAA TV",
    businessType: "",
  },
  {
    id: 33333,
    name: "Charlie",
    kana: "charlie",
    email: "charlie@yahoo.com",
    role: "放送局",
    loginId: "3C3C3C",
    tvStation: "BBC",
    businessName: "AAA TV",
    businessType: "",
  },
  {
    id: 44444,
    name: "Diego",
    kana: "diego",
    email: "diego@gmail.com",
    role: "LB事業者",
    loginId: "4D4D4D",
    tvStation: "BBC",
    businessName: "BBB TV",
    businessType: "",
  },
  {
    id: 55555,
    name: "Ellen",
    kana: "ellen",
    email: "ellen@gmail.com",
    role: "管理者",
    loginId: "5E5E5E",
    tvStation: "CNN",
    businessName: "CCC TV",
    businessType: "",
  },
];

// 事業者種類
export const mockAccountBusinessTypes = ["TV局", "LB", "管理者"];

// 事業者名
export const mockAccountBusinessNames = ["AAA TV", "BBB TV", "CCC TV"];

// 管理権限
export const mockAccountRoles = ["管理者", "放送局", "LB事業者", "NTTD運用"];
