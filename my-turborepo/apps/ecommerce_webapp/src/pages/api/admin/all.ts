import { NextApiRequest, NextApiResponse } from "next";
import { Admin, User } from "db";
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
  const user = await User.find().select("-password");
  const admin = await Admin.find().select("-password");
  const isAdmin = await Admin.findOne({ gmail });
  if (isAdmin) res.send({ admin, user });
  else res.send({ message: "Unauthorized Access" });
}
