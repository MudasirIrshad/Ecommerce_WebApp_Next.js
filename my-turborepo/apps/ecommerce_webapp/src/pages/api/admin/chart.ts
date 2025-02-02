import { NextApiRequest, NextApiResponse } from "next";
import { Admin, User, Product } from "db";
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
  const admin = await Admin.find().select("-password");
  const isAdmin = await Admin.findOne({ gmail });
  if (isAdmin) {
    const countCustomer = await User.countDocuments();
    const countProduct = await Product.countDocuments();
    const countPublishedProducts = await Product.countDocuments({
      published: true,
    });
    const countUnPublishedProducts = await Product.countDocuments({
      published: false,
    });
    res.send({
      countCustomer,
      countProduct,
      countPublishedProducts,
      countUnPublishedProducts,
    });
  } else res.send({ message: "Unauthorized Access" });
}
