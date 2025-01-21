import { Admin, User } from "db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        gmail: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        try {
          const gmail = credentials.gmail;
          const password = credentials.password;
          const admin = await Admin.findOne({ gmail, password });
          const user = await User.findOne({ gmail, password });
          if (!admin && !user) {
            return null;
          }
          if (user) {
            return {
              id: user._id,
              email: user.gmail,
              name: "User",
            };
          }
          return {
            id: admin._id,
            email: admin.gmail,
            name: "Admin",
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
export default handler;
