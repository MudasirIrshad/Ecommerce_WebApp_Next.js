import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "db";
import dbConnection from "@/lib/dbConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnection();
  const products = await Product.find();
  if (products) {
    const publishedProducts = products.filter((p) => p.published == false);
    res.send(publishedProducts);
  } else {
    res.status(404).json({ message: "No products found" });
  }
}
