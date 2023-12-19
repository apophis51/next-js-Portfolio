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
import './LoginButton.css'

import useSWR from 'swr'
import { LoginButton, LogoutButton } from "../auth";  

import './fireLetters.css'

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

//admin page added 12/5/2023
let WebSocket = {name: 'Admin-Homepage', href: '/HomePage'};
//end admin page added 12/5/2023

let OldTheme = {name: 'About', href: '/About'};
let WebDesignService = {name: 'Web Design Service (Comming Soon)', href: 'https://malcmind.com'};
let ProgrammingBlogs = {name: 'Programming', href: '/ProgrammingBlogs'};
let CryptoGame = {name: 'Crypto', href: '/Crypto/GuessTheNumber'};
let HackThis = {name: 'Hacking Firing Range', href: '/FiringRange'};

let pages = [OldTheme, WebDesignService, ProgrammingBlogs, CryptoGame, HackThis];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //admin page added 12/5/2023
  const { data, error, isLoading } = useSWR('/authentication', fetcher)
  if (data) {
    if(data.authenticated == true){
      pages = [OldTheme, WebDesignService, ProgrammingBlogs, CryptoGame, HackThis, WebSocket]
  } 
  }//end admin page added 12/5/2023

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
    
    <AppBar position="static" className='rounded-lg'sx={{
      height: 150, 
      marginBottom: '10px',
      boxShadow: 'inset 1px 1px 10px 1px rgba(255, 255, 255, 0.7)',
      filter: 'drop-shadow(4px 4px 3px black)',
      background: 'linear-gradient(45deg, purple, darkblue)'/*bgcolor: "black"*/}}>
                          {/* <div className = "mt-10">          */}

      <Container maxWidth="xl">
        <Toolbar disableGutters className='flex justify-between p-10 gap-5'>
        <div className='hover:shadow-[inset_0px_0px_20px_5px_rgba(255,255,255,0.9)] rounded-lg  h-20 flex items-center'>
          <Cottage
           /* sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} */

           className = "hidden xl:flex mr-1"
            />
             <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className = "hidden xl:flex"
            sx={{
              mr: 2,
              /* display: { xs: 'none', md: 'flex' },*/
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              
            }}
          >
           <p className='content-center '>MalcMind - Beta Edition</p>
          </Typography></div>
          <Box 
          /* sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} */
          className = "flex grow xl:hidden"
          >
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
              /*sx={{
                display: { xs: 'block', md: 'none',  },
              }}*/
              className="block xl:hidden"
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  {page.href == '/Crypto/GuessTheNumber' ? (<Link href="/Crypto/GuessTheNumber" prefetch={false}>
                  <Typography textAlign="center"> {page.name}</Typography>
    </Link>) : (<Link href={page.href} prefetch={false}><Typography textAlign="center">{page.name}</Typography></Link>)}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Cottage 
          /*sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} */
          
          className = "flex xl:hidden mr-1"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              /* display: { xs: 'flex', md: 'none' }, */
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className = "flex xl:hidden "
          >
            MalcMind
          </Typography>
          <Box 
          className = "hidden grow xl:flex justify-between items-center pr-10 gap-5">
            {pages.map((page) => (
              <Link href={page.href} prefetch={false}>
              <Button
                className = ' bg-blue-900 bg-opacity-5 pl-5 pr-5 h-20  hover:bg-opacity-50 hover:shadow-[inset_0px_0px_10px_2px_rgba(255,255,255,0.9)] rounded-lg ' 
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{  color: 'white', display: 'block', boxShadow: 'inset 0px 0px 10px 1px rgba(255, 255, 255, 0.1)',}}
              >       
      <p>{page.name}</p>
    {/* non mobile menu */}
              </Button>
              </Link>
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
      {/* </div> */}

    </AppBar>
  );
}
export default ResponsiveAppBar;
