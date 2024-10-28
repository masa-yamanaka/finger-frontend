// src/components/Sidebar.tsx
import React from "react";
import {
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { dashboardSections } from "@/constants/dashboard";

const drawerWidth = 240;

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
          <Box sx={{ px: 2 }}>
            <ListItemButton
              component={Link}
              href="/dashboard"
              className={styles.sectionListItem}
            >
              <ListItemText primary="ホーム" />
            </ListItemButton>
          </Box>
          <Divider />

          {/* Sections Loop */}
          {dashboardSections.map((section, index) => (
            <React.Fragment key={index}>
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  className={styles.sectionTitle}
                >
                  {section.title}
                </Typography>
                <List className={styles.sectionList}>
                  {section.items.map((item, itemIndex) => (
                    <ListItemButton
                      key={itemIndex}
                      component={Link}
                      href={item.href}
                      className={styles.sectionListItem}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Logout Link at the bottom */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          component={Link}
          href="/"
          className={styles.sectionListItem}
        >
          <ListItemText primary="ログアウト" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
