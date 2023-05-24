import NextAuth from "next-auth";
import {NextAuthOptions} from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Providers from "next-auth/providers";
import CredentialsProvider from 'next-auth/providers/credentials'
/*
const authOPtions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers:[
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req){
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

      },
    }),

  ],
}

export default NextAuth({
    // Configure one or more authentication providers
  // 使用 Google 驗證
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
     // ...add more providers here
  ],

  // 如果需要將使用者的資料儲存在資料庫中，可以在 database 這個參數加上 url
  database: process.env.DATABASE_URL,
});
*/