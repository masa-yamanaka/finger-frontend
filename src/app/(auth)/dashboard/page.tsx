"use client";

import { Container, Typography, Box } from "@mui/material";
import { dashboardSections } from "@/constants/dashboard";
import MessageBox from "@/components/messageBox/MessageBox";

export default function DashboardPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <MessageBox title="Welcome to your dashboard!" message="You can add messages here!" />

      {dashboardSections.map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "primary.dark" }}>
            {section.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {section.description}
          </Typography>
        </Box>
      ))}
    </Container>
  );
}
