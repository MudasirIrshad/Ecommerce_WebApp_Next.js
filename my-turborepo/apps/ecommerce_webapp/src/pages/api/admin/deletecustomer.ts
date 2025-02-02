import { NextApiRequest, NextApiResponse } from "next";
import { User, Admin } from "db";
import dbConnection from "@/lib/dbConnection";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const gmail = session.user.email;
  await dbConnection();
  const isAdmin = await Admin.findOne({ gmail });
  if (isAdmin) {
    const { user_gmail }: any = req.query;
    const data = await User.findOneAndDelete(user_gmail);
    if (data) res.send("user deleted");
  } else res.send({ message: "Unauthorized Access" });
}
