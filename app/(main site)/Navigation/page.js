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
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Cottage from '@mui/icons-material/Cottage';
import { blue } from '@mui/material/colors';
import './LoginButton.css'
import './MenuStyles.css'

import useSWR from 'swr'
// import { LoginButton, LogoutButton } from "../auth";  /Clerk Deprecation

import { SignOutButton, SignInButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/nextjs";


import './fireLetters.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function LogStatus() {
  //this line is needed to renable next auth
  // const { data, error, isLoading } = useSWR('/api', fetcher)
  // if (data) {
  //   if(data.authenticated == true){
    //end line needed to reenable next auth

//comment out this line to delete clerk 2/18/2024
  const { userId, sessionId  } = useAuth();
  const { isSignedIn, user } = useUser();
  console.log(userId, sessionId, isSignedIn, user)
  console.log(user?.publicMetadata.role)
      if(true){

        if(userId == (undefined || null)){ 
          //end comment out line to delete clerk
  return (
    //add this line to get nextjs back
      // <button className="text-2xl text-yellow-500 button">
      //     {/* <LogoutButton/> */}
      //     <SignOutButton/>          
      // </button>
      //end add this line to get nextjs back
      //delete this line to delete clerk 2/18/2024
      <SignInButton>
      <button className="text-2xl text-yellow-500 button">Login</button>
      </SignInButton>
      //end delete this line to delete clerk 2/18/2024
  )} else{
    return(
      //add this line to get nextjs back
      // <button className="text-2xl text-yellow-500 button">
      //     {/* <LoginButton/> */}
      // </button>
      // end add this line to get nextjs back
      //delete this line to delete clerk 2/18/2024
      <div>
                <SignOutButton>
                <button className="text-2xl text-yellow-500 button">Logout</button> 
                </SignOutButton>
</div>
      //end delete this line to delete clerk 2/18/2024
    )
  }
  }

}

//admin page added 12/5/2023
let WebSocket = {name: 'Admin-Homepage', href: '/AdminDash'};
//end admin page added 12/5/2023

let OldTheme = {name: 'About', href: '/About'};
let WebDesignService = {name: 'Web Apps', href: '/Web-Apps'};
let ProgrammingBlogs = {name: 'Programming', href: '/ProgrammingBlogs'};
let CryptoGame = {name: 'Crypto', href: '/Crypto/Crypto-Games-and-Predictions', subMenu: [{name: 'Guess-The-Number-Crypto-Game', href: '/Crypto/Crypto-Games-and-Predictions'}, {name: 'Crypto-Games-and-Predictions' , href: '/Crypto/Crypto-Predictions'}]};
let HackThis = {name: 'Hacker Firing Range', href: '/FiringRange'};

let pages = [OldTheme, WebDesignService, ProgrammingBlogs, CryptoGame, HackThis];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  // Step 3: Close the dropdown when an item is clicked
  const handleItemClick = () => {
    setDropdownVisible(false);
  };

  //admin page added 12/5/2023
  // const { data, error, isLoading } = useSWR('/api', fetcher)
  // if (data) {
  //   if(data.authenticated == true){
  //     pages = [OldTheme, WebDesignService, ProgrammingBlogs, CryptoGame, HackThis, WebSocket]
  // } 
  // }//end admin page added 12/5/2023
  //clerk edit 2/18/2024
  const { isSignedIn, user } = useUser();
  if (user?.publicMetadata.role == 'admin') {
      pages = [OldTheme, WebDesignService, ProgrammingBlogs, CryptoGame, HackThis, WebSocket]
  } 
  
  
  //end clerk edit 2/18/2024

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
    
    <AppBar position="sticky" className='rounded-lg'sx={{
      height: 150, 
      zIndex: 1000,
      marginBottom: '10px',
      boxShadow: 'inset 1px 1px 10px 1px rgba(255, 255, 255, 0.7)',
      filter: 'drop-shadow(4px 4px 3px black)',
      background: 'linear-gradient(45deg, purple, darkblue)'/*bgcolor: "black"*/}}>
                          {/* <div className = "mt-10">          */}

      <Container maxWidth="xl">
        <Toolbar disableGutters className='flex justify-between pt-10 md:p-10 md:gap-5'>
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
                <MenuItem 
                sx = {{boxShadow: 'inset 0px 0px 10px 1px rgba(255, 255, 255, 0.1)'}}
                key={page.name} onClick={handleCloseNavMenu}>
                  {page.href == '/Crypto/GuessTheNumber' ? (<Link href="/Crypto/GuessTheNumber" prefetch={false}>
                  <Typography textAlign="center"> {page.name}</Typography>
    </Link>) : (<Link key={page.name} href={page.href} prefetch={false}><Typography textAlign="center">{page.name}</Typography></Link>)}
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
              <Link key={page.name} href={page.href} prefetch={true}>
              <Button
                className = ' bg-blue-900 bg-opacity-5 pl-5 pr-5 h-20  hover:bg-opacity-50 hover:shadow-[inset_0px_0px_10px_2px_rgba(255,255,255,0.9)] rounded-lg ' 
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{  color: 'white', display: 'block', boxShadow: 'inset 0px 0px 10px 1px rgba(255, 255, 255, 0.1)',}}
              >       
      
     <div className="dropdown dropdown-hover" style={{  zIndex: 3}}>
  <div tabIndex={0} role="button" onMouseEnter={handleMouseEnter}
        ><p>{page.name}</p></div>
  {(page.subMenu) && (isDropdownVisible) && ( <ul tabIndex={0}  onMouseLeave={handleMouseLeave} className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52" style={{   backgroundColor: 'rgba(20, 400, 400, 0.5)'}}>
    {page.subMenu?.map((subPage) => (<li key={subPage.name} onClick={handleItemClick}><Link href={subPage.href} prefetch={true}>{subPage.name}</Link></li>))}
  </ul>)}
</div> 
    {/* non mobile menu */}
              </Button>
              </Link>
            ))}
          </Box>
          <LogStatus/>
              {/* <Link href="/AuthRouteTest">Login</Link> */}
          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton> */}
            {/* </Tooltip> */}
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
