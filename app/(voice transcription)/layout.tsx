'use client'
//this page seems to be causing my hydration issues
import './globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

//import Head from 'next/head'


import { ClerkProvider } from '@clerk/nextjs'

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#311b92', //this is the color of the nav bar
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#880e4f',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },

});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">

      <head>

      </head>
      <body className='h-full'>


        <ClerkProvider><Container maxWidth="xl" >

          <ThemeProvider theme={theme}>

          </ThemeProvider>
        </Container>

          {children}</ClerkProvider>

      </body>

    </html>
  )
}
