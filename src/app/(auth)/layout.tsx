"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mock implementation for checking login status
// Add logic here for authentication
const isLoggedIn = true; // Set to true for now

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}
