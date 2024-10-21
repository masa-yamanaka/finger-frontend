"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SetPassword from "@/features/auth/components/set-password/SetPassword";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSetPassword = (onSuccess: () => void) => {
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
    // If successful, call the onSuccess callback
    onSuccess(); // Show the dialog
  };

  const handleSuccessClose = () => {
    // Redirect to dashboard after the dialog is closed
    router.push("/dashboard");
  };

  return (
    <SetPassword
      password={password}
      confirmPassword={confirmPassword}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleSetPassword={handleSetPassword}
      error={error}
      handleSuccessClose={handleSuccessClose}
    />
  );
}
