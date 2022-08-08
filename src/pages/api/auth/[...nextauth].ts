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
        host: getEnv('NEXTAUTH_EMAIL_HOST'),
        port: getEnv('NEXTAUTH_EMAIL_PORT'),
        secure: getEnv('NEXTAUTH_EMAIL_SECURE'),
        auth: {
          user: getEnv('NEXTAUTH_EMAIL_AUTH_USER'),
          pass: getEnv('NEXTAUTH_EMAIL_AUTH_PASS'),
        },
      },
      from: getEnv('NEXTAUTH_EMAIL_FROM'),
    }),
    GitHubProvider({
      clientId: getEnv('NEXTAUTH_GITHUB_CLIENT_ID'),
      clientSecret: getEnv('NEXTAUTH_GITHUB_CLIENT_SECRET'),
    }),
  ],
};

export default NextAuth(authOptions);
