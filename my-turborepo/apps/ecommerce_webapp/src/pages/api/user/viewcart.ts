import { NextApiRequest, NextApiResponse } from "next";
import { User, Product } from "db";
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
  const find = await User.findOne({ gmail }).populate("cart");

  if (find) {
    res.send(find.cart);
  } else res.send({ message: "Unauthorized Access" });
}
