import { AccountProvider } from "@/context/AccountContext";

const AccountManagementLayout = ({ children }) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default AccountManagementLayout;
