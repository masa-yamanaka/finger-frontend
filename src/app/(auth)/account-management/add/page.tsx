import React from "react";
import AddAccountForm from "@/features/account-management/form/AddAccountForm";
import AccountFormLayout from "@/components/layouts/AccountFormLayout";

const AccountManagementAdd = () => {
  return (
    <AccountFormLayout title="アカウント新規登録画面">
      <AddAccountForm />
    </AccountFormLayout>
  );
};

export default AccountManagementAdd;
