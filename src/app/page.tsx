"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/features/auth/components/login/Login";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Add logic here for login

    // Mock validation for testing
    if (username === "admin" && password === "password") {
      setError("");
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
      error={error}
    />
  );
}
