import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import prisma from './lib/client';

import GoogleProvider from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});
