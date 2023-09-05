// export {default } from 'next-auth/middleware'
// refer to docs @ https://nextjs.org/docs/app/building-your-application/routing/middleware
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.startsWith('/api/auth/callback/credentials')) {
  return NextResponse.rewrite(new URL('/authentication/auth/callback/credentials', request.url))
  }
  if(request.nextUrl.pathname.startsWith('/api/auth/session')) {
    return NextResponse.rewrite(new URL('/authentication/auth/session', request.url))
    }
    if(request.nextUrl.pathname.startsWith('/api/auth/_log')) {
      return NextResponse.rewrite(new URL('/authentication/auth/_log', request.url))
      }
      if(request.nextUrl.pathname.startsWith('/api/auth/error')) {
        return NextResponse.rewrite(new URL('/authentication/auth/error?error=CredentialsSignin&provider=credentials', request.url))
        }
        if(request.nextUrl.pathname.startsWith('/api/auth/signin/github')) {
          return NextResponse.rewrite(new URL('/authentication/auth/signin/github', request.url))
          }
          if(request.nextUrl.pathname.startsWith('/api/auth/callback/github')) {
            return NextResponse.rewrite(new URL('/authentication/auth/callback/github', request.url))
            }
            if(request.nextUrl.pathname.startsWith('/api/auth/signin/google')) {
              return NextResponse.rewrite(new URL('/authentication/auth/signin/google', request.url))
              }
              if(request.nextUrl.pathname.startsWith('/api/auth/callback/google')) {
                return NextResponse.rewrite(new URL('/authentication/auth/callback/google', request.url))
                }
        if(request.nextUrl.pathname.startsWith('/api/auth/signin')) {
          return NextResponse.rewrite(new URL('/authentication/auth/signin?error=CredentialsSignin', request.url))
          }
          if(request.nextUrl.pathname.startsWith('/api/auth/signout')) {
            return NextResponse.rewrite(new URL('/authentication/auth/signout', request.url))
            }
            if(request.nextUrl.pathname.startsWith('/api/auth/providers')) {
              return NextResponse.rewrite(new URL('/authentication/auth/providers', request.url))
              }
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: 
//     ['/api/auth/callback/credentials','/api/auth/session','/api/auth/_log','/api/auth/:error*','/api/auth/:signin*','/api/auth/signout','/api/auth/providers' ]
  
// }

