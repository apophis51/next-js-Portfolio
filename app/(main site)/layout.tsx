'use client'
//this page seems to be causing my hydration issues
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/app/(main site)/Navigation/page'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Providers } from './providers'; //added 9/1/2023 everything that says providers in this doc
import Script from 'next/script'

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

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

///we used this refrenence for adding google analytics https://www.makeuseof.com/nextjs-google-analytics/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      {/* <!-- Google tag (gtag.js) --> */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"/>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YC0KB2YZ2W');
        `,
        }}
    />
     <head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3170313872835503"
     crossOrigin="anonymous"></script></head>
      {/* <body className="bg-blue-500"> */}
        {/* <body className='h-[19000px]'> */}
        <body className='h-full'>

         
      <ClerkProvider><Container maxWidth="xl" >

        <ThemeProvider theme={theme}>

              <Navigation/> 
              {/* <Sidebar/> */}
   </ThemeProvider>
   </Container>

   <Providers>{children}</Providers></ClerkProvider>

   </body>

    </html>
  )
}
