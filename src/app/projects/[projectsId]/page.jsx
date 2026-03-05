"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import apiClient from "../../utils/apiClient";
import {
  Grid,
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";

export default function ProjectPage({ params }) {
  // 1. Unwrap params using React.use()
  // Ensure your folder is named [projectId] to match this
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectsId; // Adjust this if your param name is different
  console.log("Resolved projectId:", projectId); // Debug log to verify correct param extraction

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Friendly "sticky note" colors
  const colors = ["#FFF5BA", "#FFDFEB", "#D6F6FF", "#E2F0CB", "#F0E4FF"];

  useEffect(() => {
    if (projectId) {
      apiClient
        .get(`/projects/${projectId}`)
        .then((res) => {
          setProject(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching project:", err);
          setLoading(false);
        });
    }
  }, [projectId]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!project)
    return (
      <Container sx={{ mt: 10 }}>
        <Typography>Project not found.</Typography>
      </Container>
    );

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          minHeight: "400px",
          borderRadius: 4,
          bgcolor: "transparent",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.02em" }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            color: "text.secondary",
            mb: 6,
            maxWidth: "800px",
          }}
        >
          {project.description}
        </Typography>
        <Grid container spacing={3}>
          {project.notes?.map((note, index) => (
            <Grid
              item
              key={note.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Link
                href={`/projects/${projectId}/notes/${note.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    width: 320,
                    height: 320,
                    aspectRatio: "1/1",
                    width: "100%",
                    backgroundColor: colors[index % colors.length],
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(0,0,0,0.05)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardActionArea sx={{ height: "100%", p: 3 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {note.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          WebkitLineClamp: 6,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {note.latest_version?.content || "No content yet..."}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
