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
  res.send(session);
  // await dbConnection();
  // const user = await User.find();
  // const admin = await Admin.find();
  // res.send({ admin, user });
}
