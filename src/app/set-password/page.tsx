"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SetPassword from "@/features/auth/components/set-password/SetPassword";
import SuccessDialog from "@/components/modals/Success/SuccessDialog";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSetPassword = () => {
    setError("");

    // Check if password and confirm password match
    if (password === "") {
      setError("Password cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Add logic here to handle the password setting
    // If successful, show success dialog
    console.log("Password set to: ", password);
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    // Redirect to dashboard after the dialog is closed
    router.push("/dashboard");
  };

  return (
    <>
      <SetPassword
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        handleSetPassword={handleSetPassword}
        error={error}
      />
      <SuccessDialog
        open={showSuccess}
        onClose={handleCloseModal}
        title="パスワードの初期設定が完了しました"
        buttonText="OK"
      />
    </>
  );
}
