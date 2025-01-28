import { NextApiRequest, NextApiResponse } from "next";
import { Admin, Product } from "db";
import dbConnection from "@/lib/dbConnection";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

type product = {
  title: String;
  description: String;
  price: Number;
  imageLink: String;
  published: Boolean;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const gmail = session.user.email;

  await dbConnection();
  const isAdmin = await Admin.findOne({ gmail });
  if (isAdmin) {
    console.log("Clicked the backend server");

    const data: product = req.body;
    const newProduct = new Product(data);
    newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
    console.log("product saved successfully");
  } else res.send({ message: "Unauthorized Access" });
}
