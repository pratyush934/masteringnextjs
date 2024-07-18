import { User, userModel } from "@/models/user.model";
import { dbConnect } from "@/utils/db";
import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


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
    }):  Promise<Session> {
      // Implementation goes here. For now, returning an empty object.
      await dbConnect();
      const sessionUser: any = await userModel.findOne({
        email: session?.user.email,
      });
      session.user.id = sessionUser?._id.toString();
      // console.log(session.user);
      return session;
    },

    async signIn(params: {
      profile?: any;
      email?: { verificationRequest?: boolean } | undefined;
      credentials?: Record<string, any> | undefined;
    }): Promise<boolean> {
      const { profile } = params;
      try {
        await dbConnect();
        const userExists = await userModel.findOne({ email: profile?.email });

        if (!userExists) {
          const username = profile.name
            .replace(/\s+/g, "") // Remove spaces
            .replace(/[^a-zA-Z0-9._]/g, "") // Remove characters that aren't letters, numbers, dots, or underscores
            .toLowerCase()
            .slice(0, 20); // Limit to 20 characters

          await userModel.create({
            email: profile?.email,
            username: username,
            image: profile?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(`Error in signIn`, error);
        return false;
      }
    },
  },
};
