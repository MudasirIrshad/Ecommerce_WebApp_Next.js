import { Admin } from "db";
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
          if (!admin) {
            return null;
          }
          return {
            id: admin._id,
            gmail: admin.gmail,
            role: "Admin",
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
});
export default handler;
