import { prisma } from '@/lib/prisma'
// import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { GoogleProfile } from 'next-auth/providers/google'
import { compare } from 'bcrypt'
export const authOptions: NextAuthOptions = {     //deleted export because this created a bug
// export const authOptions = { 

  session: {
    strategy: 'jwt' 
  },
  providers: [GoogleProvider({
    profile(profile: GoogleProfile){
      // console.log(profile)
      return {
        ...profile,
        role: profile.role ?? "user",
        id: profile.name,
        randomKey: "you are a google user!"
    }
  },
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  }),GitHubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string
  }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      }, 
      async authorize(credentials) { 
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
             email: credentials.email 
            }
          })

          if (!user) {
            return null
          }

          const isPasswordValid = await compare(
            credentials.password,
             user.password
             )

              if (!isPasswordValid) {
                return null
              }
              return {
                id: user.id + '',
                email: user.email,
                name: user.name,
                randomKey: 'Hey cool'
              }
        // const user = { id: '1', name: 'Ethan', email: 'test@test.com'}
        // return user
    
      }
    })
  ],
  callbacks: {
    session: ({session,token}) => {
      //  console.log('Session Callback', {session, token})  - diagnostics
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomkey: token.randomKey
        }
      }


    },
    jwt: ({token,user}) => {
      //  console.log('JWT Callback', {token, user}) - diagnostics
      if (user) {
        const u = user as unknown as any
      return {...token,
         id: u.id,
        randomKey: u.randomKey
      }
      
    }
    return token
  }

}
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }