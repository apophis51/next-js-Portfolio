// export {default } from 'next-auth/middleware'
// refer to docs @ https://nextjs.org/docs/app/building-your-application/routing/middleware
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { authMiddleware } from "@clerk/nextjs";
import { auth, clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";
import {debug} from "@/app/utils/debug"


// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   if(request.nextUrl.pathname.startsWith('/api/auth/callback/credentials')) {
//   return NextResponse.rewrite(new URL('/authentication/auth/callback/credentials', request.url))
//   }
//   if(request.nextUrl.pathname.startsWith('/api/auth/session')) {
//     return NextResponse.rewrite(new URL('/authentication/auth/session', request.url))
//     }
//     if(request.nextUrl.pathname.startsWith('/api/auth/_log')) {
//       return NextResponse.rewrite(new URL('/authentication/auth/_log', request.url))
//       }
//       if(request.nextUrl.pathname.startsWith('/api/auth/error')) {
//         return NextResponse.rewrite(new URL('/authentication/auth/error?error=CredentialsSignin&provider=credentials', request.url))
//         }
//         if(request.nextUrl.pathname.startsWith('/api/auth/signin/github')) {
//           return NextResponse.rewrite(new URL('/authentication/auth/signin/github', request.url))
//           }
//           if(request.nextUrl.pathname.startsWith('/api/auth/callback/github')) {
//             return NextResponse.rewrite(new URL('/authentication/auth/callback/github', request.url))
//             }
//             if(request.nextUrl.pathname.startsWith('/api/auth/signin/google')) {
//               return NextResponse.rewrite(new URL('/authentication/auth/signin/google', request.url))
//               }
//               if(request.nextUrl.pathname.startsWith('/api/auth/callback/google')) {
//                 return NextResponse.rewrite(new URL('/authentication/auth/callback/google', request.url))
//                 }
//         if(request.nextUrl.pathname.startsWith('/api/auth/signin')) {
//           return NextResponse.rewrite(new URL('/authentication/auth/signin?error=CredentialsSignin', request.url))
//           }
//           if(request.nextUrl.pathname.startsWith('/api/auth/signout')) {
//             return NextResponse.rewrite(new URL('/authentication/auth/signout', request.url))
//             }
//             if(request.nextUrl.pathname.startsWith('/api/auth/providers')) {
//               return NextResponse.rewrite(new URL('/authentication/auth/providers', request.url))
//               }
// }
 
// See You can configure middle where with config or with conditioonal statements https://nextjs.org/docs/app/building-your-application/routing/middleware
// export const config = {
//   matcher: 
//     ['/api/auth/callback/credentials','/api/auth/session','/api/auth/_log','/api/auth/:error*','/api/auth/:signin*','/api/auth/signout','/api/auth/providers' ]
  
// }




// Create a custom middleware function
async function customMiddleware(request: NextRequest) {
  // Store current request URL in a custom header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  debug('Custom Middleware Headers:', requestHeaders);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  }); 
}


// const isAdminDashRoute = createRouteMatcher(['/AdminDash(.*)'])
const isAdminDashRoute = createRouteMatcher(['/AdminDash'])
const is_ai_article_generator_webApp = createRouteMatcher(['/Web-Apps/ai-article-generator'])

export default clerkMiddleware(async(auth,req) =>{
// export default authMiddleware({
  // publicRoutes: ['/anyone-can-visit-this-route','/ClerkAuthTest','/Work-Search-App','/Work-Search-App/Authorize'],
  // ignoredRoutes: ['/no-auth-in-this-route','/'],

  if (isAdminDashRoute(req)) {
    let status = await auth()
    debug(status)
    await auth.protect({ role: 'org:admin' })}
    // if (isAdminDashRoute(req)) await auth.protect()


    const response = await customMiddleware(req);
    return response;



});

export const config = {
  matcher: ['/dashboard/:path*','/ClerkAuthTest','/', '/Work-Search-App', '/AdminDash(.*)', '/Web-Apps/ai-article-generator', '/Web-Apps/girlfriend-ai-chat-new','/Web-Apps/ai-playground', '/PurchaseMenu/(.*)' ,'/Web-Apps/ai-translation'],
  //matcher: ['/(.*)'],


}