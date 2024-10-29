import React from "react";
import AddAccountForm from "@/features/account-management/AddAccountForm";
import AccountManagementAddLayout from "./layout";

const AccountManagementAdd = () => {
  return (
    <AccountManagementAddLayout title="アカウント新規登録画面">
      <AddAccountForm />
    </AccountManagementAddLayout>
  );
};

export default AccountManagementAdd;
