"use client";

import * as React from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  Tabs, Tab, Box, Container, AppBar, Toolbar,
  Avatar, IconButton, Menu, MenuItem, Tooltip
} from '@mui/material';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

const getCurrentValue = () => {

  if (pathname === '/') return '/';

  const paths = ['/projects', '/notes', '/settings'];

  const match = paths.find(path => pathname.startsWith(path));

  return match || false;
};

const currentValue = getCurrentValue();
  const handleChange = (event, newValue) => {
    router.push(newValue);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>

          {/* LEFT: Logo Section */}
          <Box
            onClick={() => router.push('/')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Image
              src="/image.png"
              alt="Logo"
              height={50}
              width={60}
              style={{ width: 'auto', objectFit: 'contain' }}
            />
          </Box>

          {/* CENTER: Navigation Section */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={currentValue}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  minWidth: 90,
                  '&:hover': { color: 'primary.main', opacity: 1 },
                },
              }}
            >
              <Tab value="/" label="Home" />
              <Tab value="/projects" label="Projects" />
              <Tab value="/notes" label="Notes" />
              <Tab value="/settings" label="Settings" />
            </Tabs>
          </Box>

          {/* RIGHT: User Avatar Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleAvatarClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    bgcolor: 'secondary.main',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}
                >
                  RP {/* Your Initials or a src="/avatar.jpg" */}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          {/* User Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }
            }}
          >
            <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => router.push('/settings')}>My Account</MenuItem>
            <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Logout</MenuItem>
          </Menu>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
