import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { prisma } from '@/libs/prisma'

const EMAIL_SERVER = process.env.EMAIL_SERVER
const EMAIL_FROM = process.env.EMAIL_FROM
const NEXTAUTH_SEACRET = process.env.NEXTAUTH_SEACRET

if (!EMAIL_SERVER || !EMAIL_FROM || !NEXTAUTH_SEACRET) {
  throw new Error('EMAIL_SERVER, EMAIL_FROM, or NEXTAUTH_SEACRET not found')
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: EMAIL_SERVER,
      from: EMAIL_FROM,
    }),
  ],
  secret: NEXTAUTH_SEACRET,
})
