//this page seems to be causing my hydration issues
import './globals.css'



import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "MalcMind Voice Transcriber",
  description: "This is an app to transcribe Audio",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["voice transcribe"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "malcolm vernon",
      url: "https://www.linkedin.com/in/malcolm-vernon/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};



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

         
   
   {children}

   </body>

    </html>
  )
}
