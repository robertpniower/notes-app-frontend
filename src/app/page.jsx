"use client";
import { Box, Button, Container, Typography, Grid, Stack, alpha } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function HomePage() {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(15, 43, 67, 0.4) 0%, rgba(15, 43, 67, 0.2) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Stack spacing={3} sx={{ zIndex: 2, px: 2, maxWidth: 900 }}>
          <Typography
            variant="h2"
            fontWeight="800"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 2px 15px rgba(0,0,0,0.2)',
              letterSpacing: '-0.02em'
            }}
          >
            Clarity for Your Ideas
          </Typography>

          <Typography
            variant="h5"
            sx={{
              opacity: 0.95,
              maxWidth: 650,
              mx: 'auto',
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              lineHeight: 1.5,
              textShadow: '0 1px 5px rgba(0,0,0,0.2)'
            }}
          >
            A calm, organized space to reach your peak productivity.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="center" sx={{ pt: 2 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/projects/new"
              startIcon={<NoteAddIcon />}
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: '12px',
                bgcolor: '#0070f3',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#005bc1' }
              }}
            >
              Start Writing
            </Button>

            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/projects"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: '12px',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                color: '#1a1a1a',
                fontWeight: 'bold',
                '&:hover': { bgcolor: 'white' }
              }}
            >
              My Projects
            </Button>
          </Stack>
        </Stack>
      </Box>


    </Box>
  );
}
