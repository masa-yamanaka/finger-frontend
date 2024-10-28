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
    // Mock validation for testing
    // if (username === "admin" && password === "password") {
    //   setError("");
    //   router.push("/dashboard");
    // } else {
    //   setError("Invalid username or password");
    // }

    // Add logic here for login
    console.log("Username:", username);
    console.log("Password:", password);
    router.push("/dashboard");
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
