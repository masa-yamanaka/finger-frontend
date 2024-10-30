import { AccountProvider } from "@/context/AccountContext";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AccountManagementLayout = ({ children }: LayoutProps) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default AccountManagementLayout;
