// import { ClerkProvider } from '@clerk/nextjs'
import { UserButton } from "@clerk/nextjs/server";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Dashboard from '@/app/(main site)/(Test pages)/ClerkAuthTest/Dashboard/data'
export default function ClerkAuthTest(params: {
  searchParams: Promise<{ search?: string }>;
}){
  // console.log('params' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed.
  // params)

  return (        
    <div>
    {/* <ClerkProvider> */}
      <div className='bg-white'>
      <Dashboard props={params}/>
      <UserButton />
      <div>
      <SignInButton>
      <button>Sign in with Clerk</button>
      </SignInButton>
      </div>
        <p>this is an auth test </p>
        
        <SignedOut>
        <p>This content is public. Only signed out users can see this.</p>
      </SignedOut>
      <SignedIn>
        <p>This content is private. Only signed in users can see this.</p>
      </SignedIn>
      </div>
    {/* </ClerkProvider> */}
    </div>
  )
}