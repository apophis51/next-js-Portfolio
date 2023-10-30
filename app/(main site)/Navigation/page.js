'use client'
import Link from 'next/link'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Cottage from '@mui/icons-material/Cottage';
import { blue } from '@mui/material/colors';
import style from './style.css'

import useSWR from 'swr'
import { LoginButton, LogoutButton } from "../auth";  

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function LogStatus() {
  const { data, error, isLoading } = useSWR('/authentication', fetcher)
  if (data) {
    if(data.authenticated == true){
  return (
      <button className="text-2xl text-yellow-500 button">
          <LogoutButton/>
      </button>
  )} else{
    return(
      <button className="text-2xl text-yellow-500 button">
          <LoginButton/>          
      </button>
    )
  }
  }

}


let OldTheme = {name: 'Old Theme', href: 'https://malcolmvernon.info'};
let WebDesignService = {name: 'Web Design Service', href: 'https://malcmind.com'};
let ProgrammingBlogs = {name: 'Programming Blogs', href: '/BlogCards'};
let CryptoGame = {name: 'Crypto Game', href: '/Crypto/GuessTheNumber'};

const pages = [OldTheme, WebDesignService, ProgrammingBlogs, CryptoGame];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{height: 150, /*bgcolor: "black"*/}}>
                          <div className = "mt-10">         

      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Cottage sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
             <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              
            }}
          >
            MalcMind
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none',  },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href="/BlogCards"><Typography textAlign="center">{page.name}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Cottage sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MalcMind
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                className = 'lg:ml-20'
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block'}}
              >
                <Link href={page.href}>{page.name}</Link>
              </Button>
            ))}
          </Box>
          <LogStatus/>
              {/* <Link href="/AuthRouteTest">Login</Link> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton> */}
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      </div>

    </AppBar>
  );
}
export default ResponsiveAppBar;
