"use client";

import { Container, Typography, Box, Paper } from "@mui/material";
import Link from "next/link";
import { dashboardSections } from "@/constants/data";

export default function DashboardPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box>
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h6">Welcome to your dashboard!</Typography>
          <Typography variant="body1">You can add messages here!</Typography>
        </Paper>
      </Box>

      {dashboardSections.map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: "bold", color: "#005b96" }}
          >
            {section.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {section.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 1,
                    flex: "1 1 20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <Typography variant="button">{item.title}</Typography>{" "}
                </Paper>
              </Link>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
}
