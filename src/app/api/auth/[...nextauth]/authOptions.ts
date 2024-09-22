import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { strapiSign } from './strapi';

export const authOptions:NextAuthOptions = {
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
                    const strapiResponse = await strapiSign({ access_token: account.access_token!, provider: account.provider });

                    token.jwt = strapiResponse.jwt;
                    token.user = strapiResponse.user;
                } catch (error: any) {
                    console.log("DEU ERRO AQUI: ", error);
                    throw error;
                }
            }
            return token;
        },
        async session({ session, token }:any) {
            session.jwt = token.jwt!;
            session.user = { ...session.user, ...token.user };

            return session;
        },
    },
    pages : { 
        signIn : '/'
    }
}