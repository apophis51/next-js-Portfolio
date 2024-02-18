import { ClerkProvider } from '@clerk/nextjs'
// import '.@/app/(main site)/globals.css'
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

export default function ClerkAuthTest(){

  return (        
    <ClerkProvider>
      <div className='bg-white'>
      <UserButton />
      <div>
      <SignInButton>
      <button>Sign in with Clerk</button>
      </SignInButton>
      </div>
        <p>this is an auth test </p>
        </div>
    </ClerkProvider>
  )
}