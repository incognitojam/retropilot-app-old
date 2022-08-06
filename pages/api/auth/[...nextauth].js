import NextAuth from 'next-auth'

import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.NEXTAUTH_EMAIL_HOST,
        port: process.env.NEXTAUTH_EMAIL_PORT,
        secure: process.env.NEXTAUTH_EMAIL_SECURE,
        auth: {
          user: process.env.NEXTAUTH_EMAIL_AUTH_USER,
          pass: process.env.NEXTAUTH_EMAIL_AUTH_PASS,
        },
      },
      from: process.env.NEXTAUTH_EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
    }),
  ],
})
