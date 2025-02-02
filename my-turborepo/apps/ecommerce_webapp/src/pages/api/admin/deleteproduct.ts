import { NextApiRequest, NextApiResponse } from "next";
import { Product, Admin } from "db";
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
    const { productId }: any = req.query;
    console.log(productId);

    const deleted = await Product.findOneAndDelete({ _id: productId });
    if (deleted) res.send("product deleted");
  } else res.send({ message: "Unauthorized Access" });
}
