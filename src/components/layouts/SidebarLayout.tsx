"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/sidebar/Sidebar";

type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SidebarLayout;
