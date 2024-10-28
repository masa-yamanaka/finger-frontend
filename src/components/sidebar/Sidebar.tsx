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

          {/* Settings Section */}
          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={styles.sectionTitle}
            >
              各種設定
            </Typography>
            <List className={styles.sectionList}>
              <ListItemButton
                component={Link}
                href="/email-settings"
                className={styles.sectionListItem}
              >
                <ListItemText primary="メールアドレス設定" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                href="/account-management"
                className={styles.sectionListItem}
              >
                <ListItemText primary="アカウント管理" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />

          {/* Programs Section */}
          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={styles.sectionTitle}
            >
              番組連携
            </Typography>
            <List className={styles.sectionList}>
              <ListItemButton
                component={Link}
                href="/"
                className={styles.sectionListItem}
              >
                <ListItemText primary="番組情報連携" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                href="/"
                className={styles.sectionListItem}
              >
                <ListItemText primary="番組確認一覧連携" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />

          {/* List Section */}
          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={styles.sectionTitle}
            >
              報告リスト管理
            </Typography>
            <List className={styles.sectionList}>
              <ListItemButton
                component={Link}
                href="/"
                className={styles.sectionListItem}
              >
                <ListItemText primary="納品ファイル連携" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                href="/"
                className={styles.sectionListItem}
              >
                <ListItemText primary="番組枠選択" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />

          {/* Music Section */}
          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={styles.sectionTitle}
            >
              楽曲連携
            </Typography>
            <List className={styles.sectionList}>
              <ListItemButton
                component={Link}
                href="/"
                className={styles.sectionListItem}
              >
                <ListItemText primary="個別楽曲連携" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                href="/"
                className={styles.sectionListItem}
              >
                <ListItemText primary="ライブラリ楽曲連携" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />
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
