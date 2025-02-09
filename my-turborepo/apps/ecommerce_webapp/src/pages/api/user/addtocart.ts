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
  const user = await User.findOne({ gmail });

  const productId = req.body.productId;
  console.log("this is product id", productId);

  const product = await Product.findOne({ _id: productId });

  if (user) {
    user.cart.push(product);
    user.save();
    res.status(200).send(product);
  } else res.send({ message: "Unauthorized Access" });
}
