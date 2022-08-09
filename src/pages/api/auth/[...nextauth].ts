import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';


function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: getEnv('NEXTAUTH_EMAIL_SERVER_HOST'),
        port: getEnv('NEXTAUTH_EMAIL_SERVER_PORT'),
        auth: {
          user: getEnv('NEXTAUTH_EMAIL_SERVER_USER'),
          pass: getEnv('NEXTAUTH_EMAIL_SERVER_PASSWORD'),
        },
      },
      from: getEnv('NEXTAUTH_EMAIL_FROM'),
    }),
    GitHubProvider({
      clientId: getEnv('NEXTAUTH_GITHUB_CLIENT_ID'),
      clientSecret: getEnv('NEXTAUTH_GITHUB_CLIENT_SECRET'),
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      session.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
