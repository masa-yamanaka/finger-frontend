import React from "react";
import AddAccountFormConfirm from "@/features/account-management/form/AddAccountFormConfirm";
import AccountFormLayout from "@/components/layouts/AccountFormLayout";

const AccountManagementAdd = () => {
  return (
    <AccountFormLayout title="アカウント情報確認画面">
      <AddAccountFormConfirm />
    </AccountFormLayout>
  );
};

export default AccountManagementAdd;
