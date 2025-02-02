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
    const { productId, published }: any = req.body;
    console.log("product id", productId, "published", published);

    const product = await Product.findOne({ _id: productId });
    if (product) {
      product.published = published;
      await product.save();
      res.send("Product updated");
    }
  } else res.send({ message: "Unauthorized Access" });
}
