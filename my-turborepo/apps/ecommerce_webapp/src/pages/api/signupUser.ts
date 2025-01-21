import { NextApiRequest, NextApiResponse } from "next";
import { User } from "db";
import jwt from "jsonwebtoken";
import dbConnection from "@/lib/dbConnection";
import { setCookie } from "cookies-next";

const SECRETKEY = "secret key";
type Response_Data = {
  token?: String;
  message?: String;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response_Data>
) {
  await dbConnection();
  const { username, gmail, password } = req.body;

  const user = await User.findOne({ gmail });
  if (user) res.send({ message: "Try another Gmail" });
  else {
    const newUser = new User({ username, gmail, password });
    newUser.save();
    const token = jwt.sign({ gmail, role: "User" }, SECRETKEY, {
      expiresIn: "1h",
    });
    setCookie("authToken", token, {
      res,
      req,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });
    res.send({ message: "User Created successfully", token });
  }
}
