"use client";
import { useState, useEffect } from 'react';
import apiClient from '../../app/utils/apiClient';
import {
  Container, Typography, Card, CardContent, Grid,
  CardActionArea, Box, Skeleton
} from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Soft, sophisticated pastel palette
  const colors = ['#FFF5BA', '#FFDFEB', '#D6F6FF', '#E2F0CB', '#F0E4FF'];

  useEffect(() => {
    apiClient.get('/projects')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Axios Error:", error.response?.data || error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 800, color: '#1a1a1a', mb: 1 }}>
          Workspace
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Select a project to view your notes
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {loading ? (
          [1, 2, 3].map((n) => (
            <Grid item key={n}>
              <Skeleton variant="rectangular" width={320} height={320} sx={{ borderRadius: 2 }} />
            </Grid>
          ))
        ) : (
          projects.map((project, index) => (
            <Grid item key={project.id}>
              <Link
                href={`/projects/${project.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card
                  sx={{
                    // Bigger Dimensions
                    width: 320,
                    height: 320,
                    backgroundColor: colors[index % colors.length],
                    borderRadius: '4px', // Soft but sharp
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardActionArea sx={{ height: '100%', p: 3, display: 'flex', alignItems: 'flex-start' }}>
                    <CardContent sx={{ p: 0, width: '100%' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: 'rgba(0,0,0,0.85)',
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(0,0,0,0.6)',
                          lineHeight: 1.7,
                          fontSize: '1.05rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 7,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {project.description || "Start adding details to this project..."}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
