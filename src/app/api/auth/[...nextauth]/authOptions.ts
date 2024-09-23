import NextAuth, { NextAuthOptions, Session, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'
import { strapiSign } from './strapi';

// Definindo um tipo customizado para o usuário Strapi
interface StrapiUser {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  provider: 'local' | 'google';
  name?: string | null;
  image?: string | null;
}

// Declare módulo para estender os tipos
declare module "next-auth" {
  interface Session {
    jwt: string;
    user: StrapiUser;
  }
  // Sobrescrevendo o tipo User padrão
  interface User extends StrapiUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    jwt: string;
    user: StrapiUser;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        try {
          const strapiResponse = await strapiSign({ access_token: account.access_token!, provider: account.provider! });

          token.jwt = strapiResponse.jwt;
          token.user = strapiResponse.user;
        } catch (error: any) {
          console.log("DEU ERRO AQUI: ", error);
          throw error;
        }
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).jwt = token.jwt;
      session.user = token.user;

      return session;
    },
  },
  pages: { 
    signIn: '/'
  }
}

export default NextAuth(authOptions);