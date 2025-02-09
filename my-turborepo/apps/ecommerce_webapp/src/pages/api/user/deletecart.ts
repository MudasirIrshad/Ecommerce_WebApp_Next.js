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
  const { productId } = req.query;
  await dbConnection();
  const find = await User.findOne({ gmail }).populate("cart");
  console.log("here it is", find);

  if (find) {
    await User.updateOne(
      { _id: find._id }, // Find the user by ID
      { $pull: { cart: productId } } // Remove the product from the cart array
    );
    find.save();
  } else res.send({ message: "Unauthorized Access" });
}
