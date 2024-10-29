import React from "react";
import AccountManagementAddLayout from "../layout";
import AddAccountFormConfirm from "@/features/account-management/AddAccountFormConfirm";

const AccountManagementAdd = () => {
  return (
    <AccountManagementAddLayout title="アカウント情報確認画面">
      <AddAccountFormConfirm />
    </AccountManagementAddLayout>
  );
};

export default AccountManagementAdd;
