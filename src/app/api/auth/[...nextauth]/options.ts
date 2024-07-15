import { userModel } from "@/models/user.model";
import { dbConnect } from "@/utils/db";
import { SessionOptions } from "http2";
import { EndSessionOptions } from "mongodb";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({
      session,
    }: {
      session: any;
    }): Promise<Partial<EndSessionOptions>> {
      // Implementation goes here. For now, returning an empty object.
      const sessionUser: any = await userModel.findOne({
        email: session?.user.email,
      });
      session.user.id = sessionUser?._id.toString();
      return session;
    },

    async signIn({ profile }: { profile: any }) {
      try {
        //serverless -> Lambda
        await dbConnect();
        // check if a user already exist or
        const userFromDB = userModel.findOne({
          email: profile?.email,
        });

        //if do not exist add in the data
        if (!userFromDB) {
          await userModel.create({
            email: profile?.email,
            username: profile.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
            image: profile?.picture,
          });
        }
      } catch (error) {
        console.log(`Error exist in signIn`, error);
      }
    },
  },
};
