"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import apiClient from "../../utils/apiClient";

const Page = ({ params }) => {
  const resolvedParams = use(params);
  // Ensure these match your actual [folderNames]

  const notesId = resolvedParams.notesId;
  console.log(resolvedParams);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Check if the date is actually valid before calling toLocaleDateString
    return isNaN(date.getTime()) ? "No date" : date.toLocaleDateString();
  };

  useEffect(() => {
    if (notesId) {
      apiClient
        .get(`/notes/${notesId}`)
        .then((res) => {
          setNote(res.data);
          setLoading(false);
          console.log("Fetched note data:", res.data); // Debug log to verify correct data fetching
        })
        .catch((err) => {
          console.error("Error fetching note:", err);
          setLoading(false);
        });
      console.log("Attempting to fetch note with ID:", note); // Debug log to verify correct ID usage
    }
  }, [notesId]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress thickness={2} size={50} />
      </Box>
    );

  if (!note)
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h5">Note not found.</Typography>
        <Link href={`/notes`}>Back to Notes</Link>
      </Container>
    );

  return (
    <Box sx={{ bgcolor: "#fdfdfd", minHeight: "100vh", pb: 10 }}>
      {/* Top Navigation Bar */}

      <Container maxWidth="md" sx={{ mt: 6 }}>
        {/* Back Button */}
        <IconButton
          component={Link}
          href={`/notes`}
          sx={{ mb: 3, "&:hover": { bgcolor: "rgba(0,0,0,0.04)" } }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
            minHeight: "60vh",
          }}
        >
          {/* Note Header */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 1,
              letterSpacing: "-0.03em",
              color: "#1a1a1a",
            }}
          >
            {note.title}
          </Typography>

          <Typography variant="caption" sx={{ display: "block", mb: 4 }}>
            Last updated: {formatDate(note.latest_version?.created_at)}
          </Typography>
          <Divider sx={{ mb: 5, opacity: 0.6 }} />
          <Box
            sx={{
              fontSize: "1.2rem",
              lineHeight: 1.8,
              color: "#333",
              "& p": { mb: 2 },
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{ whiteSpace: "pre-wrap", fontSize: "1.15rem" }}
            >
              {note.latest_version?.content ||
                "Start adding content to this note..."}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Page;
