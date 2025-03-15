
'use client'
import './login.css'

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