'use client'

import { SignIn } from '@clerk/nextjs'

/**
 * Renders the SignIn component from the Clerk library.
 * This component is used to handle user sign-in functionality.
 */



export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <SignIn />
    </div>
  );
}