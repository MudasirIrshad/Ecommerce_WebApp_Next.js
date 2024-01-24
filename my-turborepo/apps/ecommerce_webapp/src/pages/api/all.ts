import { NextApiRequest, NextApiResponse } from "next";
import { Admin, User } from "db";
import jwt from "jsonwebtoken";
import dbConnection from "@/lib/dbConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnection();
  const user = await User.find();
  const admin = await Admin.find();
  res.send({ admin, user });
}
