import React from "react";
import { Drawer, List, ListItemIcon, ListItemText, ListItemButton, Box, Divider, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { dashboardSections } from "@/constants/dashboard";

const drawerWidth = "240px";

const Sidebar: React.FC = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ flexGrow: 1 }}>
        <List>
          <Box>
            <ListItemButton component={Link} href="/dashboard">
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="ホーム" />
            </ListItemButton>
          </Box>
          <Divider />

          {/* Sections Loop */}
          {dashboardSections.map((section, index) => (
            <React.Fragment key={index}>
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom color="info.dark" sx={{ fontWeight: "bold" }}>
                  {section.title}
                </Typography>
                <List sx={{ p: 0 }}>
                  {section.items.map((item, itemIndex) => (
                    <ListItemButton key={itemIndex} component={Link} href={item.href} sx={{ py: 0.5 }}>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
              {dashboardSections.length - 1 !== index ? <Divider /> : ""}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Logout Link at the bottom */}
      <Divider />
      <Box py={1}>
        <ListItemButton component={Link} href="/">
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="ログアウト" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
