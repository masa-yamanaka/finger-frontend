import React from "react";
import AccountFormLayout from "@/components/layouts/AccountFormLayout";
import EditAccountForm from "@/features/account-management/EditAccountForm";

const AccountManagementEdit = () => {
  return (
    <AccountFormLayout title="アカウント情報編集画面">
      <EditAccountForm />
    </AccountFormLayout>
  );
};

export default AccountManagementEdit;
