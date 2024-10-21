"use client";

import { ReactNode } from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "@/components/sidebar/Sidebar";

const drawerWidth = 240;

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
