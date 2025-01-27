import { Admin, User } from "db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
console.log("this is env file data", process.env.NEXTAUTH_SECRET);

const authOptions = NextAuth({
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
          const user = await User.findOne({ gmail, password });

          if (user) {
            return {
              id: user._id,
              email: user.gmail,
              name: user.username,
              role: "user",
            };
          }
          const admin = await Admin.findOne({ gmail, password });
          return {
            id: admin._id,
            email: admin.gmail,
            name: admin.adminname,
            role: "admin",
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (!token) {
      }
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
export default authOptions;
